import { useState, useEffect } from "react";
import { Wallet, TrendingUp, Database, FileText, Users, Zap, Play, ChevronDown, ChevronUp, RefreshCw, Settings } from "lucide-react";
import { useAgentStore } from "@/store/agentStore";
import { generateReport, selectApisToPurchase, TOPICS } from "@/lib/agent";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, LineChart, Line, AreaChart, Area } from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const StatCard = ({ label, value, icon: Icon, accent = false, subtext }: { label: string; value: string; icon: React.ElementType; accent?: boolean; subtext?: string }) => (
  <div className="p-5 rounded-xl border border-border bg-surface-elevated">
    <div className="flex items-center justify-between mb-3">
      <span className="label-uppercase">{label}</span>
      <Icon className={`h-4 w-4 ${accent ? "text-accent" : "text-muted-foreground"}`} />
    </div>
    <p className={`text-2xl font-bold tracking-tight ${accent ? "gradient-text" : "text-foreground"}`}>{value}</p>
    {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
  </div>
);

const TransactionRow = ({ tx }: { tx: { id: string; type: string; amount: number; description: string; date: string; source: string; apiCalls?: number } }) => {
  const [expanded, setExpanded] = useState(false);
  const isEarning = tx.type === "earning";
  
  return (
    <div className="border-b border-border last:border-0">
      <div 
        className="flex items-center justify-between py-3 cursor-pointer hover:bg-secondary/50 px-2 -mx-2 rounded-lg transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isEarning ? "bg-accent/10" : "bg-warning/10"}`}>
            {isEarning ? <TrendingUp className="h-4 w-4 text-accent" /> : <Database className="h-4 w-4 text-warning" />}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{tx.description}</p>
            <p className="text-xs text-muted-foreground">{tx.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-semibold ${isEarning ? "text-accent" : "text-warning"}`}>
            {isEarning ? "+" : "-"}${tx.amount.toFixed(2)}
          </span>
          {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </div>
      {expanded && (
        <div className="px-2 pb-3 -mt-1">
          <div className="bg-secondary/50 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
            <p><span className="font-medium text-foreground">Type:</span> {tx.type === "earning" ? "Reader Payment" : "API Purchase"}</p>
            <p><span className="font-medium text-foreground">Source:</span> {tx.source}</p>
            {tx.apiCalls && <p><span className="font-medium text-foreground">API Calls:</span> {tx.apiCalls}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardView = () => {
  const {
    balance,
    totalEarned,
    totalSpent,
    reportsGenerated,
    totalReaders,
    dataApiCalls,
    weeklyEarnings,
    spending,
    transactionHistory,
    maxWeeklyBudget,
    selectedTopic,
    isGenerating,
    agentLogs,
    setMaxWeeklyBudget,
    setSelectedTopic,
    setIsGenerating,
    addAgentLog,
    clearAgentLogs,
    addSpending,
    advanceWeek,
  } = useAgentStore();

  const [currentWeek, setCurrentWeek] = useState(15);
  const [showSettings, setShowSettings] = useState(false);

  const maxEarned = Math.max(...weeklyEarnings.map(w => w.earned), 1);
  const netProfit = totalEarned - totalSpent;
  const weeklyBudgetUsed = (totalSpent % 10) / maxWeeklyBudget;

  const chartData = weeklyEarnings.map(w => ({
    week: w.week,
    earned: w.earned,
    spent: w.spent,
    net: w.earned - w.spent
  }));

  const handleAdvanceWeek = async () => {
    setIsGenerating(true);
    clearAgentLogs();
    
    const topic = selectedTopic || TOPICS[Math.floor(Math.random() * TOPICS.length)].name;
    
    const logs = [
      "Checking Locus wallet balance...",
      `Balance: $${balance.toFixed(2)} USDC`,
      "Fetching reader payments from this week...",
      `New readers: +$${(Math.random() * 3 + 2).toFixed(2)}`,
      `Selecting APIs for "${topic}" topic...`,
    ];
    
    for (const log of logs) {
      await new Promise(r => setTimeout(r, 400));
      addAgentLog(log);
    }
    
    await new Promise(r => setTimeout(r, 300));
    addAgentLog("Purchasing data APIs via Locus API Catalog...");
    
    const apisToBuy = selectApisToPurchase(topic, maxWeeklyBudget);
    
    for (const api of apisToBuy) {
      await new Promise(r => setTimeout(r, 500));
      addAgentLog(`✓ Purchased ${api.name} for $${api.cost} via Locus`);
      addSpending(api.cost, api.name, api.provider, Math.floor(Math.random() * 10) + 5);
    }
    
    await new Promise(r => setTimeout(r, 600));
    addAgentLog("Fetching market data from purchased APIs...");
    
    await new Promise(r => setTimeout(r, 800));
    addAgentLog("Generating report with Anthropic Claude...");
    
    try {
      const report = await generateReport({ topic });
      await new Promise(r => setTimeout(r, 1000));
      addAgentLog(`✓ Report generated: "${report.title}"`);
      addAgentLog(`✓ Published: ${report.week} Report`);
      setCurrentWeek(currentWeek + 1);
      advanceWeek();
    } catch {
      addAgentLog("Error generating report. Using cached data...");
    }
    
    await new Promise(r => setTimeout(r, 500));
    addAgentLog("Week advanced successfully!");
    setIsGenerating(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="label-uppercase">Agent Dashboard</span>
        </div>
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agent Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Max Weekly Data Budget
                </label>
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[maxWeeklyBudget]} 
                    onValueChange={([val]) => setMaxWeeklyBudget(val)}
                    min={1} 
                    max={10} 
                    step={0.5}
                    className="flex-1"
                  />
                  <span className="text-sm font-semibold w-16 text-right">${maxWeeklyBudget.toFixed(2)}</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                The agent will spend up to ${maxWeeklyBudget.toFixed(2)} per week on data APIs from the Locus catalog.
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">AutoInsight Autonomy Loop</h1>
      <p className="text-muted-foreground text-base mb-8">
        Earns from readers, reinvests into data APIs, generates next week&apos;s report.
      </p>

      {/* Agent Status Banner */}
      <div className="mb-8 p-4 rounded-xl border border-accent/20 bg-accent/5">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-accent animate-pulse" : "bg-green-500"}`} />
          <span className="text-sm font-semibold text-foreground">
            {isGenerating ? "Generating Report..." : "Agent Active"}
          </span>
          <Badge variant="secondary" className="ml-auto text-xs">
            Week {currentWeek}, 2026
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          This week AutoInsight autonomously spent <span className="text-warning font-medium">${(totalSpent % 10).toFixed(2)}</span> on market data and earned <span className="text-accent font-medium">${(totalEarned % 10).toFixed(2)}</span> from readers → Net <span className={`font-medium ${netProfit >= 0 ? "text-accent" : "text-destructive"}`}>{netProfit >= 0 ? "+" : ""}${netProfit.toFixed(2)}</span>
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
        <StatCard label="Total Earned" value={`$${totalEarned.toFixed(2)}`} icon={TrendingUp} accent subtext="From reader payments" />
        <StatCard label="Total Spent" value={`$${totalSpent.toFixed(2)}`} icon={Wallet} subtext="On data APIs & AI" />
        <StatCard label="Balance" value={`$${balance.toFixed(2)}`} icon={Wallet} accent subtext="Current Locus wallet" />
        <StatCard label="Reports" value={String(reportsGenerated)} icon={FileText} subtext="Generated this cycle" />
        <StatCard label="Readers" value={String(totalReaders)} icon={Users} subtext="Total report unlocks" />
        <StatCard label="API Calls" value={String(dataApiCalls)} icon={Database} subtext="Data fetched" />
      </div>

      {/* Weekly Earnings Chart */}
      <div className="mb-10">
        <span className="label-uppercase">Weekly Revenue vs Spending</span>
        <div className="h-48 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={4}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
              />
              <Bar dataKey="earned" fill="#10b981" radius={[4, 4, 0, 0]} name="Earned" />
              <Bar dataKey="spent" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#10b981]" />
            Earned
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b]" />
            Spent on APIs
          </div>
        </div>
      </div>

      {/* Net Profit Chart */}
      <div className="mb-10">
        <span className="label-uppercase">Net Profit Over Time</span>
        <div className="h-40 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Net']}
              />
              <Area 
                type="monotone" 
                dataKey="net" 
                stroke="#8b5cf6" 
                fill="url(#profitGradient)" 
                strokeWidth={2}
                name="Net Profit"
              />
              <defs>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#8b5cf6]" />
            Net Profit (Earned - Spent)
          </div>
        </div>
      </div>

      {/* Autonomy Loop Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <span className="label-uppercase">Autonomy Loop</span>
          <Badge variant="outline" className="text-xs">Demo Mode</Badge>
        </div>
        
        {/* Topic Selection */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Select topic for next report:</p>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map(topic => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(selectedTopic === topic.name ? null : topic.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedTopic === topic.name 
                    ? "bg-accent text-accent-foreground" 
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {topic.name}
              </button>
            ))}
            <button
              onClick={() => setSelectedTopic(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedTopic === null 
                  ? "bg-accent text-accent-foreground" 
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              Agent Picks (Auto)
            </button>
          </div>
        </div>

        {/* Autonomy Loop Visualization */}
        <div className="border border-border rounded-xl p-6 bg-secondary">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">The Economic Loop</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">Earn</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded-full bg-warning/10 text-warning text-xs font-medium">Buy Data</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded-full bg-foreground/10 text-foreground text-xs font-medium">Generate</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">Publish</span>
          </div>
          
          {/* Budget Progress */}
          <div className="mb-4 p-3 rounded-lg bg-background/50">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Weekly budget used</span>
              <span className="font-medium text-foreground">{((weeklyBudgetUsed) * 100).toFixed(0)}%</span>
            </div>
            <Progress value={Math.min(weeklyBudgetUsed * 100, 100)} className="h-2" />
          </div>
          
          {/* Advance Week Button */}
          <Button 
            onClick={handleAdvanceWeek} 
            disabled={isGenerating}
            className="w-full rounded-xl h-11 font-medium"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Advance to Next Week
              </>
            )}
          </Button>

          {/* Agent Activity Log */}
          {agentLogs.length > 0 && (
            <div className="mt-4 bg-background/50 rounded-lg p-3 font-mono text-xs max-h-48 overflow-y-auto">
              <p className="text-muted-foreground mb-2">Agent Activity Log:</p>
              {agentLogs.map((log, i) => (
                <p key={i} className={`py-0.5 ${log.startsWith('✓') ? 'text-accent' : 'text-foreground/80'}`}>
                  <span className="text-muted-foreground mr-2">{">"}</span>
                  {log}
                </p>
              ))}
              {isGenerating && (
                <p className="text-muted-foreground py-0.5 animate-pulse">
                  <span className="text-muted-foreground mr-2">{">"}</span>
                  Processing...
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Data API Spending */}
      <div className="mb-10">
        <span className="label-uppercase">API Spending Breakdown</span>
        <div className="mt-4 space-y-2">
          {spending.map((api) => (
            <div key={api.name} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Database className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{api.name}</p>
                  <p className="text-xs text-muted-foreground">{api.calls} API calls via Locus</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-foreground">${api.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="mb-10">
        <span className="label-uppercase">Transaction History</span>
        <div className="mt-4 rounded-xl border border-border bg-surface-elevated overflow-hidden">
          <div className="p-4 border-b border-border bg-secondary/50">
            <p className="text-sm text-muted-foreground">Recent transactions from Locus wallet</p>
          </div>
          <div className="p-4 max-h-80 overflow-y-auto">
            {transactionHistory.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </div>
        </div>
      </div>

      {/* How AutoInsight Works */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-accent/5 to-secondary p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">How AutoInsight Works</h3>
        <div className="space-y-4">
          {[
            { step: "1", title: "Generate", desc: "AI writes a 500-word fintech & Web3 research report every week using Anthropic Claude." },
            { step: "2", title: "Earn", desc: "Readers pay $0.50 USDC via Locus Checkout to unlock the full report." },
            { step: "3", title: "Reinvest", desc: "Earnings purchase data APIs from the Locus catalog — news feeds, market data, analytics." },
            { step: "4", title: "Repeat", desc: "Better data makes better reports. The agent improves autonomously every week." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full h-fit">{item.step}</span>
              <div>
                <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
