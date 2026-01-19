import React, { createContext, useContext, useState, ReactNode } from "react";
import { StudentProfile } from "@/types";
import { mockStudentProfile, mockStudents } from "@/data/mockData";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: StudentProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, profile: Partial<StudentProfile>) => Promise<boolean>;
  logout: () => void;
  pendingEnrollment: { courseId: string; batchId: string } | null;
  setPendingEnrollment: (enrollment: { courseId: string; batchId: string } | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<StudentProfile | null>(null);
  const [pendingEnrollment, setPendingEnrollment] = useState<{ courseId: string; batchId: string } | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check for admin login
    if (email === "admin@vidyashiksha.com" && password) {
      setIsAuthenticated(true);
      setIsAdmin(true);
      setUser({
        id: "admin-1",
        user_id: "admin-user-1",
        first_name: "Admin",
        last_name: "User",
        age: 30,
        grade: 0,
        location: "India",
        avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      return true;
    }
    
    // Regular student login
    if (email && password) {
      setIsAuthenticated(true);
      setIsAdmin(false);
      setUser(mockStudentProfile);
      return true;
    }
    return false;
  };

  const signup = async (
    email: string,
    password: string,
    profile: Partial<StudentProfile>
  ): Promise<boolean> => {
    // Mock signup - in real app, this would call API
    if (email && password) {
      setIsAuthenticated(true);
      setIsAdmin(false);
      setUser({
        ...mockStudentProfile,
        ...profile,
        first_name: profile.first_name || "New",
        last_name: profile.last_name || "Student",
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
    setPendingEnrollment(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        user,
        login,
        signup,
        logout,
        pendingEnrollment,
        setPendingEnrollment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
