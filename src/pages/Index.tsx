import { useState } from "react";
import { Link } from "react-router-dom";
import { Bot } from "lucide-react";
import ReportView from "@/components/ReportView";
import DashboardView from "@/components/DashboardView";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"report" | "dashboard">("report");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-accent" />
            <span className="font-semibold text-foreground tracking-tight">ContentAgent</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <button
              data-tab="report"
              onClick={() => setActiveTab("report")}
              className={`transition-colors ${
                activeTab === "report"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Report
            </button>
            <button
              data-tab="dashboard"
              onClick={() => setActiveTab("dashboard")}
              className={`transition-colors ${
                activeTab === "dashboard"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dashboard
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {activeTab === "report" ? <ReportView /> : <DashboardView />}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
