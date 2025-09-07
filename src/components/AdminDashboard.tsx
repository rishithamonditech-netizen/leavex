import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminNavbar } from "@/components/AdminNavbar";
import { AllApplications } from "@/components/admin/AllApplications";
import { AllStudents } from "@/components/admin/AllStudents";
import { AddStudent } from "@/components/admin/AddStudent";
import { AdminDashboardHome } from "@/components/admin/AdminDashboardHome";
import { AdminProfile } from "@/pages/AdminProfile";

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'applications' | 'students' | 'add-student' | 'profile'>('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'applications':
        return <AllApplications />;
      case 'students':
        return <AllStudents />;
      case 'add-student':
        return <AddStudent />;
      case 'profile':
        return <AdminProfile onBack={() => setActiveView('dashboard')} />;
      default:
        return <AdminDashboardHome />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1 flex flex-col">
          <AdminNavbar 
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