import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock, Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

// Mock data for demonstration
const mockLeaveApplications = [
  {
    id: 1,
    leaveType: "Medical",
    reason: "Medical emergency - need to visit home for surgery consultation",
    fromDate: "2024-01-15",
    toDate: "2024-01-20",
    duration: 6,
    status: "approved",
    submittedDate: "2024-01-10",
    reviewedDate: "2024-01-12",
    reviewedBy: "Dr. Smith (Warden)",
    emergencyContact: "Father - John Doe Sr.",
    emergencyPhone: "+91 9876543210",
  },
  {
    id: 2,
    leaveType: "Personal",
    reason: "Sister's wedding ceremony and family function",
    fromDate: "2024-01-25",
    toDate: "2024-01-27",
    duration: 3,
    status: "pending",
    submittedDate: "2024-01-20",
    emergencyContact: "Mother - Jane Doe",
    emergencyPhone: "+91 9876543211",
  },
  {
    id: 3,
    leaveType: "Academic",
    reason: "Job interview at tech company in Bangalore",
    fromDate: "2024-01-05",
    toDate: "2024-01-07",
    duration: 3,
    status: "rejected",
    submittedDate: "2024-01-01",
    reviewedDate: "2024-01-03",
    reviewedBy: "Dr. Johnson (Warden)",
    rejectionReason: "Academic schedule conflict during exam preparation",
    emergencyContact: "Uncle - Mike Doe",
    emergencyPhone: "+91 9876543212",
  },
  {
    id: 4,
    leaveType: "Emergency",
    reason: "Grandfather's sudden illness",
    fromDate: "2023-12-20",
    toDate: "2023-12-25",
    duration: 6,
    status: "approved",
    submittedDate: "2023-12-19",
    reviewedDate: "2023-12-19",
    reviewedBy: "Dr. Smith (Warden)",
    emergencyContact: "Father - John Doe Sr.",
    emergencyPhone: "+91 9876543210",
  },
  {
    id: 5,
    leaveType: "Family",
    reason: "Family reunion and religious festival",
    fromDate: "2023-12-10",
    toDate: "2023-12-15",
    duration: 6,
    status: "approved",
    submittedDate: "2023-12-05",
    reviewedDate: "2023-12-07",
    reviewedBy: "Dr. Smith (Warden)",
    emergencyContact: "Mother - Jane Doe",
    emergencyPhone: "+91 9876543211",
  },
];

export const AllLeaves = () => {
  const [applications] = useState(mockLeaveApplications);
  const [selectedApplication, setSelectedApplication] = useState<typeof mockLeaveApplications[0] | null>(null);

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

  const ApplicationCard = ({ application }: { application: typeof mockLeaveApplications[0] }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{application.leaveType} Leave</CardTitle>
            <p className="text-sm text-muted-foreground">
              {application.duration} days • {application.fromDate} to {application.toDate}
            </p>
          </div>
          {getStatusBadge(application.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <span className="font-medium text-sm">Reason:</span>
            <p className="text-sm text-muted-foreground mt-1">{application.reason}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Submitted:</span> {application.submittedDate}
            </div>
            {application.reviewedDate && (
              <div>
                <span className="font-medium">Reviewed:</span> {application.reviewedDate}
              </div>
            )}
          </div>

          {application.reviewedBy && (
            <div className="text-sm">
              <span className="font-medium">Reviewed by:</span> {application.reviewedBy}
            </div>
          )}

          {application.rejectionReason && (
            <div className="bg-destructive/10 p-3 rounded border border-destructive/20">
              <span className="font-medium text-sm text-destructive">Rejection Reason:</span>
              <p className="text-sm text-destructive mt-1">{application.rejectionReason}</p>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-xs text-muted-foreground">
              Application ID: #{application.id.toString().padStart(4, '0')}
            </span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setSelectedApplication(application)}
              >
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
              {application.status === 'pending' && (
                <>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedApplications = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  if (selectedApplication) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedApplication(null)}>
            ← Back to All Leaves
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Application Details</h1>
            <p className="text-muted-foreground mt-1">
              Complete information about your leave application
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{selectedApplication.leaveType} Leave Application</CardTitle>
                <CardDescription>Application ID: #{selectedApplication.id.toString().padStart(4, '0')}</CardDescription>
              </div>
              {getStatusBadge(selectedApplication.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Leave Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Type:</span> {selectedApplication.leaveType}</div>
                    <div><span className="font-medium">Duration:</span> {selectedApplication.duration} days</div>
                    <div><span className="font-medium">From:</span> {selectedApplication.fromDate}</div>
                    <div><span className="font-medium">To:</span> {selectedApplication.toDate}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Emergency Contact</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Contact:</span> {selectedApplication.emergencyContact}</div>
                    <div><span className="font-medium">Phone:</span> {selectedApplication.emergencyPhone}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Application Timeline</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Submitted:</span> {selectedApplication.submittedDate}</div>
                    {selectedApplication.reviewedDate && (
                      <div><span className="font-medium">Reviewed:</span> {selectedApplication.reviewedDate}</div>
                    )}
                    {selectedApplication.reviewedBy && (
                      <div><span className="font-medium">Reviewed by:</span> {selectedApplication.reviewedBy}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Reason for Leave</h3>
              <p className="text-muted-foreground p-3 bg-muted rounded">{selectedApplication.reason}</p>
            </div>

            {selectedApplication.rejectionReason && (
              <div>
                <h3 className="font-semibold mb-2 text-destructive">Rejection Reason</h3>
                <p className="text-destructive p-3 bg-destructive/10 rounded border border-destructive/20">
                  {selectedApplication.rejectionReason}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">All Leave Applications</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all your leave applications
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