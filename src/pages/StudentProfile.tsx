import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Calendar, Edit, GraduationCap } from "lucide-react";

interface StudentProfileProps {
  student: {
    id: string;
    full_name: string;
    roll_no: string;
    email: string;
    course: string;
    year: string;
    room_no: string;
    phone: string;
  } | null;
  onBack: () => void;
}

export const StudentProfile = ({ student, onBack }: StudentProfileProps) => {
  if (!student) {
    return <div>Loading...</div>;
  }

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
              <AvatarFallback className="text-2xl">
                {student.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{student.full_name}</CardTitle>
            <CardDescription>{student.roll_no}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{student.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{student.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="w-4 h-4 text-muted-foreground" />
              <span>{student.year}</span>
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
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={student.full_name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber">Roll Number</Label>
                    <Input id="rollNumber" value={student.roll_no} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" value={student.email} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value={student.phone} readOnly />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Input id="course" value={student.course} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Academic Year</Label>
                    <Input id="year" value={student.year} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room">Room Number</Label>
                    <Input id="room" value={student.room_no} readOnly />
                  </div>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};