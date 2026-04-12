import { useState } from "react";
import Header from "@/components/Header";
import ReportView from "@/components/ReportView";
import DashboardView from "@/components/DashboardView";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"report" | "dashboard">("report");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        {activeTab === "report" ? <ReportView /> : <DashboardView />}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
