import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useStudentAuth } from "@/hooks/useStudentAuth";
import { Calendar, ArrowLeft } from "lucide-react";

interface StudentSigninProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const StudentSignin = ({ onBack, onSuccess }: StudentSigninProps) => {
  const [formData, setFormData] = useState({
    regNo: "",
    dob: "",
  });

  const { toast } = useToast();
  const { signIn, isLoading, checkAuthStatus } = useStudentAuth();

  useEffect(() => {
    // Check if student is already authenticated
    if (checkAuthStatus()) {
      onSuccess();
    }
  }, [onSuccess, checkAuthStatus]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.regNo || !formData.dob) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const result = await signIn(formData.regNo, formData.dob);
    
    if (result.success) {
      toast({
        title: "Student Login Successful",
        description: "Welcome to your student dashboard.",
      });
      onSuccess();
    } else {
      toast({
        title: "Login Failed",
        description: result.error || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
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
                placeholder="Enter your roll number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange('dob', e.target.value)}
                required
              />
            </div>
            <div className="space-y-3 pt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In as Student"}
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