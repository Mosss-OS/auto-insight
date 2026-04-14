// supabase/functions/record-transaction/index.ts
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://ipaiccxjspnzazquknrg.supabase.co';
const SUPABASE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

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
    const { type, amount, description, source, tx_hash } = await req.json();

    if (!SUPABASE_KEY) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY not configured');
    }

    // Insert transaction
    const txResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/transactions`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          type,
          amount,
          description,
          source,
          tx_hash,
          status: 'confirmed',
        }),
      }
    );

    if (!txResponse.ok) {
      throw new Error('Failed to record transaction');
    }

    // Update wallet balance
    const walletResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/wallet?select=*&limit=1`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    const walletData = await walletResponse.json();
    const wallet = walletData[0];

    if (wallet) {
      const balanceChange = type === 'earning' ? amount : -amount;
      const totalEarnedChange = type === 'earning' ? amount : 0;
      const totalSpentChange = type === 'spending' ? amount : 0;
      const readersChange = type === 'earning' ? 1 : 0;

      await fetch(
        `${SUPABASE_URL}/rest/v1/wallet?id=eq.${wallet.id}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            balance: wallet.balance + balanceChange,
            total_earned: wallet.total_earned + totalEarnedChange,
            total_spent: wallet.total_spent + totalSpentChange,
            total_readers: wallet.total_readers + readersChange,
            last_updated: new Date().toISOString(),
          }),
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), { headers });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers }
    );
  }
});