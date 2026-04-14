import { Link } from "react-router-dom";
import { useAgentStore } from "@/store/agentStore";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, CheckCircle, Clock, Sparkles } from "lucide-react";

const ReportsArchive = () => {
  const { pastReports } = useAgentStore();

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F3F4F6] h-[64px]">
        <div className="max-w-[1200px] mx-auto px-10 md:px-20 h-full flex items-center justify-between">
          <Link to="/" className="font-extrabold text-[#111] tracking-tight text-[18px]">
            AutoInsight
          </Link>
          <nav className="flex items-center gap-8 text-[14px] font-medium">
            <Link to="/reports" className="hover:text-[#111]">
              Current Report
            </Link>
            <Link to="/dashboard" className="hover:text-[#111]">
              Dashboard
            </Link>
            <Link to="/archive" className="text-[#111] font-bold border-b-2 border-[#F97316] h-[64px] flex items-center">
              Archive
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="py-[100px] px-[80px] max-w-[1200px] mx-auto">
          <h1 className="text-[52px] leading-[1.1] font-bold text-[#111111] mb-6">
            Report Archive
          </h1>
          <p className="text-base text-[#6B7280] leading-[1.65] max-w-[2xl] mb-12">
            Browse all previously generated research reports from the AutoInsight agent.
          </p>
          
          <div className="grid gap-6">
            {pastReports.map((report) => (
              <Link 
                key={report.id} 
                to={`/reports/${report.id}`} 
                className="group rounded-xl border border-gray-200 hover:border-[#F97316] hover:shadow-lg transition-all duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-[#F97316] rounded-full" />
                    <h3 className="text-lg font-semibold text-[#111111]">{report.title}</h3>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-2">
                    {report.topic} • {report.week}
                  </p>
                  <p className="line-clamp-3 text-base text-[#374151] leading-[1.6]">
                    {report.summary}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="px-4 py-2 text-xs"
                    >
                      Read Report
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                    <span className="text-xs text-[#F97316] font-medium">
                      ${report.isUnlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-[#F3F4F6] py-8">
        <div className="max-w-[1200px] mx-auto px-10 md:px-20 flex items-center justify-between text-xs text-[#6B7280]">
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

export default ReportsArchive;