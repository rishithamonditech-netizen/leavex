import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar, ArrowLeft } from "lucide-react";

interface StudentSigninProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const StudentSignin = ({ onBack, onSuccess }: StudentSigninProps) => {
  const [formData, setFormData] = useState({
    regNo: "",
    password: "",
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.regNo || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate authentication
    toast({
      title: "Student Login Successful",
      description: "Welcome to your student dashboard.",
    });
    
    // Call onSuccess to show dashboard
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Calendar className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">LeaveX</h1>
          </div>
          <CardTitle className="text-xl">Student Sign In</CardTitle>
          <CardDescription>
            Enter your student credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="regNo">Roll Number</Label>
              <Input
                id="regNo"
                value={formData.regNo}
                onChange={(e) => handleInputChange('regNo', e.target.value)}
                placeholder="STU2024001"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="space-y-3 pt-4">
              <Button type="submit" className="w-full">
                Sign In as Student
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};