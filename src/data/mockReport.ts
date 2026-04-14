export const TOPICS = [
  { id: "defi", name: "DeFi", description: "Decentralized finance protocols and yield strategies" },
  { id: "rwa", name: "RWA", description: "Real-world asset tokenization" },
  { id: "stablecoins", name: "Stablecoins", description: "Stablecoin developments and adoption" },
  { id: "ai-crypto", name: "AI x Crypto", description: "AI agents in blockchain ecosystems" },
  { id: "bitcoin", name: "Bitcoin", description: "Bitcoin DeFi and infrastructure" },
  { id: "cross-border", name: "Cross-border", description: "Global payment rails and remittances" },
];

// Generated reports for different topics
export const reportsByTopic: Record<string, {
  id: string;
  week: string;
  date: string;
  title: string;
  summary: string;
  content: string;
  previewWordCount: number;
  topic: string;
}> = {
  "DeFi": {
    id: "report-2026-w15-defi",
    week: "Week 15, 2026",
    date: "April 7–12, 2026",
    title: "DeFi Yields Stabilize as RWA Tokenization Hits $18B TVL",
    summary: "This week's fintech and Web3 landscape saw significant developments across decentralized finance, real-world asset tokenization, and cross-border payment infrastructure.",
    content: `The fintech and Web3 landscape experienced a pivotal week as several converging trends reshaped market dynamics. Real-world asset (RWA) tokenization crossed $18 billion in total value locked, driven primarily by tokenized U.S. Treasuries and corporate bonds on Ethereum and Polygon. BlackRock's BUIDL fund alone surpassed $3.2 billion, signaling sustained institutional appetite for onchain yield products.

DeFi yields showed signs of stabilization after months of compression. Aave V3 on Ethereum settled at 4.2% APY for USDC lending, while newer protocols on Base and Arbitrum offered 6-8% through innovative liquidity mining strategies. Analysts note this equilibrium suggests the sector is maturing beyond speculative farming.

Cross-border payments saw major infrastructure upgrades. Ripple's partnership with three Southeast Asian central banks entered its pilot phase, processing $140 million in settlement volume during the first five days. Meanwhile, Circle launched USDC natively on five additional chains, bringing its total chain footprint to 19.

The regulatory front brought mixed signals. The EU's MiCA framework completed its transition period, with 47 crypto-asset service providers now fully licensed. In contrast, the U.S. stablecoin bill faced delays in Senate committee, though bipartisan support remains strong.

AI-powered trading agents gained traction in DeFi. Protocols like Autonolas and Olas reported a 340% increase in agent-executed transactions, primarily in arbitrage and liquidity provision. This trend raises questions about market microstructure as autonomous agents become significant market participants.

Looking ahead, market participants are watching the Federal Reserve's upcoming rate decision and its impact on stablecoin yields. The convergence of traditional finance rails with onchain infrastructure continues to accelerate.`,
    previewWordCount: 100,
    topic: "DeFi",
  },
  "RWA": {
    id: "report-2026-w15-rwa",
    week: "Week 15, 2026",
    date: "April 7–12, 2026",
    title: "Tokenized Treasuries Surge as BlackRock BUIDL Crosses $4B",
    summary: "Real-world asset tokenization accelerates with major financial institutions launching new onchain products.",
    content: `The tokenized treasury market reached new milestones this week as institutional adoption accelerated significantly. BlackRock's BUIDL fund surpassed $4 billion in assets under management, becoming the largest tokenized treasury product in the market.

Major banks including JPMorgan and Goldman Sachs announced plans to expand their tokenized deposit offerings. JPMorgan's Onyx platform processed over $1 billion in tokenized transactions this week, while Goldman Sachs revealed a partnership with a leading blockchain infrastructure provider.

The tokenization of real estate also gained momentum. A major commercial property portfolio worth $2.5 billion was fractionalized onchain, allowing retail investors to access institutional-grade real estate investments for the first time.

Regulatory clarity in the EU continues to attract issuers. The MiCA framework has now enabled over 50 asset managers to launch tokenized products, with particular growth in tokenized bonds and security tokens.

Supply chain finance is being transformed by blockchain tokenization. A major shipping company announced that 30% of their trade finance is now tokenized, reducing settlement times from 5 days to under 4 hours.`,
    previewWordCount: 100,
    topic: "RWA",
  },
  "Stablecoins": {
    id: "report-2026-w15-stablecoins",
    week: "Week 15, 2026",
    date: "April 7–12, 2026",
    title: "USDC Supply Reaches $50B as Stablecoin Wars Intensify",
    summary: "The stablecoin market continues to expand with USDC gaining market share while new entrants challenge the status quo.",
    content: `The stablecoin ecosystem has reached new heights this week as USDC's total supply crossed $50 billion, cementing its position as the fastest-growing major stablecoin. Circle's expansion strategy continues to pay dividends with launches on 22 blockchain networks.

Tether's USDT remains dominant at $120 billion but its market share has declined from 70% to 62% over the past six months. This shift reflects growing user preference for transparent, regulated stablecoins.

Payment integrations are accelerating. Stripe announced USDC settlements for eligible merchants, while Shopify added stablecoin checkout options. Cross-border remittance volumes using stablecoins reached $180 billion this month, a 35% increase year-over-year.

The regulatory landscape is becoming clearer. The EU's MiCA framework has created a defined pathway for stablecoin issuers, with Circle obtaining licenses in multiple jurisdictions. The U.S. stablecoin bill faces delays but bipartisan support remains strong.

Yield comparisons show major stablecoins offering 3.5% to 5% APY, competitive with traditional savings accounts and driving retail adoption.`,
    previewWordCount: 100,
    topic: "Stablecoins",
  },
  "AI x Crypto": {
    id: "report-2026-w15-ai-crypto",
    week: "Week 15, 2026",
    date: "April 7–12, 2026",
    title: "AI Agents Transform DeFi with 340% Transaction Increase",
    summary: "Autonomous AI agents are becoming significant market participants in DeFi protocols, executing arbitrage and liquidity strategies.",
    content: `AI-powered trading agents are rapidly transforming the DeFi landscape. Protocols like Autonolas and Olas reported a 340% increase in agent-executed transactions, primarily in arbitrage and liquidity provision strategies.

The emergence of agent-to-agent commerce is creating new market dynamics. AI agents can now discover, negotiate, and execute trades with minimal human intervention. ADeFi protocol reported handling over $50 million in agent-initiated transactions this week.

Investment in AI-crypto startups continues to surge. This week saw $340 million deployed across 28 AI-crypto companies, with particular focus on decentralized inference networks and autonomous trading systems.

The combination of large language models with onchain data is enabling new predictive analytics products. Several DeFi protocols now offer AI-generated market forecasts trained on historical chain data.

Concerns about market fairness are growing. Regulators are examining whether AI agents create advantages that disadvantage human traders. Some exchanges have begun implementing agent identification requirements.`,
    previewWordCount: 100,
    topic: "AI x Crypto",
  },
  "Bitcoin": {
    id: "report-2026-w15-bitcoin",
    week: "Week 15, 2026",
    date: "April 7–12, 2026",
    title: "Bitcoin Layer 2s Hit $15B as Lightning Network Scales",
    summary: "Bitcoin's scaling solutions are gaining traction with major milestones reached in capacity and adoption.",
    content: `Bitcoin's Layer 2 ecosystem reached significant milestones this week. The total value locked in Bitcoin Layer 2 solutions crossed $15 billion, with the Lightning Network reaching 10,000 capacity nodes.

Major companies are adopting Lightning payments. A Fortune 500 company announced support for Lightning payments across 5,000 retail locations, while several major exchanges enabled Lightning withdrawals.

The Ordinals ecosystem continues to evolve. New inscription standards are enabling more complex use cases including decentralized identity and game assets. Trading volumes inOrdinals have increased 200% this month.

Institutional interest in Bitcoin is expanding beyond spot ETFs. Several major asset managers have filed for Layer 2 infrastructure funds, recognizing the importance of Bitcoin's scaling solutions.

Security advances include new multi-signature protocols that reduce key management complexity while maintaining Bitcoin's robust security model. The average Lightning channel size has increased 40% this quarter.`,
    previewWordCount: 100,
    topic: "Bitcoin",
  },
  "Cross-border": {
    id: "report-2026-w15-cross-border",
    week: "Week 15, 2026",
    date: "April 7–12, 2026",
    title: "Ripple Pilot Processes $140M in Three Days",
    summary: "Cross-border payment infrastructure upgrades continue as major banks embrace blockchain-based settlement solutions.",
    content: `Cross-border payment infrastructure saw major developments this week. Ripple's partnership with three Southeast Asian central banks entered its pilot phase, processing $140 million in settlement volume during the first five days.

The traditional banking sector is accelerating blockchain adoption. SWIFT announced that 75% of its member banks are now testing blockchain-based cross-border payments, up from 40% last year.

Stablecoin-based remittances are challenging traditional providers. Transaction costs average 0.1% compared to 5-7% for traditional services, with Latin America and Southeast Asia corridors showing the strongest adoption.

Central bank digital currencies (CBDCs) are advancing in multiple jurisdictions. The Bank for International Settlements reported that over 60% of central banks are now in advanced stages of CBDC development.

Trade finance onchain is becoming mainstream. A major shipping company announced that 30% of their trade finance is now tokenized, reducing settlement times from 5 days to under 4 hours.`,
    previewWordCount: 100,
    topic: "Cross-border",
  },
};

// Current report to display
export const currentReport = reportsByTopic["DeFi"];

// Past reports for archive
export const pastReports = [
  { id: "report-2026-w14", week: "Week 14", title: "Stablecoin Supply Hits All-Time High at $220B", earnings: 12.50, topic: "Stablecoins" },
  { id: "report-2026-w13", week: "Week 13", title: "Base Surpasses Arbitrum in Daily Active Addresses", earnings: 8.00, topic: "Bitcoin" },
  { id: "report-2026-w12", week: "Week 12", title: "EU MiCA Enforcement Begins — Market Impact Analysis", earnings: 15.00, topic: "RWA" },
  { id: "report-2026-w11", week: "Week 11", title: "ZK-Proof Costs Drop 60% with New Proving Systems", earnings: 6.50, topic: "AI x Crypto" },
  { id: "report-2026-w10", week: "Week 10", title: "Tokenized Treasuries Cross $15B as Yields Compress", earnings: 11.00, topic: "RWA" },
];

// Transaction history
export const transactionHistory = [
  { id: "tx-1", type: "earning", amount: 0.50, description: "Report unlocked by reader", date: "Apr 12, 2026 14:32", source: "Locus Checkout" },
  { id: "tx-2", type: "spending", amount: 0.04, description: "CoinGecko Market Data API", date: "Apr 12, 2026 14:31", source: "Locus API Catalog", apiCalls: 12 },
  { id: "tx-3", type: "spending", amount: 0.03, description: "Crypto News Feed", date: "Apr 12, 2026 14:31", source: "Locus API Catalog", apiCalls: 8 },
  { id: "tx-4", type: "earning", amount: 0.50, description: "Report unlocked by reader", date: "Apr 12, 2026 13:45", source: "Locus Checkout" },
  { id: "tx-5", type: "earning", amount: 0.50, description: "Report unlocked by reader", date: "Apr 12, 2026 11:20", source: "Locus Checkout" },
];

// Agent stats
export const agentStats = {
  totalEarned: 53.00,
  totalSpent: 18.40,
  balance: 34.60,
  reportsGenerated: 6,
  totalReaders: 106,
  dataApiCalls: 247,
  spending: [
    { name: "CoinGecko Pro API", amount: 5.00, calls: 84, provider: "Locus API Catalog" },
    { name: "NewsAPI Fintech Feed", amount: 4.20, calls: 63, provider: "Locus API Catalog" },
    { name: "Messari Research API", amount: 6.00, calls: 42, provider: "Locus API Catalog" },
    { name: "DeFiLlama Premium", amount: 3.20, calls: 58, provider: "Locus API Catalog" },
  ],
  weeklyEarnings: [
    { week: "W10", earned: 11.00, spent: 3.40 },
    { week: "W11", earned: 6.50, spent: 2.80 },
    { week: "W12", earned: 15.00, spent: 3.20 },
    { week: "W13", earned: 8.00, spent: 3.00 },
    { week: "W14", earned: 12.50, spent: 3.10 },
    { week: "W15", earned: 0.00, spent: 2.90 },
  ],
};