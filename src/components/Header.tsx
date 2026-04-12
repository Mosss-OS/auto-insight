import { Bot } from "lucide-react";

interface HeaderProps {
  activeTab: "report" | "dashboard";
  onTabChange: (tab: "report" | "dashboard") => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground tracking-tight">ContentAgent</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <button
            onClick={() => onTabChange("report")}
            className={`transition-colors ${
              activeTab === "report"
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Report
          </button>
          <button
            onClick={() => onTabChange("dashboard")}
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
  );
};

export default Header;
