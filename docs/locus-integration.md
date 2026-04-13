# Locus Integration

AutoInsight uses Locus for both payments and data API sourcing. This guide explains how to integrate with Locus.

## Setting Up Locus Checkout

### Prerequisites

1. Sign up at [Locus](https://locusapi.io)
2. Get your API keys from the dashboard
3. Obtain your Locus wallet address

### Configuration

```typescript
// src/lib/locus.ts
import { processPayment } from '@/lib/locus';

const processReportPayment = async (publishableKey: string) => {
  const result = await processPayment({
    publishableKey: publishableKey,
    recipientAddress: import.meta.env.VITE_LOCUS_WALLET_ADDRESS,
    amount: 0.50,
    currency: 'USDC',
    onSuccess: (txHash) => {
      console.log('Payment confirmed:', txHash);
      unlockFullReport(txHash);
    },
    onError: (error) => {
      console.error('Payment failed:', error);
    },
  });
  
  return result;
};
```

### Payment Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   User       │────►│   Locus      │────►│  AutoInsight │
│   clicks     │     │  Checkout    │     │   unlocks    │
│   Pay        │     │  SDK         │     │   report     │
└──────────────┘     └──────────────┘     └──────────────┘
```

## Purchasing APIs from Locus Catalog

### Available APIs

AutoInsight can purchase various data APIs from Locus:

| API Type | Description | Cost |
|----------|-------------|------|
| Market Data | Price feeds, volume data | ~$0.10-0.50 |
| News API | Industry news headlines | ~$0.05-0.20 |
| Analytics | On-chain metrics | ~$0.10-0.30 |
| Social Data | Social media trends | ~$0.05-0.15 |

### Purchase Logic

```typescript
// src/lib/agent.ts
import { AVAILABLE_APIS, selectApisToPurchase } from '@/lib/agent';

const runAgentLoop = async (topic: string, budget: number) => {
  // Select APIs based on topic and available budget
  const apis = selectApisToPurchase(topic, budget);
  
  // Purchase each API
  for (const api of apis) {
    const result = await fetch('https://api.locusapi.io/v1/purchase', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${process.env.VITE_LOCUS_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        apiId: api.id, 
        amount: api.cost 
      }),
    });
    
    if (result.ok) {
      console.log(`Purchased ${api.name} for $${api.cost}`);
    }
  }
  
  return apis;
};
```

### Agent Decision Making

The autonomous agent selects APIs based on:

1. **Current Topic**: Match APIs to the report topic
2. **Budget**: Stay within weekly budget limit
3. **Relevance**: Prioritize high-value data sources
4. **Variety**: Mix different data types for comprehensive reports

## Wallet Management

### Checking Balance

```typescript
const checkWalletBalance = async () => {
  const response = await fetch('https://api.locusapi.io/v1/wallet/balance', {
    headers: { 
      'Authorization': `Bearer ${process.env.VITE_LOCUS_API_KEY}` 
    }
  });
  
  const data = await response.json();
  return data.balance; // Returns USDC balance
};
```

### Transaction History

```typescript
const getTransactions = async (address: string) => {
  const response = await fetch(
    `https://api.locusapi.io/v1/wallet/transactions?address=${address}`
  );
  
  return await response.json();
};
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_LOCUS_API_KEY` | Your Locus API key |
| `VITE_LOCUS_CHECKOUT_PUBLISHABLE_KEY` | Checkout SDK publishable key |
| `VITE_LOCUS_WALLET_ADDRESS` | Wallet address for receiving payments |

## Demo Mode

In demo mode, you can simulate:

- Payment processing without real money
- API purchases with mock data
- Agent loop with predefined scenarios

See [Demo Mode](demo-mode.md) for more details.

---

Next: [Demo Mode](demo-mode.md)