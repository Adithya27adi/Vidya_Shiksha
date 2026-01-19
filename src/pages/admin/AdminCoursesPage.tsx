import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  getAllCourses,
  batches,
  instructors,
  addCourse,
  updateCourse,
  deleteCourse,
  addBatch,
  updateBatch,
  deleteBatch,
  getBatchEnrollmentCount,
} from "@/data/mockData";
import { Course, Batch } from "@/types";
import {
  BookOpen,
  Users,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Plus,
  List,
  UserPlus,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function AdminCoursesPage() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState(getAllCourses());
  const [allBatches, setAllBatches] = useState(batches);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [selectedCourseForBatch, setSelectedCourseForBatch] = useState<string>("");

  // Course form state
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    subject: "",
    class_level: 8,
    thumbnail_url: "",
    learning_outcomes: [""],
  });

  // Batch form state
  const [batchForm, setBatchForm] = useState({
    title: "",
    description: "",
    price: 0,
    instructor_id: "",
    start_date: "",
    end_date: "",
    schedule: "",
    is_live: true,
    max_students: 50,
  });

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const refreshData = () => {
    setCourses([...getAllCourses()]);
    setAllBatches([...batches]);
  };

  const handleAddCourse = () => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      ...courseForm,
      learning_outcomes: courseForm.learning_outcomes.filter((o) => o.trim() !== ""),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    addCourse(newCourse);
    refreshData();
    setIsAddCourseOpen(false);
    setCourseForm({
      title: "",
      description: "",
      subject: "",
      class_level: 8,
      thumbnail_url: "",
      learning_outcomes: [""],
    });
    toast({ title: "Course added successfully!" });
  };

  const handleUpdateCourse = () => {
    if (!editingCourse) return;
    updateCourse(editingCourse.id, courseForm);
    refreshData();
    setEditingCourse(null);
    toast({ title: "Course updated successfully!" });
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course and all its batches?")) {
      deleteCourse(courseId);
      refreshData();
      toast({ title: "Course deleted successfully!" });
    }
  };

  const handleAddBatch = () => {
    if (!selectedCourseForBatch) return;
    const newBatch: Batch = {
      id: `batch-${Date.now()}`,
      course_id: selectedCourseForBatch,
      ...batchForm,
      currency: "INR",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    addBatch(newBatch);
    refreshData();
    setIsAddBatchOpen(false);
    setBatchForm({
      title: "",
      description: "",
      price: 0,
      instructor_id: "",
      start_date: "",
      end_date: "",
      schedule: "",
      is_live: true,
      max_students: 50,
    });
    toast({ title: "Batch added successfully!" });
  };

  const handleDeleteBatch = (batchId: string) => {
    if (confirm("Are you sure you want to delete this batch?")) {
      deleteBatch(batchId);
      refreshData();
      toast({ title: "Batch deleted successfully!" });
    }
  };

  const openEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      subject: course.subject,
      class_level: course.class_level,
      thumbnail_url: course.thumbnail_url || "",
      learning_outcomes: course.learning_outcomes.length > 0 ? course.learning_outcomes : [""],
    });
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground"
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Courses Management</h2>
            <p className="text-muted-foreground">Add, edit, or delete courses and batches</p>
          </div>
          <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    placeholder="Course title"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    placeholder="Course description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Subject</Label>
                    <Input
                      value={courseForm.subject}
                      onChange={(e) => setCourseForm({ ...courseForm, subject: e.target.value })}
                      placeholder="e.g., Mathematics"
                    />
                  </div>
                  <div>
                    <Label>Class Level</Label>
                    <Select
                      value={courseForm.class_level.toString()}
                      onValueChange={(v) => setCourseForm({ ...courseForm, class_level: parseInt(v) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[5, 6, 7, 8, 9, 10, 11, 12].map((level) => (
                          <SelectItem key={level} value={level.toString()}>
                            Class {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Thumbnail URL</Label>
                  <Input
                    value={courseForm.thumbnail_url}
                    onChange={(e) => setCourseForm({ ...courseForm, thumbnail_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label>Learning Outcomes</Label>
                  {courseForm.learning_outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex gap-2 mt-2">
                      <Input
                        value={outcome}
                        onChange={(e) => {
                          const newOutcomes = [...courseForm.learning_outcomes];
                          newOutcomes[idx] = e.target.value;
                          setCourseForm({ ...courseForm, learning_outcomes: newOutcomes });
                        }}
                        placeholder={`Outcome ${idx + 1}`}
                      />
                      {idx > 0 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newOutcomes = courseForm.learning_outcomes.filter((_, i) => i !== idx);
                            setCourseForm({ ...courseForm, learning_outcomes: newOutcomes });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      setCourseForm({
                        ...courseForm,
                        learning_outcomes: [...courseForm.learning_outcomes, ""],
                      })
                    }
                  >
                    Add Outcome
                  </Button>
                </div>
                <Button onClick={handleAddCourse} className="w-full">
                  Add Course
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Courses List */}
        <div className="space-y-6">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div>
                      <CardTitle>{course.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {course.subject} • Class {course.class_level}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={editingCourse?.id === course.id} onOpenChange={(open) => !open && setEditingCourse(null)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => openEditCourse(course)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Course</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={courseForm.title}
                              onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={courseForm.description}
                              onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Subject</Label>
                              <Input
                                value={courseForm.subject}
                                onChange={(e) => setCourseForm({ ...courseForm, subject: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>Class Level</Label>
                              <Select
                                value={courseForm.class_level.toString()}
                                onValueChange={(v) => setCourseForm({ ...courseForm, class_level: parseInt(v) })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {[5, 6, 7, 8, 9, 10, 11, 12].map((level) => (
                                    <SelectItem key={level} value={level.toString()}>
                                      Class {level}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label>Thumbnail URL</Label>
                            <Input
                              value={courseForm.thumbnail_url}
                              onChange={(e) => setCourseForm({ ...courseForm, thumbnail_url: e.target.value })}
                            />
                          </div>
                          <Button onClick={handleUpdateCourse} className="w-full">
                            Update Course
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-foreground">Batches</h4>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCourseForBatch(course.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Batch
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Batch to {course.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>Batch Title</Label>
                          <Input
                            value={batchForm.title}
                            onChange={(e) => setBatchForm({ ...batchForm, title: e.target.value })}
                            placeholder="e.g., January Live Batch"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={batchForm.description}
                            onChange={(e) => setBatchForm({ ...batchForm, description: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Price (INR)</Label>
                            <Input
                              type="number"
                              value={batchForm.price}
                              onChange={(e) => setBatchForm({ ...batchForm, price: parseInt(e.target.value) })}
                            />
                          </div>
                          <div>
                            <Label>Instructor</Label>
                            <Select
                              value={batchForm.instructor_id}
                              onValueChange={(v) => setBatchForm({ ...batchForm, instructor_id: v })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select instructor" />
                              </SelectTrigger>
                              <SelectContent>
                                {instructors.map((inst) => (
                                  <SelectItem key={inst.id} value={inst.id}>
                                    {inst.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              type="date"
                              value={batchForm.start_date}
                              onChange={(e) => setBatchForm({ ...batchForm, start_date: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              type="date"
                              value={batchForm.end_date}
                              onChange={(e) => setBatchForm({ ...batchForm, end_date: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Schedule</Label>
                          <Input
                            value={batchForm.schedule}
                            onChange={(e) => setBatchForm({ ...batchForm, schedule: e.target.value })}
                            placeholder="e.g., Mon, Wed, Fri - 4:00 PM"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Type</Label>
                            <Select
                              value={batchForm.is_live ? "live" : "recorded"}
                              onValueChange={(v) => setBatchForm({ ...batchForm, is_live: v === "live" })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="live">Live</SelectItem>
                                <SelectItem value="recorded">Self-Paced</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Max Students</Label>
                            <Input
                              type="number"
                              value={batchForm.max_students}
                              onChange={(e) => setBatchForm({ ...batchForm, max_students: parseInt(e.target.value) })}
                            />
                          </div>
                        </div>
                        <Button onClick={handleAddBatch} className="w-full">
                          Add Batch
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-3">
                  {allBatches
                    .filter((b) => b.course_id === course.id)
                    .map((batch) => {
                      const instructor = instructors.find((i) => i.id === batch.instructor_id);
                      const enrollmentCount = getBatchEnrollmentCount(batch.id);
                      return (
                        <div
                          key={batch.id}
                          className="flex justify-between items-center p-4 bg-muted rounded-lg"
                        >
                          <div>
                            <h5 className="font-medium text-foreground">{batch.title}</h5>
                            <p className="text-sm text-muted-foreground">
                              {instructor?.name} • ₹{batch.price.toLocaleString()} •{" "}
                              {batch.is_live ? "Live" : "Self-Paced"} •{" "}
                              <span className="text-primary">{enrollmentCount} enrolled</span>
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteBatch(batch.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      );
                    })}
                  {allBatches.filter((b) => b.course_id === course.id).length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No batches yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
