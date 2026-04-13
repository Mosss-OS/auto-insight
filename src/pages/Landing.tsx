import { ArrowRight, Sparkles, Zap, BarChart3, DollarSign, RefreshCw, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.png";
import paymentIllustration from "@/assets/payment-illustration.png";
import loopIllustration from "@/assets/loop-illustration.png";
import analyticsIllustration from "@/assets/analytics-illustration.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold text-foreground tracking-tight text-lg">AutoInsight</span>
          <div className="flex items-center gap-4">
            <Link to="/reports" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Reports
            </Link>
            <Link to="/reports">
              <Button className="rounded-full h-9 px-5 text-sm">
                Get started
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm text-muted-foreground mb-6">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              AI-powered research, delivered weekly
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight leading-[1.08] mb-5">
              Research that<br />
              <span className="gradient-text">pays for itself.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-8">
              AutoInsight is an autonomous AI agent that writes fintech & Web3 research, earns real USDC from readers, and reinvests earnings into data APIs to fuel the next report.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/reports">
                <Button className="rounded-full h-11 px-7 text-sm font-medium">
                  Read this week's report
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="/reports" onClick={() => setTimeout(() => document.querySelector('[data-tab="dashboard"]')?.dispatchEvent(new Event('click')), 100)}>
                <Button variant="outline" className="rounded-full h-11 px-7 text-sm font-medium">
                  View dashboard
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={heroIllustration}
              alt="AI robot reading research report"
              width={1024}
              height={1024}
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="notion-peach-bg py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="label-uppercase mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              The autonomous loop
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src={loopIllustration}
              alt="Autonomous earn-spend-generate loop"
              loading="lazy"
              width={800}
              height={640}
              className="w-full max-w-sm mx-auto"
            />
            <div className="space-y-8">
              {[
                { step: "01", title: "Generate", desc: "AI writes a 500-word fintech & Web3 research report every week." },
                { step: "02", title: "Earn", desc: "Readers pay $0.50 USDC via micropayment to unlock the full report." },
                { step: "03", title: "Reinvest", desc: "Earnings buy data APIs from the Locus catalog — news, market data, analytics." },
                { step: "04", title: "Repeat", desc: "Better data makes better reports. The agent improves autonomously." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="text-xs font-semibold text-accent mt-1">{item.step}</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-secondary">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">AI-Generated Reports</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Weekly 500-word research covering DeFi, RWA tokenization, cross-border payments, and more.
              </p>
              <img
                src={analyticsIllustration}
                alt="Analytics charts"
                loading="lazy"
                width={800}
                height={640}
                className="w-full mt-6"
              />
            </div>

            <div className="p-8 rounded-2xl notion-peach-bg">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <Zap className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Micropayments via USDC</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No subscriptions. Pay $0.50 per report with Locus Checkout. Instant, borderless.
              </p>
              <img
                src={paymentIllustration}
                alt="USDC payment illustration"
                loading="lazy"
                width={800}
                height={640}
                className="w-full mt-6"
              />
            </div>

            <div className="p-8 rounded-2xl notion-blue-bg">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <BarChart3 className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Full Transparency</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                See exactly how much the agent earns and spends. Every API call, every dollar, tracked.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { label: "Total Earned", value: "$53.00" },
                  { label: "API Spend", value: "$18.40" },
                  { label: "Net Balance", value: "$34.60" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-2 border-b border-foreground/5 last:border-0">
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                    <span className="text-sm font-semibold text-foreground">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AutoInsight */}
      <section className="py-24 notion-peach-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="label-uppercase mb-3">Why AutoInsight</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              The first self-sustaining AI research agent
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Earn Real Money</h3>
              <p className="text-sm text-muted-foreground">
                AutoInsight earns actual USDC from readers. No fake tokens or simulated value.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Autonomous Reinvestment</h3>
              <p className="text-sm text-muted-foreground">
                Earnings are automatically reinvested into better data APIs for improved research.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Transparent Operations</h3>
              <p className="text-sm text-muted-foreground">
                Every transaction is logged. See exactly where every cent goes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            Start reading smarter.
          </h2>
          <p className="text-muted-foreground mb-8">
            $0.50 per report. No subscription. No commitment.
          </p>
          <Link to="/reports">
            <Button className="rounded-full h-11 px-8 text-sm font-medium">
              Read this week's report
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>© AutoInsight 2026</span>
          <div className="flex items-center gap-4">
            <span>Powered by Locus</span>
            <span>·</span>
            <span>AI-Powered Research</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
