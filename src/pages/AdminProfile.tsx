import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Calendar, Edit } from "lucide-react";

interface AdminProfileProps {
  onBack: () => void;
}

export const AdminProfile = ({ onBack }: AdminProfileProps) => {
  const adminData = {
    name: "Dr. John Smith",
    email: "john.smith@university.edu",
    phone: "+91 9876543210",
    department: "Student Affairs",
    position: "Hostel Administrator",
    joinDate: "January 2020",
    id: "ADM2020001",
    address: "Administrative Block, University Campus"
  };

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ← Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your profile information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarFallback className="text-2xl">JS</AvatarFallback>
            </Avatar>
            <CardTitle>{adminData.name}</CardTitle>
            <CardDescription>{adminData.position}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{adminData.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{adminData.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Since {adminData.joinDate}</span>
            </div>
            <Button className="w-full mt-4">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>
              Your complete profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={adminData.name} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id">Admin ID</Label>
                <Input id="id" value={adminData.id} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={adminData.email} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={adminData.phone} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" value={adminData.department} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input id="position" value={adminData.position} readOnly />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={adminData.address} readOnly />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};