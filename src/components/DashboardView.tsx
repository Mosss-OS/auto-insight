import { Wallet, TrendingUp, Database, FileText, Users, Zap } from "lucide-react";
import { agentStats } from "@/data/mockReport";

const StatCard = ({ label, value, icon: Icon, accent = false }: { label: string; value: string; icon: React.ElementType; accent?: boolean }) => (
  <div className="p-5 rounded-xl border border-border bg-surface-elevated">
    <div className="flex items-center justify-between mb-3">
      <span className="label-uppercase">{label}</span>
      <Icon className={`h-4 w-4 ${accent ? "text-accent" : "text-muted-foreground"}`} />
    </div>
    <p className={`text-2xl font-bold tracking-tight ${accent ? "gradient-text" : "text-foreground"}`}>{value}</p>
  </div>
);

const DashboardView = () => {
  const maxEarned = Math.max(...agentStats.weeklyEarnings.map(w => w.earned));

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-4">
        <span className="label-uppercase">Agent Dashboard</span>
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">ContentAgent Autonomy Loop</h1>
      <p className="text-muted-foreground text-base mb-10">
        Earns from readers, reinvests into data APIs, generates next week's report.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
        <StatCard label="Total Earned" value={`$${agentStats.totalEarned.toFixed(2)}`} icon={TrendingUp} accent />
        <StatCard label="Total Spent" value={`$${agentStats.totalSpent.toFixed(2)}`} icon={Wallet} />
        <StatCard label="Balance" value={`$${agentStats.balance.toFixed(2)}`} icon={Wallet} accent />
        <StatCard label="Reports" value={String(agentStats.reportsGenerated)} icon={FileText} />
        <StatCard label="Readers" value={String(agentStats.totalReaders)} icon={Users} />
        <StatCard label="API Calls" value={String(agentStats.dataApiCalls)} icon={Database} />
      </div>

      {/* Weekly Earnings Chart */}
      <div className="mb-10">
        <span className="label-uppercase">Weekly Revenue</span>
        <div className="mt-4 space-y-2">
          {agentStats.weeklyEarnings.map((week) => (
            <div key={week.week} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-8 font-medium">{week.week}</span>
              <div className="flex-1 flex items-center gap-1 h-6">
                <div
                  className="h-5 rounded-sm bg-accent/20 transition-all"
                  style={{ width: `${(week.earned / maxEarned) * 100}%`, minWidth: week.earned > 0 ? "4px" : "0" }}
                />
                <div
                  className="h-5 rounded-sm bg-destructive/20 transition-all"
                  style={{ width: `${(week.spent / maxEarned) * 100}%`, minWidth: "4px" }}
                />
              </div>
              <span className="text-xs text-foreground font-medium w-16 text-right">
                ${week.earned.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-accent/20" />
            Earned
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-destructive/20" />
            Spent on APIs
          </div>
        </div>
      </div>

      {/* Data API Spending */}
      <div className="mb-10">
        <span className="label-uppercase">Data API Spending</span>
        <div className="mt-4 space-y-2">
          {agentStats.spending.map((api) => (
            <div key={api.name} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{api.name}</p>
                <p className="text-xs text-muted-foreground">{api.calls} calls</p>
              </div>
              <span className="text-sm font-semibold text-foreground">${api.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Autonomy Loop */}
      <div className="border border-border rounded-xl p-6 bg-secondary">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-accent" />
          <span className="text-sm font-semibold text-foreground">Autonomy Loop</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">Earn</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded-full bg-warning/10 text-warning text-xs font-medium">Buy Data</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded-full bg-foreground/10 text-foreground text-xs font-medium">Generate</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">Publish</span>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          The agent autonomously earns USDC from readers, purchases data API access from the Locus catalog, and generates the next weekly report.
        </p>
      </div>
    </div>
  );
};

export default DashboardView;
