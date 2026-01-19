import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  getAllStudents,
  getAllCourses,
  batches,
  instructors,
  enrollStudent,
  mockEnrollments,
} from "@/data/mockData";
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  UserPlus,
  Search,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function AdminEnrollStudentPage() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [enrollmentComplete, setEnrollmentComplete] = useState(false);

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const students = getAllStudents();
  const courses = getAllCourses();
  const courseBatches = batches.filter((b) => b.course_id === selectedCourse);

  const filteredStudents = students.filter(
    (student) =>
      student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedStudentData = students.find((s) => s.user_id === selectedStudent);
  const selectedCourseData = courses.find((c) => c.id === selectedCourse);
  const selectedBatchData = batches.find((b) => b.id === selectedBatch);
  const selectedInstructor = selectedBatchData
    ? instructors.find((i) => i.id === selectedBatchData.instructor_id)
    : null;

  const isAlreadyEnrolled = selectedStudent && selectedBatch
    ? mockEnrollments.some(
        (e) => e.user_id === selectedStudent && e.batch_id === selectedBatch
      )
    : false;

  const handleEnroll = () => {
    if (!selectedStudent || !selectedBatch) {
      toast({ title: "Please select a student and batch", variant: "destructive" });
      return;
    }

    if (isAlreadyEnrolled) {
      toast({ title: "Student is already enrolled in this batch", variant: "destructive" });
      return;
    }

    enrollStudent(selectedStudent, selectedBatch);
    setEnrollmentComplete(true);
    toast({ title: "Student enrolled successfully!" });
  };

  const resetForm = () => {
    setSelectedStudent("");
    setSelectedCourse("");
    setSelectedBatch("");
    setSearchTerm("");
    setEnrollmentComplete(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-primary">VidyaShiksha</h1>
          <p className="text-sm text-muted-foreground">Admin Panel</p>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/admin/courses"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <BookOpen className="h-5 w-5" />
            Courses
          </Link>
          <Link
            to="/admin/enrollments"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <GraduationCap className="h-5 w-5" />
            Enrollments
          </Link>
          <Link
            to="/admin/enroll-student"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground"
          >
            <UserPlus className="h-5 w-5" />
            Enroll Student
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground">Enroll Student</h2>
          <p className="text-muted-foreground">
            Enroll a student in a course batch on their behalf (for parents/guardians)
          </p>
        </div>

        {enrollmentComplete ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Enrollment Successful!</h3>
              <p className="text-muted-foreground mb-6">
                {selectedStudentData?.first_name} {selectedStudentData?.last_name} has been enrolled
                in {selectedCourseData?.title} - {selectedBatchData?.title}
              </p>
              <div className="bg-muted p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Amount Paid</p>
                    <p className="font-medium text-foreground">
                      ₹{selectedBatchData?.price.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment Method</p>
                    <p className="font-medium text-foreground">Admin Enrollment</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-medium text-foreground">{selectedBatchData?.start_date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Instructor</p>
                    <p className="font-medium text-foreground">{selectedInstructor?.name}</p>
                  </div>
                </div>
              </div>
              <Button onClick={resetForm}>Enroll Another Student</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Select Student</CardTitle>
                <CardDescription>Choose a student to enroll</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.user_id}
                      onClick={() => setSelectedStudent(student.user_id)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedStudent === student.user_id
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      <img
                        src={student.avatar_url}
                        alt={student.first_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {student.first_name} {student.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Grade {student.grade} • {student.location}
                        </p>
                      </div>
                      {selectedStudent === student.user_id && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course & Batch Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Select Course & Batch</CardTitle>
                <CardDescription>Choose a course and batch for enrollment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Course</Label>
                  <Select
                    value={selectedCourse}
                    onValueChange={(v) => {
                      setSelectedCourse(v);
                      setSelectedBatch("");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title} (Class {course.class_level})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCourse && (
                  <div>
                    <Label>Batch</Label>
                    <div className="space-y-2 mt-2">
                      {courseBatches.map((batch) => {
                        const instructor = instructors.find((i) => i.id === batch.instructor_id);
                        return (
                          <div
                            key={batch.id}
                            onClick={() => setSelectedBatch(batch.id)}
                            className={`p-4 rounded-lg cursor-pointer transition-colors ${
                              selectedBatch === batch.id
                                ? "bg-primary/10 border-2 border-primary"
                                : "bg-muted hover:bg-muted/80"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-foreground">{batch.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {instructor?.name} • {batch.is_live ? "Live" : "Self-Paced"}
                                </p>
                                <p className="text-sm text-muted-foreground">{batch.schedule}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-foreground">
                                  ₹{batch.price.toLocaleString()}
                                </p>
                                {selectedBatch === batch.id && (
                                  <CheckCircle className="h-5 w-5 text-primary mt-1 ml-auto" />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {courseBatches.length === 0 && (
                        <p className="text-center text-muted-foreground py-4">
                          No batches available for this course
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Enrollment Summary */}
                {selectedStudent && selectedBatch && (
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-3">Enrollment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Student:</span>
                        <span className="text-foreground">
                          {selectedStudentData?.first_name} {selectedStudentData?.last_name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Course:</span>
                        <span className="text-foreground">{selectedCourseData?.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Batch:</span>
                        <span className="text-foreground">{selectedBatchData?.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-bold text-foreground">
                          ₹{selectedBatchData?.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {isAlreadyEnrolled && (
                  <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-sm">
                    This student is already enrolled in this batch.
                  </div>
                )}

                <Button
                  onClick={handleEnroll}
                  disabled={!selectedStudent || !selectedBatch || isAlreadyEnrolled}
                  className="w-full"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Enroll Student & Process Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
