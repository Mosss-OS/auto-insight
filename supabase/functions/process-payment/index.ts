// supabase/functions/process-payment.ts
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
    const { amount, recipientAddress, currency, metadata } = await req.json();
    
    const apiKey = Deno.env.get('LOCUS_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Locus API key not configured' }),
        { status: 500, headers }
      );
    }

    // Step 1: Preflight check
    const preflightResponse = await fetch(`${LOCUS_API_BASE}/checkout/agent/preflight`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount?.toString() || '0.50',
        currency: currency || 'USDC',
        recipient: recipientAddress,
        metadata: { product: 'auto-insight-report', ...metadata },
      }),
    });

    if (!preflightResponse.ok) {
      const error = await preflightResponse.json();
      return new Response(
        JSON.stringify({ error: error.message || 'Preflight check failed' }),
        { status: preflightResponse.status, headers }
      );
    }

    const preflight = await preflightResponse.json();

    // Step 2: Trigger payment
    const payResponse = await fetch(
      `${LOCUS_API_BASE}/checkout/agent/pay/${preflight.transactionId}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!payResponse.ok) {
      const error = await payResponse.json();
      return new Response(
        JSON.stringify({ error: error.message || 'Payment failed' }),
        { status: payResponse.status, headers }
      );
    }

    const payment = await payResponse.json();
    const txHash = await pollForTransaction(payment.transactionId, apiKey);

    return new Response(
      JSON.stringify({
        success: true,
        transactionId: payment.transactionId,
        txHash: txHash || 'pending',
        status: txHash ? 'CONFIRMED' : 'PENDING',
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

async function pollForTransaction(transactionId: string, apiKey: string): Promise<string | null> {
  const maxAttempts = 15;
  const interval = 2000;

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(
        `${LOCUS_API_BASE}/checkout/agent/payments/${transactionId}`,
        { headers: { 'Authorization': `Bearer ${apiKey}` } }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'CONFIRMED' || data.status === 'COMPLETED') {
          return data.txHash || transactionId;
        }
        if (data.status === 'FAILED' || data.status === 'CANCELLED') {
          return null;
        }
      }
    } catch (error) {
      console.error('Poll error:', error);
    }

    await new Promise(resolve => setTimeout(resolve, interval));
  }
  return null;
}