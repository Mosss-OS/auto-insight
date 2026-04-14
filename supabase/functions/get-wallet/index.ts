// supabase/functions/get-wallet/index.ts
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://ipaiccxjspnzazquknrg.supabase.co';
const SUPABASE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

Deno.serve(async (req) => {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  });

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    if (!SUPABASE_KEY) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY not configured');
    }

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/wallet?select=*&limit=1`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch wallet');
    }

    const data = await response.json();
    const wallet = data[0] || {
      balance: 34.60,
      total_earned: 0,
      total_spent: 0,
      total_readers: 0,
      total_api_calls: 0
    };

    return new Response(JSON.stringify(wallet), { headers });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers }
    );
  }
});