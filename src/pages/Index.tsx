import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Building2, Calendar } from "lucide-react";
import { AdminDashboard } from "@/components/AdminDashboard";
import { StudentDashboard } from "@/components/StudentDashboard";
import { AdminSignin } from "@/pages/AdminSignin";
import { StudentSignin } from "@/pages/StudentSignin";
const Index = () => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'student' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Show dashboard if authenticated
  if (isAuthenticated && selectedRole === 'admin') {
    return <AdminDashboard onBack={() => { setSelectedRole(null); setIsAuthenticated(false); }} />;
  }
  if (isAuthenticated && selectedRole === 'student') {
    return <StudentDashboard onBack={() => { setSelectedRole(null); setIsAuthenticated(false); }} />;
  }

  // Show sign-in pages if role selected but not authenticated
  if (selectedRole === 'admin') {
    return <AdminSignin onBack={() => setSelectedRole(null)} onSuccess={() => setIsAuthenticated(true)} />;
  }
  if (selectedRole === 'student') {
    return <StudentSignin onBack={() => setSelectedRole(null)} onSuccess={() => setIsAuthenticated(true)} />;
  }
  return <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Calendar className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground">
              LeaveX
            </h1>
          </div>
          <h2 className="text-3xl font-semibold mb-4 text-foreground">
            Hostel Leave Management System
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">For Hostel residents and Administrators</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <UserCheck className="w-12 h-12 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription className="text-base">
                Manage students, review applications, and approve/reject leave requests
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button className="w-full h-12 text-lg font-medium" onClick={() => setSelectedRole('admin')}>
                Continue as Admin
              </Button>
              <div className="mt-4 text-sm text-muted-foreground space-y-1">
                <p>• Manage student records</p>
                <p>• Review leave applications</p>
                <p>• Generate reports</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="w-12 h-12 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Student Portal</CardTitle>
              <CardDescription className="text-base">
                Apply for leave, track your applications, and manage your profile
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button className="w-full h-12 text-lg font-medium" onClick={() => setSelectedRole('student')}>
                Continue as Student
              </Button>
              <div className="mt-4 text-sm text-muted-foreground space-y-1">
                <p>• Submit leave applications</p>
                <p>• Track application status</p>
                <p>• View leave history</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default Index;