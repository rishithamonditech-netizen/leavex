import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockApplications = [
  {
    id: 1,
    studentName: "John Doe",
    rollNumber: "2024001",
    room: "A-101",
    leaveType: "Medical",
    reason: "Medical emergency - need to visit home for surgery",
    fromDate: "2024-01-15",
    toDate: "2024-01-20",
    status: "pending",
    submittedDate: "2024-01-10",
  },
  {
    id: 2,
    studentName: "Jane Smith",
    rollNumber: "2024002",
    room: "B-203",
    leaveType: "Personal",
    reason: "Sister's wedding ceremony",
    fromDate: "2024-01-18",
    toDate: "2024-01-22",
    status: "approved",
    submittedDate: "2024-01-08",
  },
  {
    id: 3,
    studentName: "Mike Johnson",
    rollNumber: "2024003",
    room: "C-305",
    leaveType: "Academic",
    reason: "Job interview at tech company",
    fromDate: "2024-01-25",
    toDate: "2024-01-26",
    status: "rejected",
    submittedDate: "2024-01-12",
  },
  {
    id: 4,
    studentName: "Sarah Wilson",
    rollNumber: "2024004",
    room: "D-407",
    leaveType: "Emergency",
    reason: "Grandfather passed away",
    fromDate: "2024-01-20",
    toDate: "2024-01-25",
    status: "pending",
    submittedDate: "2024-01-14",
  },
];

export const AllApplications = () => {
  const [applications, setApplications] = useState(mockApplications);
  const { toast } = useToast();

  const handleStatusChange = (id: number, newStatus: 'approved' | 'rejected') => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    
    toast({
      title: `Application ${newStatus}`,
      description: `The leave application has been ${newStatus} successfully.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-warning border-warning"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-success border-success"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-destructive border-destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const ApplicationCard = ({ application }: { application: typeof mockApplications[0] }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{application.studentName}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {application.rollNumber} • Room {application.room}
            </p>
          </div>
          {getStatusBadge(application.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Leave Type:</span> {application.leaveType}
            </div>
            <div>
              <span className="font-medium">Duration:</span> {application.fromDate} to {application.toDate}
            </div>
          </div>
          <div>
            <span className="font-medium text-sm">Reason:</span>
            <p className="text-sm text-muted-foreground mt-1">{application.reason}</p>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-muted-foreground">
              Submitted: {application.submittedDate}
            </span>
            {application.status === 'pending' && (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => handleStatusChange(application.id, 'rejected')}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button 
                  size="sm"
                  className="bg-success hover:bg-success/90 text-success-foreground"
                  onClick={() => handleStatusChange(application.id, 'approved')}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedApplications = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">All Applications</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage student leave applications
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingApplications.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedApplications.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {applications.map(application => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="space-y-4">
            {pendingApplications.map(application => (
              <ApplicationCard key={application.id} application={application} />
            ))}
            {pendingApplications.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No pending applications</p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <div className="space-y-4">
            {approvedApplications.map(application => (
              <ApplicationCard key={application.id} application={application} />
            ))}
            {approvedApplications.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No approved applications</p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <div className="space-y-4">
            {rejectedApplications.map(application => (
              <ApplicationCard key={application.id} application={application} />
            ))}
            {rejectedApplications.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No rejected applications</p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};