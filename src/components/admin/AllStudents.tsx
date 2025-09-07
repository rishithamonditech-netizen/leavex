import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash2, Mail, Phone } from "lucide-react";
import { useState } from "react";

// Mock data for demonstration
const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    rollNumber: "2024001",
    email: "john.doe@university.edu",
    phone: "+91 9876543210",
    room: "A-101",
    course: "Computer Science",
    year: "3rd Year",
    status: "active",
    admissionDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    rollNumber: "2024002",
    email: "jane.smith@university.edu",
    phone: "+91 9876543211",
    room: "B-203",
    course: "Mechanical Engineering",
    year: "2nd Year",
    status: "active",
    admissionDate: "2024-01-16",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rollNumber: "2024003",
    email: "mike.johnson@university.edu",
    phone: "+91 9876543212",
    room: "C-305",
    course: "Electrical Engineering",
    year: "4th Year",
    status: "active",
    admissionDate: "2024-01-17",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    rollNumber: "2024004",
    email: "sarah.wilson@university.edu",
    phone: "+91 9876543213",
    room: "D-407",
    course: "Chemical Engineering",
    year: "1st Year",
    status: "active",
    admissionDate: "2024-01-18",
  },
  {
    id: 5,
    name: "Alex Brown",
    rollNumber: "2024005",
    email: "alex.brown@university.edu",
    phone: "+91 9876543214",
    room: "A-205",
    course: "Civil Engineering",
    year: "3rd Year",
    status: "inactive",
    admissionDate: "2024-01-19",
  },
];

export const AllStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students] = useState(mockStudents);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge variant="outline" className="text-success border-success">Active</Badge>
      : <Badge variant="outline" className="text-muted-foreground border-muted-foreground">Inactive</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Students</h1>
          <p className="text-muted-foreground mt-1">
            Manage registered hostel students
          </p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  <CardDescription>{student.rollNumber}</CardDescription>
                </div>
                {getStatusBadge(student.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Room:</span> {student.room}
                  </div>
                  <div>
                    <span className="font-medium">Year:</span> {student.year}
                  </div>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Course:</span>
                  <p className="text-muted-foreground">{student.course}</p>
                </div>

                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">{student.phone}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="text-xs text-muted-foreground">
                    Admitted: {student.admissionDate}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            {searchTerm ? "No students found matching your search." : "No students registered yet."}
          </p>
        </Card>
      )}
    </div>
  );
};