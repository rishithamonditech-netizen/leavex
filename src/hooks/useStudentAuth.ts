import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StudentAuthData {
  id: string;
  full_name: string;
  roll_no: string;
  email: string;
  course: string;
  year: string;
  room_no: string;
  phone: string;
}

export const useStudentAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [student, setStudent] = useState<StudentAuthData | null>(null);

  const signIn = async (rollNo: string, dob: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Query the students table to find matching roll_no and dob
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('roll_no', rollNo)
        .eq('dob', dob)
        .single();

      if (error || !data) {
        return { 
          success: false, 
          error: 'Invalid roll number or date of birth. Please check your credentials.' 
        };
      }

      // Set the authenticated student data
      setStudent(data);
      
      // Store in localStorage for persistence
      localStorage.setItem('student_auth', JSON.stringify(data));
      
      return { success: true };
    } catch (error) {
      console.error('Student authentication error:', error);
      return { 
        success: false, 
        error: 'An error occurred during login. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setStudent(null);
    localStorage.removeItem('student_auth');
  };

  const checkAuthStatus = () => {
    const storedAuth = localStorage.getItem('student_auth');
    if (storedAuth) {
      try {
        const studentData = JSON.parse(storedAuth);
        setStudent(studentData);
        return true;
      } catch (error) {
        console.error('Error parsing stored auth:', error);
        localStorage.removeItem('student_auth');
      }
    }
    return false;
  };

  return {
    student,
    isLoading,
    signIn,
    signOut,
    checkAuthStatus,
  };
};