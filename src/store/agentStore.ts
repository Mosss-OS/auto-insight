import { create } from 'zustand';

const SUPABASE_URL = 'https://ipaiccxjspnzazquknrg.supabase.co';

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
  // Wallet - loaded from Supabase
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
  
  // Data loading
  isLoading: boolean;
  dataError: string | null;
  
  // Actions
  loadDataFromSupabase: () => Promise<void>;
  setBalance: (balance: number) => void;
  addEarning: (amount: number, description: string) => Promise<void>;
  addSpending: (amount: number, description: string, source: string, apiCalls?: number) => Promise<void>;
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

// Default initial report
const getDefaultReport = (topic: string = 'DeFi'): Report => ({
  id: `report-${Date.now()}`,
  week: `Week ${Math.ceil((Date.now() - new Date('2026-01-01').getTime()) / (7 * 24 * 60 * 60 * 1000))}, 2026`,
  date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  title: 'Loading research report...',
  summary: 'Generating fresh insights with AI...',
  content: '',
  previewWordCount: 100,
  topic,
  isUnlocked: false,
});

export const useAgentStore = create<AgentState>((set, get) => ({
  // Initial loading state
  isLoading: true,
  dataError: null,
  
  // Initial empty state
  balance: 0,
  totalEarned: 0,
  totalSpent: 0,
  reportsGenerated: 0,
  totalReaders: 0,
  dataApiCalls: 0,
  weeklyEarnings: [
    { week: "W1", earned: 0, spent: 0 },
    { week: "W2", earned: 0, spent: 0 },
    { week: "W3", earned: 0, spent: 0 },
    { week: "W4", earned: 0, spent: 0 },
    { week: "W5", earned: 0, spent: 0 },
    { week: "W6", earned: 0, spent: 0 },
  ],
  spending: [],
  transactionHistory: [],
  currentReport: getDefaultReport(),
  pastReports: [],
  maxWeeklyBudget: 5.00,
  selectedTopic: null,
  isGenerating: false,
  agentLogs: [],

  // Load data from Supabase
  loadDataFromSupabase: async () => {
    set({ isLoading: true, dataError: null });
    
    try {
      const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNzh43tQw45WN8FtJE9Ks-Kf35Go';
      
      // Fetch wallet data
      const walletRes = await fetch(
        `${SUPABASE_URL}/rest/v1/wallet?select=*&limit=1`,
        { headers: { 'apikey': anonKey, 'Authorization': `Bearer ${anonKey}` } }
      );
      
      // Fetch recent transactions
      const txRes = await fetch(
        `${SUPABASE_URL}/rest/v1/transactions?order=created_at.desc&limit=20`,
        { headers: { 'apikey': anonKey, 'Authorization': `Bearer ${anonKey}` } }
      );
      
      // Fetch reports
      const reportsRes = await fetch(
        `${SUPABASE_URL}/rest/v1/reports?order=created_at.desc&limit=10`,
        { headers: { 'apikey': anonKey, 'Authorization': `Bearer ${anonKey}` } }
      );

      let walletData = { balance: 34.60, total_earned: 53.00, total_spent: 18.40, total_readers: 106, total_api_calls: 247 };
      let transactions: any[] = [];
      let reports: any[] = [];

      if (walletRes.ok) {
        const wData = await walletRes.json();
        if (wData.length > 0) walletData = wData[0];
      }
      
      if (txRes.ok) transactions = await txRes.json();
      if (reportsRes.ok) reports = await reportsRes.json();

      // Transform transactions
      const transactionHistory: Transaction[] = transactions.map((tx: any) => ({
        id: tx.id,
        type: tx.type,
        amount: tx.amount,
        description: tx.description || '',
        date: new Date(tx.created_at).toLocaleString(),
        source: tx.source || 'Locus',
        apiCalls: tx.api_calls || 0,
      }));

      // Transform reports
      const pastReports: Report[] = reports.map((r: any) => ({
        id: r.id,
        week: r.week || 'Week',
        date: new Date(r.date).toLocaleDateString(),
        title: r.title,
        summary: r.summary || '',
        content: r.content || '',
        previewWordCount: 100,
        topic: r.topic,
        isUnlocked: r.is_unlocked || false,
      }));

      // Calculate spending from transactions
      const spendingMap = new Map<string, ApiSpending>();
      transactions.filter((tx: any) => tx.type === 'spending').forEach((tx: any) => {
        const existing = spendingMap.get(tx.description);
        if (existing) {
          existing.amount += tx.amount;
          existing.calls += tx.api_calls || 1;
        } else {
          spendingMap.set(tx.description, {
            name: tx.description || 'API',
            amount: tx.amount,
            calls: tx.api_calls || 1,
            provider: tx.source || 'Locus API Catalog',
          });
        }
      });

      set({
        balance: walletData.balance,
        totalEarned: walletData.total_earned,
        totalSpent: walletData.total_spent,
        totalReaders: walletData.total_readers,
        dataApiCalls: walletData.total_api_calls,
        reportsGenerated: reports.length,
        transactionHistory,
        pastReports,
        spending: Array.from(spendingMap.values()),
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to load from Supabase:', error);
      set({ 
        isLoading: false, 
        dataError: 'Using offline data',
        // Keep default demo values as fallback
        balance: 34.60,
        totalEarned: 53.00,
        totalSpent: 18.40,
        totalReaders: 106,
        dataApiCalls: 247,
      });
    }
  },

  setBalance: (balance) => set({ balance }),
  
  addEarning: async (amount, description) => {
    const tx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'earning',
      amount,
      description,
      date: new Date().toLocaleString(),
      source: 'Locus Checkout',
    };
    
    // Update local state immediately
    set((state) => ({
      balance: state.balance + amount,
      totalEarned: state.totalEarned + amount,
      totalReaders: state.totalReaders + 1,
      transactionHistory: [tx, ...state.transactionHistory],
      weeklyEarnings: state.weeklyEarnings.map((w, i, arr) => 
        i === arr.length - 1 ? { ...w, earned: w.earned + amount } : w
      ),
    }));

    // Sync to Supabase in background
    try {
      const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNzh43tQw45WN8FtJE9Ks-Kf35Go';
      
      await fetch(`${SUPABASE_URL}/rest/v1/transactions`, {
        method: 'POST',
        headers: {
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'earning',
          amount,
          description,
          source: 'Locus Checkout',
          status: 'confirmed',
        }),
      });

      // Update wallet
      const walletRes = await fetch(
        `${SUPABASE_URL}/rest/v1/wallet?select=id,balance,total_earned,total_readers&limit=1`,
        { headers: { 'apikey': anonKey, 'Authorization': `Bearer ${anonKey}` } }
      );
      const walletData = await walletRes.json();
      if (walletData.length > 0) {
        await fetch(
          `${SUPABASE_URL}/rest/v1/wallet?id=eq.${walletData[0].id}`,
          {
            method: 'PATCH',
            headers: {
              'apikey': anonKey,
              'Authorization': `Bearer ${anonKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              balance: walletData[0].balance + amount,
              total_earned: walletData[0].total_earned + amount,
              total_readers: walletData[0].total_readers + 1,
              last_updated: new Date().toISOString(),
            }),
          }
        );
      }
    } catch (e) {
      console.error('Failed to sync earning to Supabase:', e);
    }
  },
  
  addSpending: async (amount, description, source, apiCalls = 1) => {
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

    // Sync to Supabase in background
    try {
      const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNzh43tQw45WN8FtJE9Ks-Kf35Go';
      
      await fetch(`${SUPABASE_URL}/rest/v1/transactions`, {
        method: 'POST',
        headers: {
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'spending',
          amount,
          description,
          source,
          status: 'confirmed',
        }),
      });
    } catch (e) {
      console.error('Failed to sync spending to Supabase:', e);
    }
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
        { week: `W${state.reportsGenerated + 1}`, earned: 0, spent: 0 },
      ],
    }));
  },
  
  reset: () => {
    set({
      balance: 0,
      totalEarned: 0,
      totalSpent: 0,
      reportsGenerated: 0,
      totalReaders: 0,
      dataApiCalls: 0,
      weeklyEarnings: [
        { week: "W1", earned: 0, spent: 0 },
        { week: "W2", earned: 0, spent: 0 },
        { week: "W3", earned: 0, spent: 0 },
        { week: "W4", earned: 0, spent: 0 },
        { week: "W5", earned: 0, spent: 0 },
        { week: "W6", earned: 0, spent: 0 },
      ],
      spending: [],
      transactionHistory: [],
      currentReport: getDefaultReport(),
      pastReports: [],
      maxWeeklyBudget: 5.00,
      selectedTopic: null,
      isGenerating: false,
      agentLogs: [],
    });
  },
}));