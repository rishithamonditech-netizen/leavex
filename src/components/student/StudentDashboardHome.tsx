import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Clock, CheckCircle, XCircle } from "lucide-react";

export const StudentDashboardHome = () => {
  // Mock data for demonstration
  const studentInfo = {
    name: "John Doe",
    rollNumber: "2024001",
    room: "A-101",
    course: "Computer Science",
    year: "3rd Year",
  };

  const leaveStats = {
    totalApplications: 5,
    pending: 1,
    approved: 3,
    rejected: 1,
    remainingLeaves: 15, // out of 20 per semester
  };

  const recentApplications = [
    {
      id: 1,
      reason: "Medical Emergency",
      fromDate: "2024-01-15",
      toDate: "2024-01-20",
      status: "approved",
      submittedDate: "2024-01-10",
    },
    {
      id: 2,
      reason: "Family Function",
      fromDate: "2024-01-25",
      toDate: "2024-01-27",
      status: "pending",
      submittedDate: "2024-01-20",
    },
    {
      id: 3,
      reason: "Personal Work",
      fromDate: "2024-01-05",
      toDate: "2024-01-07",
      status: "rejected",
      submittedDate: "2024-01-01",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-warning';
      case 'approved': return 'text-success';
      case 'rejected': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {studentInfo.name}!</h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your leave applications and hostel information.
        </p>
      </div>

      {/* Student Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
          <CardDescription>Personal and academic details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Roll Number</p>
              <p className="text-lg font-semibold">{studentInfo.rollNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Room</p>
              <p className="text-lg font-semibold">{studentInfo.room}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Course</p>
              <p className="text-lg font-semibold">{studentInfo.course}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Year</p>
              <p className="text-lg font-semibold">{studentInfo.year}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Leave Balance</p>
              <p className="text-lg font-semibold text-primary">{leaveStats.remainingLeaves} days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leave Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveStats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{leaveStats.pending}</div>
            <p className="text-xs text-muted-foreground">Under review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{leaveStats.approved}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{leaveStats.rejected}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Your latest leave requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{application.reason}</p>
                    <p className="text-sm text-muted-foreground">
                      {application.fromDate} to {application.toDate}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    <span className="text-sm font-medium capitalize">{application.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start h-auto p-4" variant="outline">
                <Calendar className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Apply for New Leave</p>
                  <p className="text-sm text-muted-foreground">Submit a new leave application</p>
                </div>
              </Button>
              
              <Button className="w-full justify-start h-auto p-4" variant="outline">
                <FileText className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">View All Applications</p>
                  <p className="text-sm text-muted-foreground">Check status of all your applications</p>
                </div>
              </Button>
              
              <Button className="w-full justify-start h-auto p-4" variant="outline">
                <Clock className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Pending Approvals</p>
                  <p className="text-sm text-muted-foreground">{leaveStats.pending} application awaiting approval</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};