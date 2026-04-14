/**
 * AutoInsight Agent Service
 * 
 * Handles autonomous agent operations:
 * - Report generation with Groq
 * - API purchases from Locus catalog
 * - Wallet balance management
 */

const GROQ_API_BASE = 'https://api.groq.com/openai/v1';

export interface ReportTopic {
  id: string;
  name: string;
  description: string;
}

export const TOPICS: ReportTopic[] = [
  { id: 'defi', name: 'DeFi', description: 'Decentralized finance protocols and yield strategies' },
  { id: 'rwa', name: 'RWA', description: 'Real-world asset tokenization' },
  { id: 'stablecoins', name: 'Stablecoins', description: 'Stablecoin developments and adoption' },
  { id: 'ai-crypto', name: 'AI x Crypto', description: 'AI agents in blockchain ecosystems' },
  { id: 'bitcoin', name: 'Bitcoin Ecosystem', description: 'Bitcoin DeFi and infrastructure' },
  { id: 'cross-border', name: 'Cross-border Payments', description: 'Global payment rails and remittances' },
];

export interface ApiPurchase {
  id: string;
  name: string;
  cost: number;
  provider: string;
  description: string;
}

export const AVAILABLE_APIS: ApiPurchase[] = [
  { id: 'coingecko', name: 'CoinGecko Market Data', cost: 0.04, provider: 'Locus API Catalog', description: 'Real-time crypto market data and prices' },
  { id: 'crypto-news', name: 'Crypto News Feed', cost: 0.03, provider: 'Locus API Catalog', description: 'Latest crypto news from major sources' },
  { id: 'defillama', name: 'DeFiLlama TVL Data', cost: 0.05, provider: 'Locus API Catalog', description: 'Total value locked across DeFi protocols' },
  { id: 'messari', name: 'Messari Research API', cost: 0.02, provider: 'Locus API Catalog', description: 'Institutional-grade research data' },
];

export interface GenerateReportOptions {
  topic: string;
  includeMarketData?: boolean;
  previousReportContext?: string;
}

export interface GeneratedReport {
  title: string;
  content: string;
  summary: string;
  sources: string[];
  week: string;
  date: string;
}

/**
 * Generate a research report
 */
export const generateReport = async (options: GenerateReportOptions): Promise<GeneratedReport> => {
  const { topic } = options;
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (apiKey) {
    try {
      const response = await fetch(`${GROQ_API_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{
            role: 'system',
            content: 'You are AutoInsight, an AI agent that generates weekly fintech and Web3 research reports. Return valid JSON only, no markdown formatting.'
          }, {
            role: 'user',
            content: `Generate a ~500-word research report about "${topic}". Include key developments, market data, and regulatory updates. Return JSON format: {"title": "...", "summary": "...", "content": "...", "sources": ["..."]}`
          }],
          model: 'llama-3.3-70b-versatile',
          temperature: 0.5,
          max_completion_tokens: 1024,
        }),
      });
      
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || '';
      try {
        const parsed = JSON.parse(text);
        return {
          title: parsed.title || `${topic} Weekly Report`,
          content: parsed.content || text,
          summary: parsed.summary || '',
          sources: parsed.sources || [],
          week: `Week ${Math.ceil((Date.now() - new Date('2026-01-01').getTime()) / (7 * 24 * 60 * 60 * 1000))}`,
          date: new Date().toISOString(),
        };
      } catch {
        return {
          title: `${topic} Weekly Report`,
          content: text,
          summary: text.slice(0, 200),
          sources: [],
          week: `Week ${Math.ceil((Date.now() - new Date('2026-01-01').getTime()) / (7 * 24 * 60 * 60 * 1000))}`,
          date: new Date().toISOString(),
        };
      }
    } catch (err) {
      console.error('Groq API error:', err);
    }
  }
  
  // For demo, return a mock report
  const now = new Date();
  const weekNum = Math.ceil((now.getTime() - new Date('2026-01-01').getTime()) / (7 * 24 * 60 * 60 * 1000));
  const weekStart = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
  const weekEnd = now;
  
  const mockReports: Record<string, { title: string; content: string; summary: string }> = {
    'DeFi': {
      title: 'DeFi Yields Stabilize as RWA Tokenization Hits $18B TVL',
      summary: 'The DeFi landscape shows signs of maturation as yields stabilize and institutional capital flows into tokenized assets.',
      content: `The fintech and Web3 landscape experienced a pivotal week as several converging trends reshaped market dynamics. Real-world asset (RWA) tokenization crossed $18 billion in total value locked, driven primarily by tokenized U.S. Treasuries and corporate bonds on Ethereum and Polygon. BlackRock's BUIDL fund alone surpassed $3.2 billion, signaling sustained institutional appetite for onchain yield products.

DeFi yields showed signs of stabilization after months of compression. Aave V3 on Ethereum settled at 4.2% APY for USDC lending, while newer protocols on Base and Arbitrum offered 6-8% through innovative liquidity mining strategies. Analysts note this equilibrium suggests the sector is maturing beyond speculative farming.

Cross-border payments saw major infrastructure upgrades. Ripple's partnership with three Southeast Asian central banks entered its pilot phase, processing $140 million in settlement volume during the first five days. Meanwhile, Circle launched USDC natively on five additional chains, bringing its total chain footprint to 19.

The regulatory front brought mixed signals. The EU's MiCA framework completed its transition period, with 47 crypto-asset service providers now fully licensed. In contrast, the U.S. stablecoin bill faced delays in Senate committee, though bipartisan support remains strong. Singapore's MAS issued updated guidelines for tokenized fund structures, establishing clearer pathways for institutional participation.

AI-powered trading agents gained traction in DeFi. Protocols like Autonolas and Olas reported a 340% increase in agent-executed transactions, primarily in arbitrage and liquidity provision. This trend raises questions about market microstructure as autonomous agents become significant market participants.

Venture funding in Web3 rebounded with $890 million deployed across 42 deals. Infrastructure plays dominated, with zero-knowledge proof companies and cross-chain messaging protocols attracting the largest rounds. Notable raises included a $120 million Series B for a ZK-rollup platform and $85 million for a decentralized identity provider.

Looking ahead, market participants are watching the Federal Reserve's upcoming rate decision and its impact on stablecoin yields. The convergence of traditional finance rails with onchain infrastructure continues to accelerate, suggesting the next quarter will be decisive for institutional adoption trajectories.`,
    },
    'RWA': {
      title: 'Tokenized Treasuries Cross $20B as Institutional Adoption Accelerates',
      summary: 'Real-world asset tokenization reaches new milestones as traditional finance embraces blockchain infrastructure.',
      content: `The tokenization of real-world assets (RWA) has reached a critical inflection point this week as the total value locked in tokenized treasuries and bonds exceeded $20 billion for the first time. This milestone marks a significant shift in how institutional investors view blockchain-based finance.

BlackRock's BUIDL fund continues to lead the charge, now holding over $4 billion in assets under management. The fund's success has prompted traditional asset managers to accelerate their own tokenization initiatives. Fidelity, Franklin Templeton, and Ondo Finance have all reported significant growth in their respective tokenized treasury products.

The Ethereum ecosystem remains the dominant platform for RWA tokenization, accounting for approximately 65% of total tokenized assets. However, Solana and Polygon are gaining ground, particularly among retail-focused products that require faster settlement times and lower fees.

On-chain settlement volumes for tokenized assets reached $12 billion this week, a 45% increase from the previous month. This surge is attributed to increased participation from hedge funds and family offices seeking exposure to on-chain treasuries while maintaining liquidity.

Regulatory clarity in key jurisdictions has been a major catalyst. The EU's MiCA framework has created a clear path for tokenized securities, while Singapore's MAS has issued new guidelines that specifically address tokenized fund structures. In the U.S., the pending stablecoin legislation is expected to provide additional regulatory certainty.

The technology stack supporting RWA tokenization continues to mature. Circle's CCTP protocol has enabled seamless cross-chain transfers of tokenized assets, while Chainlink's Proof of Reserve is being increasingly adopted to ensure on-chain assets are fully backed by off-chain holdings.

Looking ahead, analysts predict that tokenized assets could represent 10% of global GDP by 2030 if current growth rates persist. The convergence of traditional finance rails with blockchain infrastructure appears irreversible.`,
    },
    'Stablecoins': {
      title: 'USDC Supply Reaches $50B as Stablecoin Wars Intensify',
      summary: 'The stablecoin market continues to expand with USDC gaining market share from competitors.',
      content: `The stablecoin ecosystem has reached new heights this week as USDC's total supply crossed $50 billion, cementing its position as the fastest-growing major stablecoin. This growth comes amid intensifying competition in the stablecoin market.

Circle's expansion strategy continues to pay dividends. The company has now launched USDC natively on 22 blockchain networks, making it the most widely distributed stablecoin by chain count. This multi-chain approach has enabled USDC to capture markets that competitors have overlooked.

Tether's USDT remains the dominant stablecoin by total supply at $120 billion, but its market share has declined from 70% to 62% over the past six months. This shift suggests that users are increasingly valuing transparency and regulatory compliance over brand recognition.

The payment use case for stablecoins is gaining traction. Stripe announced that it will begin settling merchant payments in USDC for eligible businesses, while Shopify has integrated stablecoin checkout options for thousands of merchants. These integrations represent a significant step toward mainstream adoption.

Cross-border payment volumes using stablecoins reached $180 billion this month, a 35% increase year-over-year. Remittance corridors in Latin America and Southeast Asia have seen the most adoption, with transaction costs averaging 0.1% compared to 5-7% for traditional services.

Regulatory developments are shaping the competitive landscape. The EU's MiCA framework has created a clear regulatory pathway for stablecoin issuers operating in Europe. Circle has obtained e-money licenses in multiple EU jurisdictions, positioning it well for compliance.

The Federal Reserve's ongoing rate decisions continue to impact stablecoin yields. Most major stablecoins now offer yields ranging from 3.5% to 5% APY, competitive with traditional savings accounts. This yield advantage over bank deposits has driven significant retail adoption.`,
    },
  };
  
  const selectedTopic = TOPICS.find(t => t.name === topic);
  const topicData = mockReports[topic] || mockReports['DeFi'];
  
  return {
    ...topicData,
    week: `Week ${weekNum}, 2026`,
    date: `${weekStart.toLocaleDateString()} – ${weekEnd.toLocaleDateString()}`,
    sources: [
      `${topic} Protocol Analytics`,
      'Locus Data API',
      'CoinGecko Market Data',
      'Messari Research',
    ],
  };
};

/**
 * Select APIs to purchase based on budget and topic
 */
export const selectApisToPurchase = (topic: string, maxBudget: number): ApiPurchase[] => {
  // Prioritize APIs based on topic
  const topicApiPriority: Record<string, string[]> = {
    'DeFi': ['defillama', 'coingecko', 'crypto-news'],
    'RWA': ['messari', 'coingecko', 'crypto-news'],
    'Stablecoins': ['coingecko', 'messari', 'crypto-news'],
    'AI x Crypto': ['crypto-news', 'messari', 'coingecko'],
    'Bitcoin Ecosystem': ['coingecko', 'defillama', 'crypto-news'],
    'Cross-border Payments': ['messari', 'crypto-news', 'coingecko'],
  };
  
  const priority = topicApiPriority[topic] || ['coingecko', 'crypto-news', 'defillama'];
  const selected: ApiPurchase[] = [];
  let remaining = maxBudget;
  
  for (const apiId of priority) {
    const api = AVAILABLE_APIS.find(a => a.id === apiId);
    if (api && api.cost <= remaining) {
      selected.push(api);
      remaining -= api.cost;
    }
    if (selected.length >= 4) break;
  }
  
  return selected;
};

/**
 * Fetch market data using purchased APIs
 */
export const fetchMarketData = async (apis: ApiPurchase[]): Promise<Record<string, unknown>> => {
  // For demo, return mock data
  return {
    timestamp: new Date().toISOString(),
    apisUsed: apis.map(a => a.name),
    marketSummary: {
      totalMarketCap: '$2.85T',
      btcDominance: '52.4%',
      ethDominance: '17.8%',
      defiTvl: '$95B',
    },
    topGainers: [
      { symbol: 'SOL', change: '+12.4%' },
      { symbol: 'ETH', change: '+5.2%' },
      { symbol: 'BTC', change: '+2.1%' },
    ],
    topNews: [
      'BlackRock BUIDL fund surpasses $4B AUM',
      'Ethereum layer-2 networks process record transactions',
      'US Senate advances stablecoin legislation',
    ],
  };
};
