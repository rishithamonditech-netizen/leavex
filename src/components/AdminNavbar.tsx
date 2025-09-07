import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, LayoutDashboard, LogOut, ArrowLeft } from "lucide-react";

interface AdminNavbarProps {
  onBack: () => void;
  onProfile: () => void;
  onDashboard: () => void;
  onLogout: () => void;
}

export const AdminNavbar = ({ onBack, onProfile, onDashboard, onLogout }: AdminNavbarProps) => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setTimeout(() => {
      onLogout();
    }, 1000);
  };
  return (
    <header className="h-16 border-b border-border bg-card">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Admin Panel</h1>
        </div>
        
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onProfile}>
            <User className="w-4 h-4 mr-2" />
            My Profile
          </Button>
          <Button variant="ghost" size="sm" onClick={onDashboard}>
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
};