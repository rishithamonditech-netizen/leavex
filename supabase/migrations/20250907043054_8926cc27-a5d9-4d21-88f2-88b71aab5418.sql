-- Update students table to match requirements
ALTER TABLE public.students 
ADD COLUMN IF NOT EXISTS roll_no TEXT,
ADD COLUMN IF NOT EXISTS dob DATE,
ADD COLUMN IF NOT EXISTS course TEXT,
ADD COLUMN IF NOT EXISTS year TEXT,
ADD COLUMN IF NOT EXISTS room_no TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Update leaves table to match requirements
ALTER TABLE public.leaves 
ADD COLUMN IF NOT EXISTS admin_comment TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Drop password_hash column and rename student_id to roll_no in students table
ALTER TABLE public.students DROP COLUMN IF EXISTS password_hash;

-- Make roll_no unique if not already
DROP INDEX IF EXISTS idx_students_roll_no;
CREATE UNIQUE INDEX idx_students_roll_no ON public.students(roll_no);

-- Update students table constraints
ALTER TABLE public.students 
ALTER COLUMN roll_no SET NOT NULL,
ALTER COLUMN dob SET NOT NULL,
ALTER COLUMN course SET NOT NULL,
ALTER COLUMN year SET NOT NULL,
ALTER COLUMN room_no SET NOT NULL,
ALTER COLUMN phone SET NOT NULL;

-- Update leaves table constraints
UPDATE public.leaves SET status = 'pending' WHERE status IS NULL;
ALTER TABLE public.leaves DROP CONSTRAINT IF EXISTS leaves_status_check;
ALTER TABLE public.leaves ADD CONSTRAINT leaves_status_check CHECK (status IN ('pending', 'approved', 'rejected'));

-- Create trigger for leaves updated_at
DROP TRIGGER IF EXISTS update_leaves_updated_at ON public.leaves;
CREATE TRIGGER update_leaves_updated_at
BEFORE UPDATE ON public.leaves
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();