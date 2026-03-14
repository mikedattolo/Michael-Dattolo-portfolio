/**
 * Cloudflare Worker — handles /api/contact form submissions.
 * Requires RESEND_API_KEY set as a Wrangler secret.
 * All other requests fall through to static assets.
 */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function sendEmail(apiKey, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend ${res.status}: ${body}`);
  }
  return res.json();
}

async function handleContactForm(request, env) {
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }

  const name    = (formData.get('name')    ?? '').toString().trim().slice(0, 200);
  const email   = (formData.get('email')   ?? '').toString().trim().slice(0, 254);
  const message = (formData.get('message') ?? '').toString().trim().slice(0, 5000);

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'All fields are required.' }), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address.' }), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }

  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return new Response(JSON.stringify({ error: 'Email service is not configured.' }), {
      status: 503,
      headers: JSON_HEADERS,
    });
  }

  const safeName    = escapeHtml(name);
  const safeEmail   = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  try {
    // Primary email to mike.dattolo@yahoo.com
    await sendEmail(env.RESEND_API_KEY, {
      from: 'Portfolio Contact <noreply@mike-dattolo.com>',
      to: ['mike.dattolo@yahoo.com'],
      reply_to: email,
      subject: `New portfolio message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;padding:24px;background:#fff;color:#111">
          <h2 style="margin-top:0;border-bottom:2px solid #eee;padding-bottom:12px">
            New message from your portfolio
          </h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p style="margin-bottom:8px"><strong>Message:</strong></p>
          <blockquote style="border-left:3px solid #ccc;margin:0;padding:8px 16px;color:#333;background:#f9f9f9">
            ${safeMessage}
          </blockquote>
          <p style="margin-top:24px;font-size:0.8em;color:#999">
            Sent via mike-dattolo.com contact form
          </p>
        </div>`,
      text: `New portfolio message\n\nFrom: ${name} <${email}>\n\nMessage:\n${message}`,
    });

    // SMS notification via TextBelt (free tier: 1 SMS/day, no account needed)
    fetch('https://textbelt.com/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: '9087983760',
        message: 'Someone is messaging you from your portfolio.',
        key: 'textbelt',
      }),
    })
      .then((r) => r.json())
      .then((d) => { if (!d.success) console.warn('TextBelt SMS failed:', d.error); })
      .catch((err) => console.warn('TextBelt SMS error:', err.message));

    return new Response(JSON.stringify({ success: true }), { headers: JSON_HEADERS });
  } catch (err) {
    console.error('Contact form error:', err.message);
    return new Response(
      JSON.stringify({ error: 'Failed to send. Please email mike.dattolo@yahoo.com directly.' }),
      { status: 500, headers: JSON_HEADERS }
    );
  }
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/contact' && request.method === 'POST') {
      return handleContactForm(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
