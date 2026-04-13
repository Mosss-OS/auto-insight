/**
 * Webhook Handler for Payment Confirmation
 * 
 * This module handles webhooks from Locus for payment events.
 * Note: In a production app, this would run on a backend server.
 * For frontend demo purposes, we simulate webhook handling.
 */

export interface WebhookPayload {
  event: 'payment.confirmed' | 'payment.failed' | 'api.purchased';
  data: {
    txHash: string;
    amount: number;
    currency: string;
    recipient: string;
    timestamp: string;
  };
}

export const processWebhook = async (payload: WebhookPayload): Promise<{ success: boolean; message: string }> => {
  const { event, data } = payload;
  
  switch (event) {
    case 'payment.confirmed':
      return handlePaymentConfirmed(data);
    case 'payment.failed':
      return handlePaymentFailed(data);
    case 'api.purchased':
      return handleApiPurchased(data);
    default:
      return { success: false, message: `Unknown event: ${event}` };
  }
};

const handlePaymentConfirmed = async (data: WebhookPayload['data']): Promise<{ success: boolean; message: string }> => {
  console.log(`[Webhook] Payment confirmed: ${data.txHash} - ${data.amount} ${data.currency}`);
  
  return {
    success: true,
    message: `Payment of ${data.amount} ${data.currency} confirmed`,
  };
};

const handlePaymentFailed = async (data: WebhookPayload['data']): Promise<{ success: boolean; message: string }> => {
  console.log(`[Webhook] Payment failed: ${data.txHash}`);
  
  return {
    success: true,
    message: `Payment failed - will retry`,
  };
};

const handleApiPurchased = async (data: WebhookPayload['data']): Promise<{ success: boolean; message: string }> => {
  console.log(`[Webhook] API purchased: ${data.txHash}`);
  
  return {
    success: true,
    message: `API purchase recorded`,
  };
};

export const verifyWebhookPayload = (payload: unknown): payload is WebhookPayload => {
  if (typeof payload !== 'object' || payload === null) return false;
  
  const obj = payload as Record<string, unknown>;
  const validEvents = ['payment.confirmed', 'payment.failed', 'api.purchased'];
  
  return (
    'event' in obj &&
    'data' in obj &&
    validEvents.includes(obj.event as string) &&
    typeof obj.data === 'object'
  );
};