# API Reference

Detailed documentation for the main functions and modules in AutoInsight.

## Agent Store

### `agentStore`

Zustand store for managing application state.

#### State Properties

| Property | Type | Description |
|----------|------|-------------|
| `walletBalance` | `number` | Current wallet balance in USDC |
| `totalEarnings` | `number` | Total earnings from all payments |
| `totalSpent` | `number` | Total spent on APIs and AI calls |
| `transactions` | `Transaction[]` | Array of all transactions |
| `currentReport` | `Report` | Current report data |
| `isReportUnlocked` | `boolean` | Whether full report is unlocked |
| `agentStatus` | `AgentStatus` | Current agent status |
| `weeklyBudget` | `number` | Max weekly spending budget |
| `currentWeek` | `number` | Current week number |

#### Actions

```typescript
// Add earnings from payment
addEarnings(amount: number, txHash: string): void

// Add spending transaction
addSpending(amount: number, description: string): void

// Unlock full report
unlockReport(): void

// Generate new report
generateReport(report: Report): void

// Update agent status
updateAgentStatus(status: AgentStatus): void

// Advance to next week
advanceWeek(): void

// Reset demo state
resetDemo(): void
```

## Locus Integration

### `processPayment`

Process a payment via Locus Checkout.

```typescript
interface PaymentParams {
  publishableKey: string;
  recipientAddress: string;
  amount: number;
  currency: string;
  onSuccess: (txHash: string) => void;
  onError: (error: Error) => void;
}

processPayment(params: PaymentParams): Promise<PaymentResult>;
```

### `checkWalletBalance`

Check the current wallet balance.

```typescript
checkWalletBalance(apiKey: string): Promise<number>;
```

### `getTransactions`

Fetch transaction history for a wallet.

```typescript
getTransactions(address: string, apiKey: string): Promise<Transaction[]>;
```

## Autonomous Agent

### `runAgentLoop`

Execute one cycle of the autonomous agent loop.

```typescript
interface AgentLoopParams {
  topic: string;
  budget: number;
  locusApiKey: string;
  anthropicApiKey: string;
}

runAgentLoop(params: AgentLoopParams): Promise<AgentLoopResult>;
```

**Returns:**
```typescript
{
  apisPurchased: ApiPurchase[];
  reportGenerated: Report;
  totalSpent: number;
  activities: string[];
}
```

### `selectApisToPurchase`

Select APIs to purchase based on topic and budget.

```typescript
interface ApiSelectionParams {
  topic: string;
  budget: number;
}

selectApisToPurchase(params: ApiSelectionParams): Api[];
```

### `generateReportWithAI`

Generate a research report using Claude.

```typescript
interface GenerateReportParams {
  topic: string;
  apis: Api[];
  anthropicApiKey: string;
}

generateReportWithAI(params: GenerateReportParams): Promise<Report>;
```

## Types

### Report

```typescript
interface Report {
  id: string;
  topic: string;
  title: string;
  preview: string;      // ~100 words
  fullContent: string;  // ~500 words
  sources: string[];
  generatedAt: string;
  chartData?: ChartData;
}
```

### Transaction

```typescript
interface Transaction {
  id: string;
  type: 'earning' | 'spending';
  amount: number;
  description: string;
  timestamp: string;
  txHash?: string;
}
```

### AgentStatus

```typescript
interface AgentStatus {
  status: 'idle' | 'running' | 'completed' | 'error';
  currentStep?: string;
  lastRun?: string;
  error?: string;
}
```

### Api

```typescript
interface Api {
  id: string;
  name: string;
  type: 'market-data' | 'news' | 'analytics' | 'social';
  cost: number;
  description: string;
}
```

## Available APIs

The agent can purchase these APIs from Locus:

| ID | Name | Type | Cost |
|----|------|------|------|
| `crypto-prices` | Crypto Price Feed | market-data | $0.10 |
| `defi-tvl` | DeFi TVL Data | analytics | $0.15 |
| `news-api` | Crypto News | news | $0.08 |
| `social-trends` | Social Trends | social | $0.05 |
| `on-chain-metrics` | On-Chain Metrics | analytics | $0.20 |
| `stablecoin-data` | Stablecoin Data | market-data | $0.12 |
| `exchange-data` | Exchange Data | market-data | $0.18 |
| ` regulatory-news` | Regulatory News | news | $0.10 |

## Example Usage

### Processing a Payment

```typescript
import { processPayment } from '@/lib/locus';

const handlePayment = async () => {
  const result = await processPayment({
    publishableKey: 'pk_test_...',
    recipientAddress: '0x...',
    amount: 0.50,
    currency: 'USDC',
    onSuccess: (txHash) => {
      console.log('Paid!', txHash);
      unlockReport();
    },
    onError: (error) => {
      console.error('Failed:', error.message);
    },
  });
  
  return result;
};
```

### Running the Agent Loop

```typescript
import { runAgentLoop } from '@/lib/agent';

const advanceWeek = async () => {
  updateAgentStatus({ status: 'running', currentStep: 'Checking wallet' });
  
  const result = await runAgentLoop({
    topic: 'DeFi',
    budget: 5.00,
    locusApiKey: 'api_...',
    anthropicApiKey: 'sk_...',
  });
  
  addSpending(result.totalSpent, 'API purchases');
  generateReport(result.reportGenerated);
  updateAgentStatus({ status: 'completed', lastRun: new Date().toISOString() });
  
  return result;
};
```