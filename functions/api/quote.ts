interface Env {
  DB: any;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const body: any = await context.request.json();

    if (!body.fullName || !body.email || !body.destinationZip) {
      return new Response(
        JSON.stringify({ error: 'Missing full name, email, or destination zip code' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const id = `quot_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    if (context.env && context.env.DB) {
      await context.env.DB.prepare(`
        INSERT INTO freight_quotes (
          id, full_name, email, phone, company_name,
          destination_zip, delivery_type, pallet_id, pallet_title,
          estimated_freight, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        id,
        body.fullName,
        body.email,
        body.phone || null,
        body.companyName || null,
        body.destinationZip,
        body.deliveryType,
        body.palletId || null,
        body.palletTitle || null,
        body.estimatedFreight || null,
        body.notes || null
      ).run();

      return new Response(
        JSON.stringify({ success: true, id, storage: 'cloudflare_d1' }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id, storage: 'mock_preview' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Failed to submit quote request', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
