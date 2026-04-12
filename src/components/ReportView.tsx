import { useState } from "react";
import { Lock, CheckCircle, ArrowRight, Clock } from "lucide-react";
import { currentReport, pastReports } from "@/data/mockReport";
import { Button } from "@/components/ui/button";
import reportIllustration from "@/assets/report-illustration.png";
import analyticsIllustration from "@/assets/analytics-illustration.png";

const ReportView = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [paying, setPaying] = useState(false);

  const words = currentReport.content.split(" ");
  const previewText = words.slice(0, currentReport.previewWordCount).join(" ");
  const fullText = currentReport.content;

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setUnlocked(true);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Report Hero Image */}
      <div className="rounded-2xl overflow-hidden bg-secondary mb-8">
        <img
          src={reportIllustration}
          alt="Weekly fintech research report"
          width={1200}
          height={800}
          className="w-full h-64 object-contain"
        />
      </div>

      {/* Current Report */}
      <div className="mb-4">
        <span className="label-uppercase">{currentReport.week}</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight leading-tight">
        {currentReport.title}
      </h1>
      <p className="text-muted-foreground text-base mb-8">{currentReport.date} · ~500 words · AI-generated research</p>

      {/* Report Content */}
      <article className="prose-content mb-8">
        {unlocked ? (
          <div className="space-y-4">
            {fullText.split("\n\n").map((paragraph, i) => (
              <div key={i}>
                <p className="text-foreground leading-relaxed text-[15px]">{paragraph}</p>
                {i === 1 && (
                  <div className="my-6 rounded-xl overflow-hidden bg-secondary p-6">
                    <img
                      src={analyticsIllustration}
                      alt="DeFi analytics and market charts"
                      loading="lazy"
                      width={800}
                      height={640}
                      className="w-full h-48 object-contain"
                    />
                    <p className="text-xs text-muted-foreground text-center mt-3">Weekly DeFi market overview — Source: Agent data APIs</p>
                  </div>
                )}
              </div>
            ))}
            <div className="mt-8 flex items-center gap-2 text-sm text-accent">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">Paid $0.50 USDC via Locus Checkout</span>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-foreground leading-relaxed text-[15px]">{previewText}...</p>
            
            {/* Blurred preview */}
            <div className="relative mt-4">
              <div className="blur-paywall">
                <p className="text-foreground leading-relaxed text-[15px]">
                  {words.slice(currentReport.previewWordCount, currentReport.previewWordCount + 80).join(" ")}...
                </p>
                <p className="text-foreground leading-relaxed text-[15px]">
                  {words.slice(currentReport.previewWordCount + 80, currentReport.previewWordCount + 150).join(" ")}...
                </p>
              </div>
              
              {/* Paywall overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-background/80 to-background">
                <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary mb-4">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Read the full report</h3>
                  <p className="text-sm text-muted-foreground mb-5">One-time micropayment · No subscription required</p>
                  <Button
                    onClick={handlePay}
                    disabled={paying}
                    className="rounded-full px-6 h-10 text-sm font-medium"
                  >
                    {paying ? (
                      <>
                        <Clock className="h-3.5 w-3.5 mr-2 animate-spin" />
                        Confirming payment...
                      </>
                    ) : (
                      <>
                        Pay $0.50 USDC
                        <ArrowRight className="h-3.5 w-3.5 ml-2" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">Powered by Locus Checkout</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Divider */}
      <div className="border-t border-border my-12" />

      {/* Past Reports */}
      <div className="mb-6">
        <span className="label-uppercase">Past Reports</span>
      </div>
      <div className="space-y-3">
        {pastReports.map((report) => (
          <div
            key={report.id}
            className="flex items-center justify-between py-3 border-b border-border last:border-0 group"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">
                {report.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{report.week} · ${report.earnings.toFixed(2)} earned</p>
            </div>
            <CheckCircle className="h-3.5 w-3.5 text-accent ml-4 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportView;
