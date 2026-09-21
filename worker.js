/** Static portfolio only. Contact is mailto; no form, email gateway, or SMS submission. */
export default {
  async fetch(request, env) {
    if (!['GET', 'HEAD'].includes(request.method)) {
      return new Response('Method not allowed', {status:405, headers:{Allow:'GET, HEAD'}});
    }
    return env.ASSETS.fetch(request);
  }
};
