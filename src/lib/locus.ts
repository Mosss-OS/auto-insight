/**
 * AutoInsight Locus Payment Integration via Supabase Edge Functions
 * 
 * Handles USDC micropayments via Supabase Edge Functions
 * to bypass CORS restrictions and keep API keys secure.
 * 
 * Edge Functions:
 * - create-checkout-session: Creates checkout session
 * - process-payment: Agent payment processing
 */

const SUPABASE_URL = 'https://ipaiccxjspnzazquknrg.supabase.co';
const PAYMENT_AMOUNT = 0.50;
const PAYMENT_CURRENCY = 'USDC';

export interface PaymentConfig {
  publishableKey?: string;
  recipientAddress: string;
  amount?: number;
  currency?: string;
  onSuccess?: (txHash: string) => void;
  onError?: (error: Error) => void;
  onPending?: () => void;
}

export interface PaymentResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export interface CheckoutSession {
  sessionId: string;
  checkoutUrl: string;
  expiresAt?: string;
}

/**
 * Create a checkout session via Supabase Edge Function
 */
export const createCheckoutSession = async (
  amount: number = PAYMENT_AMOUNT,
  description: string = 'AutoInsight Report Access'
): Promise<CheckoutSession> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount.toString(),
        currency: PAYMENT_CURRENCY,
        description,
        metadata: { product: 'auto-insight-report' },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create checkout session');
    }

    const data = await response.json();
    return {
      sessionId: data.sessionId,
      checkoutUrl: data.checkoutUrl,
      expiresAt: data.expiresAt,
    };
  } catch (error) {
    console.error('Failed to create checkout session:', error);
    return {
      sessionId: `demo_${Date.now()}`,
      checkoutUrl: '#demo',
    };
  }
};

/**
 * Process payment via Supabase Edge Function (Agent payment)
 */
export const processPayment = async (config: PaymentConfig): Promise<PaymentResult> => {
  const amount = config.amount || PAYMENT_AMOUNT;
  const currency = config.currency || PAYMENT_CURRENCY;
  const recipientAddress = config.recipientAddress;

  if (!recipientAddress) {
    const error = 'No recipient address provided';
    config.onError?.(new Error(error));
    return { success: false, error };
  }

  // Demo mode fallback - simulate payment
  const useRealPayment = import.meta.env.VITE_USE_REAL_PAYMENT === 'true';
  if (!useRealPayment) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const txHash = `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`;
        config.onSuccess?.(txHash);
        resolve({ success: true, txHash });
      }, 2000);
    });
  }

  // Real payment via Supabase Edge Function
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/process-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount.toString(),
        currency,
        recipientAddress,
        metadata: { product: 'auto-insight-report' },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      config.onError?.(new Error(error.error || 'Payment failed'));
      return { success: false, error: error.error };
    }

    const data = await response.json();
    
    if (data.success) {
      // Record earning transaction to Supabase
      try {
        await fetch(`${SUPABASE_URL}/functions/v1/record-transaction`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'earning',
            amount: amount.toString(),
            description: 'Report unlocked payment',
            source: 'Locus Payment',
            tx_hash: data.txHash,
          }),
        });
      } catch (e) {
        console.error('Failed to record transaction:', e);
      }
      
      config.onSuccess?.(data.txHash);
      return { success: true, txHash: data.txHash };
    } else {
      config.onError?.(new Error('Payment not confirmed'));
      return { success: false, error: 'Payment not confirmed' };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Payment failed';
    config.onError?.(new Error(errorMessage));
    return { success: false, error: errorMessage };
  }
};

/**
 * Verify a payment (demo always returns true)
 */
export const verifyPayment = async (txHash: string): Promise<boolean> => {
  // In production, this could call the edge function to check status
  return true;
};

/**
 * Get wallet balance (demo returns mock value)
 */
export const getWalletBalance = async (): Promise<number> => {
  // In production, fetch from Supabase or Locus
  return 34.60;
};

export const LOCUS_BRAND_COLORS = {
  violetPrimary: '#4101F6',
  violetLight: '#5934FF',
  violetSoft: '#F4F0FF',
  textPrimary: '#1B1B1C',
  border: '#DDDEE0',
};

export { PAYMENT_AMOUNT, PAYMENT_CURRENCY };