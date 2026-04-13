# Project Structure

Here's an overview of the AutoInsight codebase organization.

## Directory Layout

```
auto-insight/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── ... (30+ UI components)
│   │   ├── DashboardView.tsx
│   │   ├── ReportView.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── Index.tsx
│   │   ├── Landing.tsx
│   │   └── NotFound.tsx
│   ├── store/
│   │   └── agentStore.ts    # Zustand state management
│   ├── lib/
│   │   ├── utils.ts         # Utility functions
│   │   ├── locus.ts         # Locus Checkout integration
│   │   └── agent.ts         # Autonomous agent logic
│   ├── hooks/
│   │   └── use-toast.ts     # Toast notifications
│   ├── data/
│   │   └── mockReport.ts   # Mock data for demo
│   ├── assets/
│   │   └── *.png           # Illustrations
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── public/
├── docs/                    # GitBook documentation
├── index.html
├── package.json
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── components.json          # shadcn/ui config
```

## Key Files

### State Management

**`src/store/agentStore.ts`**
- Zustand store for global state
- Manages: wallet balance, earnings, spending, transactions, agent status
- Provides actions for updating state

### Locus Integration

**`src/lib/locus.ts`**
- Payment processing via Locus Checkout SDK
- Wallet balance checking
- Transaction history fetching

### Autonomous Agent

**`src/lib/agent.ts`**
- Agent loop logic
- API selection algorithm
- Report generation coordination
- Available APIs catalog

### UI Components

**`src/components/DashboardView.tsx`**
- Financial metrics display
- Transaction history table
- Charts (earnings/spending)
- Agent status panel
- Budget controls

**`src/components/ReportView.tsx`**
- Report preview display
- Payment button
- Full report content
- Topic selector

### Pages

**`src/pages/Index.tsx`**
- Main entry point
- Tab navigation (Report/Dashboard)

**`src/pages/Landing.tsx`**
- Hero section
- Feature highlights
- Call-to-action buttons

## Configuration Files

### `components.json`

shadcn/ui component configuration. Lists all available UI components.

### `tailwind.config.ts`

Tailwind CSS configuration with custom theme colors.

### `vite.config.ts`

Vite build configuration with path aliases.

### `tsconfig.json`

TypeScript configuration for the project.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest tests |

---

See [API Reference](api-reference.md) for detailed function documentation.