import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StudentSidebar } from "@/components/StudentSidebar";
import { StudentNavbar } from "@/components/StudentNavbar";
import { ApplyLeave } from "@/components/student/ApplyLeave";
import { AllLeaves } from "@/components/student/AllLeaves";
import { StudentDashboardHome } from "@/components/student/StudentDashboardHome";
import { StudentProfile } from "@/pages/StudentProfile";

interface StudentDashboardProps {
  onBack: () => void;
}

export const StudentDashboard = ({ onBack }: StudentDashboardProps) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'apply-leave' | 'all-leaves' | 'profile'>('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'apply-leave':
        return <ApplyLeave />;
      case 'all-leaves':
        return <AllLeaves />;
      case 'profile':
        return <StudentProfile onBack={() => setActiveView('dashboard')} />;
      default:
        return <StudentDashboardHome />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <StudentSidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1 flex flex-col">
          <StudentNavbar 
            onBack={onBack} 
            onProfile={() => setActiveView('profile')}
            onDashboard={() => setActiveView('dashboard')}
            onLogout={onBack}
          />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};