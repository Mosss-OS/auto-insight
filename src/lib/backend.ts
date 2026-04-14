/**
 * AutoInsight Backend Service
 * 
 * Connects to Supabase Edge Functions for real data
 */

const SUPABASE_URL = 'https://ipaiccxjspnzazquknrg.supabase.co';

/**
 * Get wallet data from Supabase
 */
export const getWalletData = async () => {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/get-wallet`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch wallet');
    }

    const data = await response.json();
    return {
      balance: data.balance || 34.60,
      totalEarned: data.total_earned || 0,
      totalSpent: data.total_spent || 0,
      totalReaders: data.total_readers || 0,
      totalApiCalls: data.total_api_calls || 0,
    };
  } catch (error) {
    console.error('Failed to fetch wallet:', error);
    return null;
  }
};

/**
 * Record a transaction to Supabase
 */
export const recordTransaction = async (
  type: 'earning' | 'spending',
  amount: number,
  description: string,
  source: string,
  txHash?: string
) => {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/record-transaction`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          amount,
          description,
          source,
          tx_hash: txHash,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to record transaction');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to record transaction:', error);
    return null;
  }
};

/**
 * Fetch transactions from Supabase
 */
export const getTransactions = async (limit: number = 50) => {
  try {
    // Using public REST API since edge function not created for this
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/transactions?order=created_at.desc&limit=${limit}`,
      {
        headers: {
          'apikey': 'public-anon-key',
          'Authorization': 'Bearer public-anon-key',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return [];
  }
};

/**
 * Save a report to Supabase
 */
export const saveReport = async (report: {
  topic: string;
  title: string;
  summary: string;
  content: string;
  sources: string[];
  week: string;
  isUnlocked: boolean;
}) => {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/reports`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'public-anon-key',
          'Authorization': 'Bearer public-anon-key',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          topic: report.topic,
          title: report.title,
          summary: report.summary,
          content: report.content,
          sources: report.sources,
          week: report.week,
          is_unlocked: report.isUnlocked,
          date: new Date().toISOString(),
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Failed to save report:', error);
    return false;
  }
};

/**
 * Fetch reports from Supabase
 */
export const getReports = async (limit: number = 20) => {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/reports?order=created_at.desc&limit=${limit}`,
      {
        headers: {
          'apikey': 'public-anon-key',
          'Authorization': 'Bearer public-anon-key',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch reports');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    return [];
  }
};