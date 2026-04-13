# AutoInsight

**The AI Research Agent That Earns & Reinvests Its Own Money**

AutoInsight is an autonomous AI agent that generates weekly fintech & Web3 industry research reports. The agent earns real money through $0.50 USDC micropayments via Locus Checkout and autonomously reinvests those earnings by paying for data APIs from the Locus API catalog to fuel the next report. This demonstrates a complete self-sustaining economic loop.

## Features

### Report Generation
- AI-generated ~500-word research reports on fintech/Web3 topics
- Topic selection: DeFi, RWA, Stablecoins, AI x Crypto, Bitcoin Ecosystem, Cross-border Payments
- Free preview (~100 words + teaser)
- Full report unlocks after $0.50 USDC payment

### Micropayments with Locus
- PayWithLocus Checkout SDK integration for $0.50 USDC payments
- Instant report unlock on payment confirmation
- Sources, key insights, and generated charts

### Autonomous Agent Loop
- Backend agent checks wallet balance and recent earnings
- Autonomously purchases 3-5 data APIs from Locus catalog
- Generates next weekly report with purchased data
- "Advance to Next Week" button for demo purposes
- Complete transaction logging

### Dashboard & Transparency
- Total earnings from reader payments
- Total spent on data APIs and AI calls
- Current Locus wallet balance
- Transaction history (earnings + spends)
- Net profit/loss visualization
- Charts visualizing earn vs spend over weeks
- Agent status with real-time updates
- Spending policy controls (max weekly budget slider)

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **State Management**: Zustand
- **Payments**: Locus Checkout SDK
- **Data APIs**: Locus API Catalog
- **AI**: Anthropic Claude API

## Documentation

Full documentation available at: [https://mosss-os.gitbook.io/auto-insight](https://mosss-os.gitbook.io/auto-insight)

> Note: To set up GitBook docs, follow the instructions in `docs/SETUP.md`

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Mosss-OS/auto-insight.git
cd auto-insight

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_LOCUS_API_KEY=your_locus_api_key
VITE_LOCUS_CHECKOUT_PUBLISHABLE_KEY=your_checkout_key
VITE_LOCUS_WALLET_ADDRESS=your_wallet_address
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
```

## Locus Integration

### Setting Up Locus Checkout

1. Sign up at [Locus](https://locusapi.io) for API keys
2. Get your Locus wallet address for receiving USDC payments
3. Configure the checkout SDK:

```typescript
// src/lib/locus.ts
import { processPayment } from '@/lib/locus';

const result = await processPayment({
  publishableKey: import.meta.env.VITE_LOCUS_CHECKOUT_PUBLISHABLE_KEY,
  recipientAddress: import.meta.env.VITE_LOCUS_WALLET_ADDRESS,
  amount: 0.50,
  currency: 'USDC',
  onSuccess: (txHash) => {
    console.log('Payment confirmed:', txHash);
  },
});
```

### Purchasing APIs from Locus Catalog

```typescript
// src/lib/agent.ts
import { AVAILABLE_APIS, selectApisToPurchase } from '@/lib/agent';

// Select APIs based on topic and budget
const apis = selectApisToPurchase('DeFi', 5.00);

// Purchase each API
for (const api of apis) {
  // Call Locus API to purchase
  await fetch('https://api.locusapi.io/v1/purchase', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({ apiId: api.id, amount: api.cost }),
  });
}
```

## Demo Mode

The app includes a demo mode for hackathon presentations:

1. **Preview → Pay → Full Report**: Click "Pay $0.50 USDC" to simulate payment
2. **Dashboard**: View earnings, spending, and transaction history
3. **Advance Week**: Click to simulate the autonomous agent loop:
   - Check wallet balance
   - Fetch reader payments
   - Purchase data APIs via Locus
   - Generate new report with Claude
   - View activity log in real-time

### Demo Walkthrough (60 seconds)

1. **0-10s**: Show landing page → "Read this week's report"
2. **10-25s**: Report view with free preview → "Pay $0.50 USDC"
3. **25-35s**: Payment confirmation → Full report unlocks
4. **35-50s**: Switch to Dashboard → Show earnings/spending charts
5. **50-60s**: Click "Advance to Next Week" → Watch agent autonomously:
   - Spend on APIs
   - Generate report
   - Update stats

## Project Structure

```
auto-insight/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── DashboardView.tsx
│   │   ├── ReportView.tsx
│   │   └── Footer.tsx
│   ├── store/
│   │   └── agentStore.ts    # Zustand state management
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── locus.ts         # Locus Checkout integration
│   │   └── agent.ts         # Autonomous agent logic
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── Landing.tsx
│   └── assets/
│       └── *.png            # Illustrations
├── public/
├── index.html
├── package.json
├── tailwind.config.ts
└── vite.config.ts
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run test     # Run tests
```

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## License

MIT License
