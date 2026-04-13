/**
 * Web3 Wallet Connection
 * 
 * Provides utilities for connecting user wallets.
 * Supports MetaMask, WalletConnect, and other injected wallets.
 */

export type WalletType = 'metamask' | 'walletconnect' | 'coinbase' | 'injected';

export interface WalletState {
  connected: boolean;
  address: string | null;
  chainId: number | null;
  walletType: WalletType | null;
}

export const WALLET_DETECTION_DELAY = 500;

export const detectInjectedWallet = (): WalletType | null => {
  if (typeof window === 'undefined') return null;
  
  const ethereum = (window as Window & typeof window & { ethereum?: unknown }).ethereum;
  if (!ethereum) return null;
  
  if (typeof ethereum !== 'object') return null;
  
  const obj = ethereum as Record<string, unknown>;
  
  if (obj.isMetaMask) return 'metamask';
  if (obj.isCoinbaseWallet) return 'coinbase';
  if (obj.isRabby) return 'injected';
  
  return 'injected';
};

export const requestWalletConnection = async (): Promise<{ success: boolean; address?: string; error?: string }> => {
  const ethereum = (window as Window & typeof window & { ethereum?: unknown }).ethereum;
  
  if (!ethereum) {
    return { success: false, error: 'No wallet detected. Please install MetaMask.' };
  }
  
  try {
    const accounts = await (ethereum as { request: (args: { method: string; params?: string[] }) => Promise<string[]> })
      .request({ method: 'eth_requestAccounts' });
    
    if (accounts.length > 0) {
      return { success: true, address: accounts[0] };
    }
    
    return { success: false, error: 'No accounts found' };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Connection failed';
    return { success: false, error: message };
  }
};

export const getConnectedAddress = async (): Promise<string | null> => {
  const ethereum = (window as Window & typeof window & { ethereum?: unknown }).ethereum;
  
  if (!ethereum) return null;
  
  try {
    const accounts = await (ethereum as { request: (args: { method: string }) => Promise<string[]> })
      .request({ method: 'eth_accounts' });
    
    return accounts.length > 0 ? accounts[0] : null;
  } catch {
    return null;
  }
};

export const getChainId = async (): Promise<number | null> => {
  const ethereum = (window as Window & typeof window & { ethereum?: unknown }).ethereum;
  
  if (!ethereum) return null;
  
  try {
    const chainId = await (ethereum as { request: (args: { method: string }) => Promise<string> })
      .request({ method: 'eth_chainId' });
    
    return parseInt(chainId, 16);
  } catch {
    return null;
  }
};

export const switchToNetwork = async (targetChainId: number): Promise<boolean> => {
  const ethereum = (window as Window & typeof window & { ethereum?: unknown }).ethereum;
  
  if (!ethereum) return false;
  
  const chainIdHex = `0x${targetChainId.toString(16)}`;
  
  try {
    await (ethereum as { request: (args: { method: string; params: { chainId: string }[] }) => Promise<void> })
      .request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
    return true;
  } catch {
    return false;
  }
};

export const SUPPORTED_CHAINS = {
  mainnet: 1,
  sepolia: 11155111,
  base: 8453,
  baseSepolia: 84532,
  polygon: 137,
  arbitrum: 42161,
};

export const getNetworkName = (chainId: number): string => {
  const entries = Object.entries(SUPPORTED_CHAINS);
  for (const [name, id] of entries) {
    if (id === chainId) return name;
  }
  return `Chain ${chainId}`;
};