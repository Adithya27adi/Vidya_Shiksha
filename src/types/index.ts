// Types matching the ER diagram exactly

export interface User {
  id: string;
  email: string;
  password_hash?: string;
  role: "student" | "admin";
  created_at: string;
  updated_at: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  age: number;
  grade: number; // 5-12
  location: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  subject: string;
  class_level: number; // 5-12
  thumbnail_url?: string;
  learning_outcomes: string[];
  created_at: string;
  updated_at: string;
}

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  avatar_url?: string;
  qualifications: string[];
}

export interface Batch {
  id: string;
  course_id: string;
  instructor_id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  start_date: string;
  end_date: string;
  schedule?: string; // e.g., "Mon, Wed, Fri - 4:00 PM"
  is_live: boolean; // true = live batch, false = self-paced
  max_students?: number;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  batch_id: string;
  enrolled_at: string;
  status: "active" | "completed" | "cancelled";
  progress_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface Class {
  id: string;
  batch_id: string;
  title: string;
  description: string;
  order_no: number;
  duration_minutes: number;
  is_live: boolean; // true = live class, false = recorded
  scheduled_at?: string; // for live classes
  created_at: string;
  updated_at: string;
}

export interface ClassContent {
  id: string;
  class_id: string;
  type: "video" | "audio";
  title: string;
  url: string;
  duration_seconds: number;
  order_no: number;
  created_at: string;
}

export interface SupplementaryContent {
  id: string;
  class_id: string;
  type: "pdf" | "link" | "reference";
  title: string;
  url: string;
  description?: string;
  order_no: number;
  created_at: string;
}

export interface LiveClass {
  id: string;
  class_id: string;
  meeting_url: string;
  meeting_id: string;
  meeting_password?: string;
  platform: "zoom" | "google_meet" | "teams";
  starts_at: string;
  ends_at: string;
  created_at: string;
}

export interface RealTimeSession {
  id: string;
  class_id: string;
  websocket_url: string;
  status: "scheduled" | "live" | "ended";
  participants_count: number;
  created_at: string;
}

export type ActivityType = "reading_comprehension" | "assessment";

export interface Activity {
  id: string;
  class_id: string;
  type: ActivityType;
  title: string;
  description: string;
  order_no: number;
  created_at: string;
}

export interface ReadingComprehension {
  id: string;
  activity_id: string;
  content: string; // Rich text / markdown content
  word_count: number;
  estimated_reading_time: number; // minutes
  created_at: string;
}

export interface Assessment {
  id: string;
  activity_id: string;
  title: string;
  instructions: string;
  time_limit_minutes?: number;
  passing_score: number;
  created_at: string;
}

export interface Question {
  id: string;
  assessment_id: string;
  type: "multiple_choice" | "true_false" | "short_answer";
  question_text: string;
  options?: string[]; // for multiple choice
  correct_answer: string;
  points: number;
  order_no: number;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  batch_id: string;
  amount: number;
  currency: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  method: "card" | "upi" | "netbanking" | "wallet";
  status: "pending" | "completed" | "failed" | "refunded";
  transaction_id?: string;
  paid_at?: string;
  created_at: string;
}

// Extended types for UI
export interface CourseWithBatches extends Course {
  batches: BatchWithInstructor[];
}

export interface BatchWithInstructor extends Batch {
  instructor: Instructor;
  course?: Course;
}

export interface ClassWithContent extends Class {
  content: ClassContent[];
  supplementary: SupplementaryContent[];
  activities: Activity[];
  liveClass?: LiveClass;
  realTimeSession?: RealTimeSession;
}

export interface EnrollmentWithDetails extends Enrollment {
  batch: BatchWithInstructor;
  course: Course;
  student?: StudentProfile;
}

export interface OrderWithDetails extends Order {
  batch: BatchWithInstructor;
  course: Course;
  payment?: Payment;
  student?: StudentProfile;
}
