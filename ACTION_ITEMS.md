# ACTION ITEMS FOR MIKE — Portfolio Improvements

**Action Plan Version:** v2.0.5

## 🎯 Critical (Required Before Launch)

- [ ] **Resume PDF**: Upload your actual resume as `/about/resume.pdf`
  - Current placeholder: `resume.txt`
  - Recommended: Professional PDF format
  
- [ ] **Project Images**: Provide real images to replace placeholders
  - [ ] BloominBeds dashboard screenshot (replaces `placeholder-1.svg`)
  - [ ] EDISON AI interface screenshot (replaces `placeholder-2.svg`)
  - [ ] Magnetic fields simulation render (replaces `placeholder-3.svg`)
  - Format: PNG, JPEG, or WebP
  - Suggested size: 800×500px (will be responsive)

- [ ] **Contact Form Backend**: Set up form submission service
  - Option A: Formspree (free, no backend needed)
    - Go to https://formspree.io
    - Create new form project
    - Get your form ID
    - Update in `contact/index.html` line with: `action="https://formspree.io/f/{YOUR_FORM_ID}"`
  
  - Option B: Your own server/API
    - Update form `action` attribute to your endpoint
    - Endpoint should accept POST with name, email, message fields
  
  - Option C: Email service (Mailgun, SendGrid, AWS SES)
    - Configure and update form action accordingly

## 🔄 Testing & Verification

- [ ] **Mobile Testing**: Test site on actual phones/tablets
  - Hero buttons stack correctly
  - Forms are readable and inputs are large enough
  - Images load and display properly
  - Navigation is accessible

- [ ] **Form Testing**: After setting up backend
  - Submit test message
  - Verify email/message received
  - Check for typos in success message (if customizing)
  - Test on mobile device

- [ ] **Link Testing**: Verify all navigation works
  - All nav links go to correct pages
  - Resume download link works
  - Contact form submission works
  - Hero "View My Work" button works

- [ ] **Accessibility Audit**
  - Run WAVE (WebAIM) accessibility checker on all pages
  - Run Axe DevTools browser extension
  - Test keyboard navigation (Tab through entire site)
  - Verify no red errors reported

## 💡 Optional Enhancements

- [ ] **Strengthen other case studies** (not just M.A.R.T.I.A.N)
  - Consider adding to these case study pages:
    - `/work/5-axis-3d-printing-waste-reduction/`
    - `/work/bloominbeds-monitoring-system/`
    - `/work/total-ergonomics-micropipette/`
    - `/work/edison-ai-assistant/`
  - Structure to follow:
    - Problem/Opportunity
    - Role & Constraints
    - Process & Iterations
    - Final Solution
    - Measurable Results
    - Lessons Learned
  - Example: M.A.R.T.I.A.N case study shows the pattern to follow

- [ ] **Add more project media**
  - Videos of robots/prototypes
  - Process photos
  - Before/after comparisons
  - User testing footage
  - Sketches and iterations

- [ ] **Analytics Setup**
  - Add Google Analytics 4
  - Track which projects recruiters view
  - Monitor contact form submissions
  - Identify drop-off points

- [ ] **Schema Markup**
  - Add JSON-LD for Person profile
  - Add structured data for projects
  - Helps Google understand your expertise

## 📋 File Changes Made

### New Files Created
- `/IMPROVEMENTS_CHANGELOG.md` — Full changelog (this repo)
- `/about/resume.txt` — Resume placeholder (replace with PDF)
- `/ACTION_ITEMS.md` — This file

### Modified Files
- `/index.html` — Better hero copy, improved CTAs, enhanced alt text
- `/work/index.html` — Fixed heading hierarchy, improved page metadata
- `/about/index.html` — Better content structure, added resume download button
- `/contact/index.html` — Complete redesign with contact form
- `/styles/base.css` — Enhanced focus states, improved mobile nav
- `/styles/components.css` — Form styles, button improvements
- `/styles/pages.css` — Better responsive design, mobile optimizations
- `/work/martian-construction-robot/index.html` — Fixed duplicate ID

### Not Modified (Working Well)
- `/scripts/main.js` — Year rotation, scroll-reveal animations
- `/scripts/carousel.js` — Image carousel functionality
- `/scripts/filters.js` — Project filtering system
- `/styles/tokens.css` — Design tokens (colors, spacing)

## 🔗 Quick Links

- **Local Testing**: Open `index.html` in browser or use live server
- **Formspree**: https://formspree.io (for contact form backend)
- **WAVE Accessibility**: https://wave.webaim.org (test accessibility)
- **Axe DevTools**: https://www.deque.com/axe/devtools/ (browser extension)
- **Responsive Design Testing**: Chrome DevTools (F12 → Device toolbar)

## 📞 If Something Breaks

Most issues will be related to:

1. **Contact form not submitting** → Check Formspree endpoint in contact/index.html
2. **Images not showing** → Verify image files exist at paths specified in alt text
3. **Buttons don't work** → Check links in href attributes
4. **Mobile layout broken** → Clear browser cache (Ctrl+Shift+Delete)
5. **Form validation not working** → Check browser console for JavaScript errors (F12)

---

## ✅ Checklist Before Going Live

- [ ] Resume PDF uploaded
- [ ] All placeholder images replaced
- [ ] Contact form backend configured and tested
- [ ] All links verified functional
- [ ] Mobile testing completed
- [ ] Accessibility audit passed
- [ ] Form submission tested (end-to-end)
- [ ] Analytics configured (optional)
- [ ] Domain updated if needed (if moving to new host)

---

**Status**: Ready for your content! All structural improvements are complete.

Time to make it yours with real assets and your actual resume. 🚀
