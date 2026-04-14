// supabase/functions/create-checkout-session.ts
const LOCUS_API_BASE = Deno.env.get('LOCUS_API_BASE') || 'https://beta-api.paywithlocus.com/api';

Deno.serve(async (req) => {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  });

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    const { amount, currency, description, metadata } = await req.json();
    
    const apiKey = Deno.env.get('LOCUS_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Locus API key not configured' }),
        { status: 500, headers }
      );
    }

    const response = await fetch(`${LOCUS_API_BASE}/checkout/sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount?.toString() || '0.50',
        currency: currency || 'USDC',
        description: description || 'AutoInsight Report Access',
        metadata: { product: 'auto-insight-report', ...metadata },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return new Response(
        JSON.stringify({ error: error.message || 'Failed to create session' }),
        { status: response.status, headers }
      );
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({
        sessionId: data.sessionId,
        checkoutUrl: data.url,
        expiresAt: data.expiresAt,
      }),
      { headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers }
    );
  }
});