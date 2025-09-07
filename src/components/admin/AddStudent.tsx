import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

export const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    password: "",
    phone: "",
    room: "",
    course: "",
    year: "",
    guardianName: "",
    guardianPhone: "",
    address: "",
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['name', 'rollNumber', 'email', 'password', 'phone', 'room', 'course', 'year'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    console.log("Adding student:", formData);
    
    toast({
      title: "Student Added Successfully",
      description: `${formData.name} has been registered to the hostel management system.`,
    });

    // Reset form
    setFormData({
      name: "",
      rollNumber: "",
      email: "",
      password: "",
      phone: "",
      room: "",
      course: "",
      year: "",
      guardianName: "",
      guardianPhone: "",
      address: "",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Student</h1>
        <p className="text-muted-foreground mt-1">
          Register a new student to the hostel management system
        </p>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Student Registration Form
          </CardTitle>
          <CardDescription>
            Fill in the student details below. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter student's full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rollNumber">Roll Number *</Label>
                  <Input
                    id="rollNumber"
                    value={formData.rollNumber}
                    onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                    placeholder="Enter roll number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="student@university.edu"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Login Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Set student login password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Academic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course *</Label>
                  <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science-engineering">Computer Science and Engineering</SelectItem>
                      <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="cyber-security">Cyber Security</SelectItem>
                      <SelectItem value="mechanical-engineering">Mechanical Engineering</SelectItem>
                      <SelectItem value="electrical-engineering">Electrical Engineering</SelectItem>
                      <SelectItem value="electronics-communication-engineering">Electronics and Communication Engineering</SelectItem>
                      <SelectItem value="electronics-computer-engineering">Electronics and Computer Engineering</SelectItem>
                      <SelectItem value="artificial-intelligence-data-science">Artificial Intelligence and Data Science</SelectItem>
                      <SelectItem value="information-technology">Information Technology</SelectItem>
                      <SelectItem value="master-business-application">Master of Business Application</SelectItem>
                      <SelectItem value="master-computer-application">Master of Computer Application</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Academic Year *</Label>
                  <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st-year">1st Year</SelectItem>
                      <SelectItem value="2nd-year">2nd Year</SelectItem>
                      <SelectItem value="3rd-year">3rd Year</SelectItem>
                      <SelectItem value="4th-year">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">Room Number *</Label>
                  <Input
                    id="room"
                    value={formData.room}
                    onChange={(e) => handleInputChange('room', e.target.value)}
                    placeholder="e.g., A-101"
                  />
                </div>
              </div>
            </div>

            {/* Parent/Guardian Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Parent/Guardian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guardianName">Parent Name</Label>
                  <Input
                    id="guardianName"
                    value={formData.guardianName}
                    onChange={(e) => handleInputChange('guardianName', e.target.value)}
                    placeholder="Enter parent's name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardianPhone">Parent Phone</Label>
                  <Input
                    id="guardianPhone"
                    value={formData.guardianPhone}
                    onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Home Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter complete home address"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" className="flex-1">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};