-- Create students table for student authentication and management
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  roll_no TEXT NOT NULL UNIQUE,
  dob DATE NOT NULL, -- Date of birth used as password
  course TEXT NOT NULL,
  year TEXT NOT NULL,
  room_no TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leaves table for leave applications
CREATE TABLE public.leaves (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  leave_type TEXT NOT NULL,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaves ENABLE ROW LEVEL SECURITY;

-- RLS policies for students table
CREATE POLICY "Students can view their own record" 
ON public.students 
FOR SELECT 
USING (true); -- Allow all reads for authentication purposes

CREATE POLICY "Admins can manage students" 
ON public.students 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for leaves table
CREATE POLICY "Students can view their own leaves" 
ON public.leaves 
FOR SELECT 
USING (student_id IN (
  SELECT id FROM public.students WHERE roll_no = (
    SELECT raw_user_meta_data->>'roll_no' FROM auth.users WHERE id = auth.uid()
  )
));

CREATE POLICY "Students can create their own leaves" 
ON public.leaves 
FOR INSERT 
WITH CHECK (student_id IN (
  SELECT id FROM public.students WHERE roll_no = (
    SELECT raw_user_meta_data->>'roll_no' FROM auth.users WHERE id = auth.uid()
  )
));

CREATE POLICY "Admins can manage all leaves" 
ON public.leaves 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create triggers for updated_at
CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON public.students
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leaves_updated_at
BEFORE UPDATE ON public.leaves
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_students_roll_no ON public.students(roll_no);
CREATE INDEX idx_leaves_student_id ON public.leaves(student_id);
CREATE INDEX idx_leaves_status ON public.leaves(status);