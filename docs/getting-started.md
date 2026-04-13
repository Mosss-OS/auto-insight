# Getting Started

This guide will help you set up and run AutoInsight locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18 or higher
- **npm** or **bun** package manager
- **Git** for version control

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Mosss-OS/auto-insight.git
cd auto-insight
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using bun:
```bash
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Locus Configuration
VITE_LOCUS_API_KEY=your_locus_api_key
VITE_LOCUS_CHECKOUT_PUBLISHABLE_KEY=your_checkout_key
VITE_LOCUS_WALLET_ADDRESS=your_wallet_address

# Anthropic Claude API
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
```

#### Getting Your API Keys

**Locus API Keys:**
1. Sign up at [Locus](https://locusapi.io)
2. Navigate to your dashboard
3. Create a new API key
4. Get your wallet address for receiving USDC payments

**Anthropic API Key:**
1. Visit [Anthropic Console](https://console.anthropic.com)
2. Create an API key
3. Copy the key to your `.env` file

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Verification

After starting the server:

1. Open `http://localhost:5173` in your browser
2. You should see the AutoInsight landing page
3. Try clicking "Read this week's report" to see the report view
4. Check the Dashboard tab to see the metrics interface

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```

### Missing API Keys

Without valid API keys, the demo mode will be limited. You can still explore the UI, but real payments and AI generation won't work.

### Build Errors

If you encounter build errors, try:
```bash
npm run build
```

This will show any TypeScript or linting errors.

## Next Steps

- Read [Features](features.md) for a detailed overview
- Learn about [Locus Integration](locus-integration.md)
- Explore [Demo Mode](demo-mode.md) for presentation tips