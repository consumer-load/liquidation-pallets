interface Env {
  DB: any;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const { email }: any = await context.request.json();
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const id = `sub_${Date.now()}`;

    if (context.env && context.env.DB) {
      await context.env.DB.prepare(`
        INSERT OR IGNORE INTO newsletter_subscribers (id, email) VALUES (?, ?)
      `).bind(id, email).run();
      return new Response(JSON.stringify({ success: true, storage: 'cloudflare_d1' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, storage: 'mock_preview' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Failed to subscribe', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
