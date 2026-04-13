# Introduction

AutoInsight is an autonomous AI agent that generates weekly fintech & Web3 industry research reports. It demonstrates a complete self-sustaining economic loop by earning real money through $0.50 USDC micropayments via Locus Checkout and autonomously reinvesting those earnings by purchasing data APIs from the Locus API catalog to fuel the next report.

## What Makes AutoInsight Unique?

Unlike traditional content subscription models, AutoInsight operates as a fully autonomous economic entity:

- **Self-Funding**: Earns money from readers to fund its operations
- **Self-Sustaining**: Reinvests earnings into data APIs for continuous operation
- **Transparent**: Full visibility into earnings, spending, and transaction history
- **Autonomous**: Can operate indefinitely without human intervention (in theory)

## Why This Matters

This project demonstrates the potential for AI agents to participate in real economic loops:

1. **AI-as-a-Service**: AI agents can offer valuable services and get paid for them
2. **Autonomous Economics**: Agents can manage their own budgets and make purchasing decisions
3. **Programmable Money**: Using USDC micropayments enables seamless machine-to-machine payments
4. **Data Marketplace**: Integration with Locus shows how agents can source their own data

## Core Concepts

### The Economic Loop

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌──────────┐    $0.50 USDC    ┌──────────────┐            │
│   │  Reader  │ ────────────────►│ AutoInsight  │            │
│   └──────────┘    (payment)     │   Wallet    │            │
│                                    │            │            │
│                                    ▼            │            │
│                            ┌──────────────┐     │            │
│                            │  Purchase   │     │            │
│                            │  Data APIs   │◄────┘            │
│                            └──────────────┘                  │
│                                    │                         │
│                                    ▼                         │
│                            ┌──────────────┐                  │
│                            │   Generate   │                  │
│                            │    Report    │                  │
│                            └──────────────┘                  │
│                                    │                         │
│                                    ▼                         │
│                            ┌──────────────┐                  │
│                            │    Offer     │                  │
│                            │   to Readers │                  │
│                            └──────────────┘                  │
│                                    │                         │
└────────────────────────────────────┼─────────────────────────┘
                                     │
                                     └─► (loop continues)
```

### Key Components

1. **Report Generator**: AI agent that creates ~500-word research reports
2. **Payment Handler**: Locus Checkout integration for USDC micropayments
3. **Wallet Manager**: Tracks balance, earnings, and spending
4. **API Purchaser**: Autonomous agent that selects and purchases data APIs
5. **Dashboard**: User interface showing all metrics and transactions

## Technology Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **State Management**: Zustand
- **Payments**: Locus Checkout SDK
- **Data APIs**: Locus API Catalog
- **AI**: Anthropic Claude API

## Use Cases

- **Research Automation**: Automated industry research at scale
- **Autonomous Services**: Self-sustaining AI services
- **Micropayment Platforms**: Machine-to-machine payments
- **Data Marketplace Integration**: Autonomous data sourcing

---

Next: [Getting Started](getting-started.md)