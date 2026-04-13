/**
 * API Routes for Agent Operations
 * 
 * Defines the API endpoints for agent operations.
 * These would run on a backend server.
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface GenerateReportRequest {
  topic: string;
  budget?: number;
}

export interface GenerateReportResponse {
  reportId: string;
  title: string;
  summary: string;
  content: string;
  sources: string[];
  week: string;
  date: string;
}

export interface PurchaseApiRequest {
  apiIds: string[];
  budget: number;
}

export interface PurchaseApiResponse {
  purchased: Array<{
    apiId: string;
    name: string;
    cost: number;
    data: unknown;
  }>;
  totalSpent: number;
}

export interface WalletBalanceResponse {
  balance: number;
  currency: string;
  lastUpdated: string;
}

export interface TransactionHistoryResponse {
  transactions: Array<{
    id: string;
    type: 'earning' | 'spending';
    amount: number;
    description: string;
    date: string;
    txHash?: string;
  }>;
  total: number;
  page: number;
  limit: number;
}

declare global {
  interface Window {
    __API_BASE_URL__?: string;
  }
}

const API_BASE = typeof window !== 'undefined' ? window.__API_BASE_URL__ || '/api' : '/api';

const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      return { success: false, error: error.message };
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Network error' 
    };
  }
};

export const api = {
  generateReport: (body: GenerateReportRequest) =>
    fetchApi<GenerateReportResponse>('/agent/generate-report', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  
  purchaseApis: (body: PurchaseApiRequest) =>
    fetchApi<PurchaseApiResponse>('/agent/purchase-apis', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  
  getWalletBalance: () =>
    fetchApi<WalletBalanceResponse>('/agent/wallet/balance'),
  
  getTransactionHistory: (page = 1, limit = 20) =>
    fetchApi<TransactionHistoryResponse>(
      `/agent/transactions?page=${page}&limit=${limit}`
    ),
  
  getWeeklyStats: (week?: number) =>
    fetchApi<{ week: number; earned: number; spent: number }>(
      `/agent/stats${week ? `?week=${week}` : ''}`
    ),
};

export const ROUTES = {
  GENERATE_REPORT: '/agent/generate-report',
  PURCHASE_APIS: '/agent/purchase-apis',
  WALLET_BALANCE: '/agent/wallet/balance',
  TRANSACTIONS: '/agent/transactions',
  STATS: '/agent/stats',
  HEALTH: '/health',
} as const;