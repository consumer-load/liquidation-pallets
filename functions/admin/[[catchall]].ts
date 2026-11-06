interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
}

export const onRequest = async (context: { request: Request; env: Env }) => {
  const response = await context.env.ASSETS.fetch(context.request);
  if (response.status !== 404) {
    return response;
  }

  // SPA fallback to /admin/
  return context.env.ASSETS.fetch(new URL('/admin/', context.request.url));
};
