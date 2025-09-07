import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, CheckCircle, XCircle, Clock } from "lucide-react";

export const AdminDashboardHome = () => {
  // Mock data for demonstration
  const stats = {
    totalStudents: 45,
    totalApplications: 23,
    pendingApplications: 8,
    approvedApplications: 12,
    rejectedApplications: 3,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening in your hostel today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Registered students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">All time applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pendingApplications}</div>
            <p className="text-xs text-muted-foreground">Awaiting your review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.approvedApplications}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.rejectedApplications}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">80%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest leave applications submitted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "John Doe", room: "A-101", reason: "Medical Emergency", status: "pending" },
                { name: "Jane Smith", room: "B-203", reason: "Family Function", status: "approved" },
                { name: "Mike Johnson", room: "C-305", reason: "Job Interview", status: "pending" },
              ].map((application, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{application.name}</p>
                    <p className="text-sm text-muted-foreground">Room {application.room} • {application.reason}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    application.status === 'pending' ? 'bg-warning/10 text-warning' :
                    application.status === 'approved' ? 'bg-success/10 text-success' : 
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <div>
                  <p className="font-medium">Review Pending Applications</p>
                  <p className="text-sm text-muted-foreground">{stats.pendingApplications} applications waiting</p>
                </div>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <div>
                  <p className="font-medium">Add New Student</p>
                  <p className="text-sm text-muted-foreground">Register a new hostel resident</p>
                </div>
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <div>
                  <p className="font-medium">Generate Reports</p>
                  <p className="text-sm text-muted-foreground">Monthly leave summary</p>
                </div>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};