import { create } from 'zustand';
<<<<<<< HEAD
import { loadAgentState, saveAgentState, clearAgentState, PersistedState } from '@/lib/persistence';
=======
>>>>>>> origin/feature/repo-description-issue-17

export interface Transaction {
  id: string;
  type: 'earning' | 'spending';
  amount: number;
  description: string;
  date: string;
  source: string;
  apiCalls?: number;
}

export interface WeeklyStats {
  week: string;
  earned: number;
  spent: number;
}

export interface ApiSpending {
  name: string;
  amount: number;
  calls: number;
  provider: string;
}

export interface Report {
  id: string;
  week: string;
  date: string;
  title: string;
  summary: string;
  content: string;
  previewWordCount: number;
  topic: string;
  isUnlocked: boolean;
}

interface AgentState {
  // Wallet
  balance: number;
  totalEarned: number;
  totalSpent: number;
  
  // Stats
  reportsGenerated: number;
  totalReaders: number;
  dataApiCalls: number;
  weeklyEarnings: WeeklyStats[];
  spending: ApiSpending[];
  transactionHistory: Transaction[];
  
  // Reports
  currentReport: Report | null;
  pastReports: Report[];
  
  // Settings
  maxWeeklyBudget: number;
  selectedTopic: string | null;
  
  // Agent status
  isGenerating: boolean;
  agentLogs: string[];
  
  // Actions
  setBalance: (balance: number) => void;
  addEarning: (amount: number, description: string) => void;
  addSpending: (amount: number, description: string, source: string, apiCalls?: number) => void;
  setCurrentReport: (report: Report) => void;
  unlockReport: (reportId: string) => void;
  addPastReport: (report: Report) => void;
  setMaxWeeklyBudget: (budget: number) => void;
  setSelectedTopic: (topic: string | null) => void;
  setIsGenerating: (generating: boolean) => void;
  addAgentLog: (log: string) => void;
  clearAgentLogs: () => void;
  advanceWeek: () => void;
  reset: () => void;
}

const initialReport: Report = {
  id: "report-2026-w15",
  week: "Week 15, 2026",
  date: "April 7–12, 2026",
  title: "DeFi Yields Stabilize as RWA Tokenization Hits $18B TVL",
  summary: "This week's fintech and Web3 landscape saw significant developments across decentralized finance, real-world asset tokenization, and cross-border payment infrastructure.",
  content: `The fintech and Web3 landscape experienced a pivotal week as several converging trends reshaped market dynamics. Real-world asset (RWA) tokenization crossed $18 billion in total value locked, driven primarily by tokenized U.S. Treasuries and corporate bonds on Ethereum and Polygon. BlackRock's BUIDL fund alone surpassed $3.2 billion, signaling sustained institutional appetite for onchain yield products.

DeFi yields showed signs of stabilization after months of compression. Aave V3 on Ethereum settled at 4.2% APY for USDC lending, while newer protocols on Base and Arbitrum offered 6-8% through innovative liquidity mining strategies. Analysts note this equilibrium suggests the sector is maturing beyond speculative farming.

Cross-border payments saw major infrastructure upgrades. Ripple's partnership with three Southeast Asian central banks entered its pilot phase, processing $140 million in settlement volume during the first five days. Meanwhile, Circle launched USDC natively on five additional chains, bringing its total chain footprint to 19.

The regulatory front brought mixed signals. The EU's MiCA framework completed its transition period, with 47 crypto-asset service providers now fully licensed. In contrast, the U.S. stablecoin bill faced delays in Senate committee, though bipartisan support remains strong. Singapore's MAS issued updated guidelines for tokenized fund structures, establishing clearer pathways for institutional participation.

AI-powered trading agents gained traction in DeFi. Protocols like Autonolas and Olas reported a 340% increase in agent-executed transactions, primarily in arbitrage and liquidity provision. This trend raises questions about market microstructure as autonomous agents become significant market participants.

Venture funding in Web3 rebounded with $890 million deployed across 42 deals. Infrastructure plays dominated, with zero-knowledge proof companies and cross-chain messaging protocols attracting the largest rounds. Notable raises included a $120 million Series B for a ZK-rollup platform and $85 million for a decentralized identity provider.

Looking ahead, market participants are watching the Federal Reserve's upcoming rate decision and its impact on stablecoin yields. The convergence of traditional finance rails with onchain infrastructure continues to accelerate, suggesting the next quarter will be decisive for institutional adoption trajectories.`,
  previewWordCount: 100,
  topic: "DeFi",
  isUnlocked: false,
};

const initialPastReports: Report[] = [
  { id: "report-2026-w14", week: "Week 14", date: "March 31–April 5, 2026", title: "Stablecoin Supply Hits All-Time High at $220B", summary: "Stablecoin market cap reaches new milestones", content: "", previewWordCount: 100, topic: "Stablecoins", isUnlocked: true },
  { id: "report-2026-w13", week: "Week 13", date: "March 24–30, 2026", title: "Base Surpasses Arbitrum in Daily Active Addresses", summary: "Layer 2 competition intensifies", content: "", previewWordCount: 100, topic: "DeFi", isUnlocked: true },
  { id: "report-2026-w12", week: "Week 12", date: "March 17–23, 2026", title: "EU MiCA Enforcement Begins — Market Impact Analysis", summary: "Regulatory clarity arrives in Europe", content: "", previewWordCount: 100, topic: "Regulatory", isUnlocked: true },
  { id: "report-2026-w11", week: "Week 11", date: "March 10–16, 2026", title: "ZK-Proof Costs Drop 60% with New Proving Systems", summary: "Zero-knowledge technology advances", content: "", previewWordCount: 100, topic: "DeFi", isUnlocked: true },
  { id: "report-2026-w10", week: "Week 10", date: "March 3–9, 2026", title: "Tokenized Treasuries Cross $15B as Yields Compress", summary: "RWA adoption accelerates", content: "", previewWordCount: 100, topic: "RWA", isUnlocked: true },
];

const initialTransactionHistory: Transaction[] = [
  { id: "tx-1", type: "earning", amount: 0.50, description: "Report unlocked by reader", date: "Apr 12, 2026 14:32", source: "Locus Checkout" },
  { id: "tx-2", type: "spending", amount: 0.04, description: "CoinGecko Market Data API", date: "Apr 12, 2026 14:31", source: "Locus API Catalog", apiCalls: 12 },
  { id: "tx-3", type: "spending", amount: 0.03, description: "Crypto News Feed", date: "Apr 12, 2026 14:31", source: "Locus API Catalog", apiCalls: 8 },
  { id: "tx-4", type: "earning", amount: 0.50, description: "Report unlocked by reader", date: "Apr 12, 2026 13:45", source: "Locus Checkout" },
  { id: "tx-5", type: "earning", amount: 0.50, description: "Report unlocked by reader", date: "Apr 12, 2026 11:20", source: "Locus Checkout" },
  { id: "tx-6", type: "spending", amount: 0.05, description: "DeFiLlama TVL Data", date: "Apr 12, 2026 11:19", source: "Locus API Catalog", apiCalls: 15 },
  { id: "tx-7", type: "earning", amount: 0.50, description: "Report unlocked by reader", date: "Apr 11, 2026 22:15", source: "Locus Checkout" },
  { id: "tx-8", type: "spending", amount: 0.02, description: "Messari Research API", date: "Apr 11, 2026 22:14", source: "Locus API Catalog", apiCalls: 5 },
  { id: "tx-9", type: "earning", amount: 0.50, description: "Report unlocked by reader", date: "Apr 11, 2026 18:30", source: "Locus Checkout" },
  { id: "tx-10", type: "spending", amount: 0.01, description: "Anthropic Claude AI", date: "Apr 11, 2026 18:29", source: "Locus API Catalog", apiCalls: 1 },
];

export const useAgentStore = create<AgentState>((set, get) => ({
  // Initial state
  balance: 34.60,
  totalEarned: 53.00,
  totalSpent: 18.40,
  reportsGenerated: 6,
  totalReaders: 106,
  dataApiCalls: 247,
  weeklyEarnings: [
    { week: "W10", earned: 11.00, spent: 3.40 },
    { week: "W11", earned: 6.50, spent: 2.80 },
    { week: "W12", earned: 15.00, spent: 3.20 },
    { week: "W13", earned: 8.00, spent: 3.00 },
    { week: "W14", earned: 12.50, spent: 3.10 },
    { week: "W15", earned: 0.00, spent: 2.90 },
  ],
  spending: [
    { name: "CoinGecko Pro API", amount: 5.00, calls: 84, provider: "Locus API Catalog" },
    { name: "NewsAPI Fintech Feed", amount: 4.20, calls: 63, provider: "Locus API Catalog" },
    { name: "Messari Research API", amount: 6.00, calls: 42, provider: "Locus API Catalog" },
    { name: "DeFiLlama Premium", amount: 3.20, calls: 58, provider: "Locus API Catalog" },
  ],
  transactionHistory: initialTransactionHistory,
  currentReport: initialReport,
  pastReports: initialPastReports,
  maxWeeklyBudget: 5.00,
  selectedTopic: null,
  isGenerating: false,
  agentLogs: [],

  // Actions
  setBalance: (balance) => set({ balance }),
  
  addEarning: (amount, description) => {
    const tx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'earning',
      amount,
      description,
      date: new Date().toLocaleString(),
      source: 'Locus Checkout',
    };
    set((state) => ({
      balance: state.balance + amount,
      totalEarned: state.totalEarned + amount,
      totalReaders: state.totalReaders + 1,
      transactionHistory: [tx, ...state.transactionHistory],
      weeklyEarnings: state.weeklyEarnings.map((w, i, arr) => 
        i === arr.length - 1 ? { ...w, earned: w.earned + amount } : w
      ),
    }));
  },
  
  addSpending: (amount, description, source, apiCalls = 1) => {
    const tx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'spending',
      amount,
      description,
      date: new Date().toLocaleString(),
      source,
      apiCalls,
    };
    set((state) => ({
      balance: state.balance - amount,
      totalSpent: state.totalSpent + amount,
      dataApiCalls: state.dataApiCalls + apiCalls,
      transactionHistory: [tx, ...state.transactionHistory],
      weeklyEarnings: state.weeklyEarnings.map((w, i, arr) => 
        i === arr.length - 1 ? { ...w, spent: w.spent + amount } : w
      ),
      spending: state.spending.map((s) => 
        s.name === description ? { ...s, amount: s.amount + amount, calls: s.calls + apiCalls } : s
      ),
    }));
  },
  
  setCurrentReport: (report) => set({ currentReport: report }),
  unlockReport: (reportId) => set((state) => ({
    currentReport: state.currentReport?.id === reportId 
      ? { ...state.currentReport, isUnlocked: true }
      : state.currentReport,
  })),
  addPastReport: (report) => set((state) => ({
    pastReports: [report, ...state.pastReports],
  })),
  setMaxWeeklyBudget: (budget) => set({ maxWeeklyBudget: budget }),
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  setIsGenerating: (generating) => set({ isGenerating: generating }),
  addAgentLog: (log) => set((state) => ({ agentLogs: [...state.agentLogs, log] })),
  clearAgentLogs: () => set({ agentLogs: [] }),
  
  advanceWeek: () => {
    set((state) => ({
      reportsGenerated: state.reportsGenerated + 1,
      weeklyEarnings: [
        ...state.weeklyEarnings.slice(1),
        { week: `W${15 + state.reportsGenerated - 5}`, earned: 0, spent: 0 },
      ],
    }));
  },
  
  reset: () => set({
    balance: 34.60,
    totalEarned: 53.00,
    totalSpent: 18.40,
    reportsGenerated: 6,
    totalReaders: 106,
    dataApiCalls: 247,
    weeklyEarnings: [
      { week: "W10", earned: 11.00, spent: 3.40 },
      { week: "W11", earned: 6.50, spent: 2.80 },
      { week: "W12", earned: 15.00, spent: 3.20 },
      { week: "W13", earned: 8.00, spent: 3.00 },
      { week: "W14", earned: 12.50, spent: 3.10 },
      { week: "W15", earned: 0.00, spent: 2.90 },
    ],
    spending: [
      { name: "CoinGecko Pro API", amount: 5.00, calls: 84, provider: "Locus API Catalog" },
      { name: "NewsAPI Fintech Feed", amount: 4.20, calls: 63, provider: "Locus API Catalog" },
      { name: "Messari Research API", amount: 6.00, calls: 42, provider: "Locus API Catalog" },
      { name: "DeFiLlama Premium", amount: 3.20, calls: 58, provider: "Locus API Catalog" },
    ],
    transactionHistory: initialTransactionHistory,
    currentReport: initialReport,
    pastReports: initialPastReports,
    maxWeeklyBudget: 5.00,
    selectedTopic: null,
    isGenerating: false,
    agentLogs: [],
  }),
}));
