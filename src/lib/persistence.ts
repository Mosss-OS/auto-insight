/**
 * Agent State Persistence Layer
 * 
 * Provides localStorage-based persistence for agent state.
 * Can be extended to use a real database in production.
 */

const STORAGE_KEY = 'autoinsight_agent_state';

export interface PersistedState {
  walletBalance: number;
  totalEarned: number;
  totalSpent: number;
  reportsGenerated: number;
  totalReaders: number;
  dataApiCalls: number;
  weeklyEarnings: Array<{ week: number; earned: number; spent: number }>;
  transactionHistory: Array<{
    id: string;
    type: 'earning' | 'spending';
    amount: number;
    description: string;
    date: string;
    source: string;
    apiCalls?: number;
  }>;
  currentWeek: number;
  lastUpdated: string;
}

export const loadAgentState = (): PersistedState | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    return JSON.parse(stored);
  } catch (err) {
    console.error('Failed to load agent state:', err);
    return null;
  }
};

export const saveAgentState = (state: PersistedState): boolean => {
  try {
    const data = {
      ...state,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('Failed to save agent state:', err);
    return false;
  }
};

export const clearAgentState = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Database integration interface
 * In production, replace these with actual DB calls
 */

export interface DatabaseConfig {
  type: 'localstorage' | 'postgres' | 'mongodb';
  connectionString?: string;
}

export const initializeDatabase = async (config: DatabaseConfig): Promise<boolean> => {
  console.log(`Initializing ${config.type} database...`);
  
  if (config.type === 'localstorage') {
    return true;
  }
  
  if (config.connectionString) {
    console.log('Database connection ready');
    return true;
  }
  
  return false;
};

export const syncToDatabase = async (state: PersistedState): Promise<boolean> => {
  const storedConfig = localStorage.getItem('autoinsight_db_config');
  
  if (!storedConfig) {
    return saveAgentState(state);
  }
  
  const config = JSON.parse(storedConfig) as DatabaseConfig;
  
  if (config.type === 'localstorage') {
    return saveAgentState(state);
  }
  
  console.log(`Syncing to ${config.type}...`);
  return true;
};

export const exportStateToJSON = (): string => {
  const state = loadAgentState();
  return state ? JSON.stringify(state, null, 2) : '{}';
};

export const importStateFromJSON = (json: string): boolean => {
  try {
    const state = JSON.parse(json) as PersistedState;
    return saveAgentState(state);
  } catch {
    return false;
  }
};