import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Send } from "lucide-react";
import { format } from "date-fns";

export const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    reason: "",
    fromDate: undefined as Date | undefined,
    toDate: undefined as Date | undefined,
    emergencyContact: "",
    emergencyPhone: "",
    address: "",
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateLeaveDays = () => {
    if (formData.fromDate && formData.toDate) {
      const diffTime = Math.abs(formData.toDate.getTime() - formData.fromDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['leaveType', 'reason', 'fromDate', 'toDate'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.fromDate && formData.toDate && formData.fromDate > formData.toDate) {
      toast({
        title: "Invalid Dates",
        description: "From date cannot be later than to date.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    console.log("Submitting leave application:", formData);
    
    toast({
      title: "Leave Application Submitted",
      description: `Your ${formData.leaveType.toLowerCase()} leave application for ${calculateLeaveDays()} days has been submitted successfully.`,
    });

    // Reset form
    setFormData({
      leaveType: "",
      reason: "",
      fromDate: undefined,
      toDate: undefined,
      emergencyContact: "",
      emergencyPhone: "",
      address: "",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Apply for Leave</h1>
        <p className="text-muted-foreground mt-1">
          Submit a new leave application for approval
        </p>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Leave Application Form
          </CardTitle>
          <CardDescription>
            Fill in the details below. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Leave Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Leave Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leaveType">Leave Type *</Label>
                  <Select value={formData.leaveType} onValueChange={(value) => handleInputChange('leaveType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="family">Family Function</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                    {calculateLeaveDays() > 0 ? `${calculateLeaveDays()} days` : "Select dates to see duration"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.fromDate ? format(formData.fromDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.fromDate}
                        onSelect={(date) => handleInputChange('fromDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>To Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.toDate ? format(formData.toDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.toDate}
                        onSelect={(date) => handleInputChange('toDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Leave *</Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  placeholder="Please provide a detailed reason for your leave application"
                  rows={4}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Emergency Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    placeholder="Contact person during leave"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address During Leave</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Where you will be staying during the leave period"
                  rows={3}
                />
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Important Notes:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Submit your application at least 3 days before the leave date</li>
                <li>• Medical leaves require proper documentation</li>
                <li>• Emergency leaves will be processed immediately</li>
                <li>• You will receive notification once your application is reviewed</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
              <Button type="button" variant="outline" className="flex-1">
                Save as Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};