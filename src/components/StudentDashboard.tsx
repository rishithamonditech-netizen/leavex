import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StudentSidebar } from "@/components/StudentSidebar";
import { StudentNavbar } from "@/components/StudentNavbar";
import { ApplyLeave } from "@/components/student/ApplyLeave";
import { AllLeaves } from "@/components/student/AllLeaves";
import { StudentDashboardHome } from "@/components/student/StudentDashboardHome";
import { StudentProfile } from "@/pages/StudentProfile";
import { useStudentAuth } from "@/hooks/useStudentAuth";

interface StudentDashboardProps {
  onBack: () => void;
}

export const StudentDashboard = ({ onBack }: StudentDashboardProps) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'apply-leave' | 'all-leaves' | 'profile'>('dashboard');
  const { student, signOut } = useStudentAuth();

  useEffect(() => {
    // If no student is authenticated, redirect back
    if (!student) {
      onBack();
    }
  }, [student, onBack]);

  const handleLogout = () => {
    signOut();
    onBack();
  };

  const renderContent = () => {
    switch (activeView) {
      case 'apply-leave':
        return <ApplyLeave student={student} />;
      case 'all-leaves':
        return <AllLeaves student={student} />;
      case 'profile':
        return <StudentProfile student={student} onBack={() => setActiveView('dashboard')} />;
      default:
        return <StudentDashboardHome student={student} />;
    }
  };

  if (!student) {
    return null; // or a loading spinner
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <StudentSidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1 flex flex-col">
          <StudentNavbar 
            onBack={onBack} 
            onProfile={() => setActiveView('profile')}
            onDashboard={() => setActiveView('dashboard')}
            onLogout={handleLogout}
          />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};