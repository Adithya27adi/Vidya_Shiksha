import {
  Course,
  Instructor,
  Batch,
  Class,
  ClassContent,
  SupplementaryContent,
  Activity,
  ReadingComprehension,
  Assessment,
  Question,
  Enrollment,
  Order,
  Payment,
  StudentProfile,
  LiveClass,
  CourseWithBatches,
  BatchWithInstructor,
  ClassWithContent,
  EnrollmentWithDetails,
  OrderWithDetails,
} from "@/types";

// Instructors
export const instructors: Instructor[] = [
  {
    id: "inst-1",
    name: "Dr. Priya Sharma",
    bio: "PhD in Mathematics from IIT Delhi with 15 years of teaching experience. Specializes in making complex concepts simple and accessible.",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    qualifications: ["PhD Mathematics, IIT Delhi", "M.Sc Mathematics", "B.Ed"],
  },
  {
    id: "inst-2",
    name: "Prof. Rajesh Kumar",
    bio: "Former CBSE examiner and author of multiple science textbooks. Known for practical experiments and real-world applications.",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    qualifications: ["M.Sc Physics, JNU", "B.Ed", "CBSE Examiner"],
  },
  {
    id: "inst-3",
    name: "Ms. Anita Desai",
    bio: "English literature expert with experience in ICSE and CBSE curriculum. Focuses on comprehensive language development.",
    avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    qualifications: ["MA English Literature", "Cambridge CELTA", "B.Ed"],
  },
];

// Courses - make it mutable for admin to add/edit
export let courses: Course[] = [
  {
    id: "course-1",
    title: "Mathematics Foundation",
    description: "Build a strong foundation in mathematics with comprehensive coverage of algebra, geometry, and arithmetic. Perfect for students looking to strengthen their problem-solving skills.",
    subject: "Mathematics",
    class_level: 8,
    thumbnail_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop",
    learning_outcomes: [
      "Master algebraic expressions and equations",
      "Understand geometric principles and theorems",
      "Develop problem-solving strategies",
      "Apply mathematical concepts to real-world problems",
    ],
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "course-2",
    title: "Science Fundamentals",
    description: "Explore the fascinating world of science through physics, chemistry, and biology. Hands-on experiments and visual demonstrations make learning engaging.",
    subject: "Science",
    class_level: 7,
    thumbnail_url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=450&fit=crop",
    learning_outcomes: [
      "Understand physical laws and principles",
      "Learn chemical reactions and equations",
      "Explore biological systems and life processes",
      "Conduct safe laboratory experiments",
    ],
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
  },
  {
    id: "course-3",
    title: "English Language & Literature",
    description: "Develop comprehensive English skills including grammar, vocabulary, reading comprehension, and creative writing. Prepare for examinations with confidence.",
    subject: "English",
    class_level: 9,
    thumbnail_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=450&fit=crop",
    learning_outcomes: [
      "Master English grammar and usage",
      "Expand vocabulary effectively",
      "Improve reading comprehension skills",
      "Write clear and engaging essays",
    ],
    created_at: "2024-01-12T00:00:00Z",
    updated_at: "2024-01-12T00:00:00Z",
  },
  {
    id: "course-4",
    title: "Mathematics Advanced",
    description: "Advanced mathematics course covering trigonometry, coordinate geometry, and statistics. Designed for students aiming for competitive examinations.",
    subject: "Mathematics",
    class_level: 10,
    thumbnail_url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=450&fit=crop",
    learning_outcomes: [
      "Master trigonometric identities and applications",
      "Solve coordinate geometry problems",
      "Understand statistics and probability",
      "Prepare for board examinations",
    ],
    created_at: "2024-01-08T00:00:00Z",
    updated_at: "2024-01-08T00:00:00Z",
  },
  {
    id: "course-5",
    title: "Social Studies Comprehensive",
    description: "Complete coverage of history, geography, civics, and economics. Understand the world around you through engaging lessons and discussions.",
    subject: "Social Studies",
    class_level: 6,
    thumbnail_url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=450&fit=crop",
    learning_outcomes: [
      "Learn about ancient and modern history",
      "Understand geographical concepts and maps",
      "Know your rights and civic duties",
      "Grasp basic economic principles",
    ],
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
  },
  {
    id: "course-6",
    title: "Hindi Language",
    description: "Comprehensive Hindi course covering grammar, literature, and composition. Perfect for students who want to excel in Hindi examinations.",
    subject: "Hindi",
    class_level: 5,
    thumbnail_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop",
    learning_outcomes: [
      "Master Hindi grammar and vocabulary",
      "Read and understand Hindi literature",
      "Write essays and letters effectively",
      "Improve spoken Hindi",
    ],
    created_at: "2024-01-03T00:00:00Z",
    updated_at: "2024-01-03T00:00:00Z",
  },
];

// Batches with instructor assignment and pricing - make mutable
export let batches: Batch[] = [
  // Course 1 - Mathematics Foundation
  {
    id: "batch-1a",
    course_id: "course-1",
    instructor_id: "inst-1",
    title: "January Live Batch",
    description: "Live interactive sessions with Dr. Priya Sharma. Daily doubt clearing and weekly tests.",
    price: 4999,
    currency: "INR",
    start_date: "2025-02-01",
    end_date: "2025-05-31",
    schedule: "Mon, Wed, Fri - 4:00 PM",
    is_live: true,
    max_students: 50,
    created_at: "2024-12-01T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "batch-1b",
    course_id: "course-1",
    instructor_id: "inst-1",
    title: "Self-Paced Learning",
    description: "Learn at your own pace with recorded lectures. Access for 6 months.",
    price: 2999,
    currency: "INR",
    start_date: "2025-01-15",
    end_date: "2025-07-15",
    is_live: false,
    created_at: "2024-12-01T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
  // Course 2 - Science Fundamentals
  {
    id: "batch-2a",
    course_id: "course-2",
    instructor_id: "inst-2",
    title: "February Live Batch",
    description: "Interactive science classes with virtual lab demonstrations.",
    price: 5499,
    currency: "INR",
    start_date: "2025-02-15",
    end_date: "2025-06-15",
    schedule: "Tue, Thu - 5:00 PM",
    is_live: true,
    max_students: 40,
    created_at: "2024-12-05T00:00:00Z",
    updated_at: "2024-12-05T00:00:00Z",
  },
  {
    id: "batch-2b",
    course_id: "course-2",
    instructor_id: "inst-2",
    title: "Recorded Course",
    description: "Complete recorded lectures with experiment videos.",
    price: 3499,
    currency: "INR",
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    is_live: false,
    created_at: "2024-12-05T00:00:00Z",
    updated_at: "2024-12-05T00:00:00Z",
  },
  // Course 3 - English
  {
    id: "batch-3a",
    course_id: "course-3",
    instructor_id: "inst-3",
    title: "March Live Batch",
    description: "Live English sessions with interactive discussions and writing practice.",
    price: 4499,
    currency: "INR",
    start_date: "2025-03-01",
    end_date: "2025-07-01",
    schedule: "Mon, Wed, Fri - 3:00 PM",
    is_live: true,
    max_students: 35,
    created_at: "2024-12-10T00:00:00Z",
    updated_at: "2024-12-10T00:00:00Z",
  },
  // Course 4 - Math Advanced
  {
    id: "batch-4a",
    course_id: "course-4",
    instructor_id: "inst-1",
    title: "Board Exam Prep - Live",
    description: "Intensive board exam preparation with daily practice and mock tests.",
    price: 6999,
    currency: "INR",
    start_date: "2025-01-20",
    end_date: "2025-03-15",
    schedule: "Daily - 6:00 PM",
    is_live: true,
    max_students: 60,
    created_at: "2024-12-15T00:00:00Z",
    updated_at: "2024-12-15T00:00:00Z",
  },
  // Course 5 - Social Studies
  {
    id: "batch-5a",
    course_id: "course-5",
    instructor_id: "inst-2",
    title: "Self-Paced Complete Course",
    description: "Learn social studies at your own pace with interactive maps and timelines.",
    price: 2499,
    currency: "INR",
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    is_live: false,
    created_at: "2024-12-01T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
  // Course 6 - Hindi
  {
    id: "batch-6a",
    course_id: "course-6",
    instructor_id: "inst-3",
    title: "Hindi Foundation - Recorded",
    description: "Complete Hindi course with grammar lessons and literature study.",
    price: 1999,
    currency: "INR",
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    is_live: false,
    created_at: "2024-12-01T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
];

// Classes for batch-1a (Mathematics Foundation - Live)
export const classes: Class[] = [
  {
    id: "class-1",
    batch_id: "batch-1a",
    title: "Introduction to Algebra",
    description: "Understanding variables, constants, and basic algebraic expressions.",
    order_no: 1,
    duration_minutes: 45,
    is_live: true,
    scheduled_at: "2025-02-01T16:00:00Z",
    created_at: "2024-12-01T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "class-2",
    batch_id: "batch-1a",
    title: "Linear Equations in One Variable",
    description: "Solving linear equations and understanding the balancing method.",
    order_no: 2,
    duration_minutes: 50,
    is_live: true,
    scheduled_at: "2025-02-03T16:00:00Z",
    created_at: "2024-12-01T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "class-3",
    batch_id: "batch-1a",
    title: "Linear Equations in Two Variables",
    description: "Understanding graphs and solving systems of equations.",
    order_no: 3,
    duration_minutes: 55,
    is_live: true,
    scheduled_at: "2025-02-05T16:00:00Z",
    created_at: "2024-12-01T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "class-4",
    batch_id: "batch-1a",
    title: "Polynomials - Basics",
    description: "Introduction to polynomials, degrees, and standard forms.",
    order_no: 4,
    duration_minutes: 45,
    is_live: false, // Recorded class
    created_at: "2024-12-01T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "class-5",
    batch_id: "batch-1a",
    title: "Factorization Techniques",
    description: "Methods to factorize algebraic expressions.",
    order_no: 5,
    duration_minutes: 50,
    is_live: false,
    created_at: "2024-12-01T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
];

// Class Content (recorded videos)
export const classContents: ClassContent[] = [
  {
    id: "content-4-1",
    class_id: "class-4",
    type: "video",
    title: "Understanding Polynomials",
    url: "https://example.com/videos/polynomials-intro.mp4",
    duration_seconds: 1800,
    order_no: 1,
    created_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "content-4-2",
    class_id: "class-4",
    type: "video",
    title: "Degree of Polynomials",
    url: "https://example.com/videos/polynomials-degree.mp4",
    duration_seconds: 900,
    order_no: 2,
    created_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "content-5-1",
    class_id: "class-5",
    type: "video",
    title: "Factorization Methods",
    url: "https://example.com/videos/factorization.mp4",
    duration_seconds: 2100,
    order_no: 1,
    created_at: "2024-12-01T00:00:00Z",
  },
];

// Supplementary Content
export const supplementaryContents: SupplementaryContent[] = [
  {
    id: "supp-1-1",
    class_id: "class-1",
    type: "pdf",
    title: "Algebra Basics - Practice Problems",
    url: "https://example.com/pdfs/algebra-practice.pdf",
    description: "50 practice problems for self-study",
    order_no: 1,
    created_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "supp-1-2",
    class_id: "class-1",
    type: "link",
    title: "Khan Academy - Algebra Introduction",
    url: "https://www.khanacademy.org/math/algebra",
    description: "Additional learning resource",
    order_no: 2,
    created_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "supp-4-1",
    class_id: "class-4",
    type: "pdf",
    title: "Polynomials - Formula Sheet",
    url: "https://example.com/pdfs/polynomials-formulas.pdf",
    description: "Quick reference for all polynomial formulas",
    order_no: 1,
    created_at: "2024-12-01T00:00:00Z",
  },
];

// Live Class details
export const liveClasses: LiveClass[] = [
  {
    id: "live-1",
    class_id: "class-1",
    meeting_url: "https://zoom.us/j/123456789",
    meeting_id: "123 456 789",
    meeting_password: "math2025",
    platform: "zoom",
    starts_at: "2025-02-01T16:00:00Z",
    ends_at: "2025-02-01T16:45:00Z",
    created_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "live-2",
    class_id: "class-2",
    meeting_url: "https://zoom.us/j/987654321",
    meeting_id: "987 654 321",
    meeting_password: "math2025",
    platform: "zoom",
    starts_at: "2025-02-03T16:00:00Z",
    ends_at: "2025-02-03T16:50:00Z",
    created_at: "2024-12-01T00:00:00Z",
  },
];

// Activities
export const activities: Activity[] = [
  {
    id: "activity-1-1",
    class_id: "class-1",
    type: "reading_comprehension",
    title: "Understanding Variables in Real Life",
    description: "Read about how variables are used in everyday scenarios",
    order_no: 1,
    created_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "activity-1-2",
    class_id: "class-1",
    type: "assessment",
    title: "Algebra Basics Quiz",
    description: "Test your understanding of algebra fundamentals",
    order_no: 2,
    created_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "activity-4-1",
    class_id: "class-4",
    type: "reading_comprehension",
    title: "History of Polynomials",
    description: "Learn about the historical development of polynomials",
    order_no: 1,
    created_at: "2024-12-01T00:00:00Z",
  },
];

// Reading Comprehension content
export const readingComprehensions: ReadingComprehension[] = [
  {
    id: "rc-1",
    activity_id: "activity-1-1",
    content: `# Understanding Variables in Real Life

Variables are not just abstract mathematical concepts—they are all around us in our daily lives. Understanding how variables work can help us make sense of the world and solve real problems.

## What is a Variable?

A variable is a symbol that represents a value that can change. In mathematics, we often use letters like x, y, or z to represent variables. But in real life, variables represent quantities that we measure, count, or calculate.

## Examples from Daily Life

### 1. Temperature Throughout the Day

The temperature outside changes throughout the day. If we use T to represent temperature, we might say:
- T = 20°C in the morning
- T = 28°C at noon  
- T = 22°C in the evening

Here, T is a variable because its value changes.

### 2. Your Age

Your age is also a variable! Each year on your birthday, your age increases by 1. If we call your age A, then next year A will be one more than it is now.

### 3. Money in Your Piggy Bank

The amount of money M in your savings changes when you add or spend money. This is another example of a variable in action.

## Why Variables Matter

Understanding variables helps us:
- Describe patterns and relationships
- Solve problems systematically
- Make predictions about the future
- Communicate mathematical ideas clearly

## Practice Thinking

Think about three more examples of variables in your daily life. What changes? What stays the same? This kind of thinking is the foundation of algebraic reasoning.`,
    word_count: 270,
    estimated_reading_time: 3,
    created_at: "2024-12-01T00:00:00Z",
  },
];

// Assessments
export const assessments: Assessment[] = [
  {
    id: "assess-1",
    activity_id: "activity-1-2",
    title: "Algebra Basics Quiz",
    instructions: "Answer all questions. Each question carries equal marks. You have 15 minutes to complete this quiz.",
    time_limit_minutes: 15,
    passing_score: 60,
    created_at: "2024-12-01T00:00:00Z",
  },
];

// Questions
export const questions: Question[] = [
  {
    id: "q-1",
    assessment_id: "assess-1",
    type: "multiple_choice",
    question_text: "Which of the following is a variable?",
    options: ["5", "x", "10 + 2", "π"],
    correct_answer: "x",
    points: 10,
    order_no: 1,
    created_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "q-2",
    assessment_id: "assess-1",
    type: "multiple_choice",
    question_text: "In the expression 3x + 5, what is the coefficient of x?",
    options: ["3", "5", "x", "3x"],
    correct_answer: "3",
    points: 10,
    order_no: 2,
    created_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "q-3",
    assessment_id: "assess-1",
    type: "true_false",
    question_text: "An algebraic expression must contain at least one variable.",
    correct_answer: "true",
    points: 10,
    order_no: 3,
    created_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "q-4",
    assessment_id: "assess-1",
    type: "multiple_choice",
    question_text: "What is the constant term in 2y - 7?",
    options: ["2", "y", "-7", "2y"],
    correct_answer: "-7",
    points: 10,
    order_no: 4,
    created_at: "2024-12-01T00:00:00Z",
  },
];

// Mock students list for admin
export const mockStudents: StudentProfile[] = [
  {
    id: "student-1",
    user_id: "user-1",
    first_name: "Arjun",
    last_name: "Patel",
    age: 14,
    grade: 8,
    location: "Mumbai, Maharashtra",
    phone: "+91 98765 43210",
    avatar_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    created_at: "2024-06-01T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "student-2",
    user_id: "user-2",
    first_name: "Priya",
    last_name: "Singh",
    age: 13,
    grade: 7,
    location: "Delhi, India",
    phone: "+91 98765 43211",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    created_at: "2024-07-15T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "student-3",
    user_id: "user-3",
    first_name: "Rahul",
    last_name: "Sharma",
    age: 15,
    grade: 9,
    location: "Bangalore, Karnataka",
    phone: "+91 98765 43212",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    created_at: "2024-08-20T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "student-4",
    user_id: "user-4",
    first_name: "Ananya",
    last_name: "Gupta",
    age: 12,
    grade: 6,
    location: "Chennai, Tamil Nadu",
    phone: "+91 98765 43213",
    avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    created_at: "2024-09-10T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "student-5",
    user_id: "user-5",
    first_name: "Vikram",
    last_name: "Reddy",
    age: 16,
    grade: 10,
    location: "Hyderabad, Telangana",
    phone: "+91 98765 43214",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    created_at: "2024-10-05T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
  },
];

// Mock enrolled user data
export const mockStudentProfile: StudentProfile = mockStudents[0];

// Mock enrollments - make mutable
export let mockEnrollments: Enrollment[] = [
  {
    id: "enroll-1",
    user_id: "user-1",
    batch_id: "batch-1a",
    enrolled_at: "2024-12-20T00:00:00Z",
    status: "active",
    progress_percentage: 40,
    created_at: "2024-12-20T00:00:00Z",
    updated_at: "2025-01-10T00:00:00Z",
  },
  {
    id: "enroll-2",
    user_id: "user-1",
    batch_id: "batch-2b",
    enrolled_at: "2024-12-25T00:00:00Z",
    status: "active",
    progress_percentage: 15,
    created_at: "2024-12-25T00:00:00Z",
    updated_at: "2025-01-08T00:00:00Z",
  },
  {
    id: "enroll-3",
    user_id: "user-2",
    batch_id: "batch-1a",
    enrolled_at: "2024-12-22T00:00:00Z",
    status: "active",
    progress_percentage: 25,
    created_at: "2024-12-22T00:00:00Z",
    updated_at: "2025-01-05T00:00:00Z",
  },
  {
    id: "enroll-4",
    user_id: "user-3",
    batch_id: "batch-3a",
    enrolled_at: "2024-12-28T00:00:00Z",
    status: "active",
    progress_percentage: 10,
    created_at: "2024-12-28T00:00:00Z",
    updated_at: "2025-01-12T00:00:00Z",
  },
];

// Mock orders - make mutable
export let mockOrders: Order[] = [
  {
    id: "order-1",
    user_id: "user-1",
    batch_id: "batch-1a",
    amount: 4999,
    currency: "INR",
    status: "confirmed",
    created_at: "2024-12-20T00:00:00Z",
    updated_at: "2024-12-20T00:00:00Z",
  },
  {
    id: "order-2",
    user_id: "user-1",
    batch_id: "batch-2b",
    amount: 3499,
    currency: "INR",
    status: "confirmed",
    created_at: "2024-12-25T00:00:00Z",
    updated_at: "2024-12-25T00:00:00Z",
  },
  {
    id: "order-3",
    user_id: "user-2",
    batch_id: "batch-1a",
    amount: 4999,
    currency: "INR",
    status: "confirmed",
    created_at: "2024-12-22T00:00:00Z",
    updated_at: "2024-12-22T00:00:00Z",
  },
  {
    id: "order-4",
    user_id: "user-3",
    batch_id: "batch-3a",
    amount: 4499,
    currency: "INR",
    status: "confirmed",
    created_at: "2024-12-28T00:00:00Z",
    updated_at: "2024-12-28T00:00:00Z",
  },
];

// Mock payments - make mutable
export let mockPayments: Payment[] = [
  {
    id: "payment-1",
    order_id: "order-1",
    amount: 4999,
    currency: "INR",
    method: "upi",
    status: "completed",
    transaction_id: "TXN123456789",
    paid_at: "2024-12-20T00:05:00Z",
    created_at: "2024-12-20T00:00:00Z",
  },
  {
    id: "payment-2",
    order_id: "order-2",
    amount: 3499,
    currency: "INR",
    method: "card",
    status: "completed",
    transaction_id: "TXN987654321",
    paid_at: "2024-12-25T00:03:00Z",
    created_at: "2024-12-25T00:00:00Z",
  },
  {
    id: "payment-3",
    order_id: "order-3",
    amount: 4999,
    currency: "INR",
    method: "upi",
    status: "completed",
    transaction_id: "TXN456789123",
    paid_at: "2024-12-22T00:02:00Z",
    created_at: "2024-12-22T00:00:00Z",
  },
  {
    id: "payment-4",
    order_id: "order-4",
    amount: 4499,
    currency: "INR",
    method: "netbanking",
    status: "completed",
    transaction_id: "TXN789123456",
    paid_at: "2024-12-28T00:04:00Z",
    created_at: "2024-12-28T00:00:00Z",
  },
];

// Helper functions to get combined data

export function getCourseWithBatches(courseId: string): CourseWithBatches | undefined {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return undefined;

  const courseBatches = batches
    .filter((b) => b.course_id === courseId)
    .map((batch) => ({
      ...batch,
      instructor: instructors.find((i) => i.id === batch.instructor_id)!,
    }));

  return {
    ...course,
    batches: courseBatches,
  };
}

export function getBatchWithDetails(batchId: string): BatchWithInstructor | undefined {
  const batch = batches.find((b) => b.id === batchId);
  if (!batch) return undefined;

  return {
    ...batch,
    instructor: instructors.find((i) => i.id === batch.instructor_id)!,
    course: courses.find((c) => c.id === batch.course_id),
  };
}

export function getClassesForBatch(batchId: string): Class[] {
  return classes.filter((c) => c.batch_id === batchId).sort((a, b) => a.order_no - b.order_no);
}

export function getClassWithContent(classId: string): ClassWithContent | undefined {
  const classItem = classes.find((c) => c.id === classId);
  if (!classItem) return undefined;

  return {
    ...classItem,
    content: classContents.filter((cc) => cc.class_id === classId).sort((a, b) => a.order_no - b.order_no),
    supplementary: supplementaryContents.filter((sc) => sc.class_id === classId).sort((a, b) => a.order_no - b.order_no),
    activities: activities.filter((a) => a.class_id === classId).sort((a, b) => a.order_no - b.order_no),
    liveClass: liveClasses.find((lc) => lc.class_id === classId),
  };
}

export function getEnrollmentsWithDetails(userId: string): EnrollmentWithDetails[] {
  return mockEnrollments
    .filter((e) => e.user_id === userId)
    .map((enrollment) => {
      const batch = getBatchWithDetails(enrollment.batch_id)!;
      const course = courses.find((c) => c.id === batch.course_id)!;
      return {
        ...enrollment,
        batch,
        course,
      };
    });
}

export function getAllEnrollmentsWithDetails(): EnrollmentWithDetails[] {
  return mockEnrollments.map((enrollment) => {
    const batch = getBatchWithDetails(enrollment.batch_id)!;
    const course = courses.find((c) => c.id === batch.course_id)!;
    const student = mockStudents.find((s) => s.user_id === enrollment.user_id);
    return {
      ...enrollment,
      batch,
      course,
      student,
    };
  });
}

export function getOrdersWithDetails(userId: string): OrderWithDetails[] {
  return mockOrders
    .filter((o) => o.user_id === userId)
    .map((order) => {
      const batch = getBatchWithDetails(order.batch_id)!;
      const course = courses.find((c) => c.id === batch.course_id)!;
      const payment = mockPayments.find((p) => p.order_id === order.id);
      return {
        ...order,
        batch,
        course,
        payment,
      };
    });
}

export function getAllOrdersWithDetails(): OrderWithDetails[] {
  return mockOrders.map((order) => {
    const batch = getBatchWithDetails(order.batch_id)!;
    const course = courses.find((c) => c.id === batch.course_id)!;
    const payment = mockPayments.find((p) => p.order_id === order.id);
    const student = mockStudents.find((s) => s.user_id === order.user_id);
    return {
      ...order,
      batch,
      course,
      payment,
      student,
    };
  });
}

export function getReadingComprehension(activityId: string): ReadingComprehension | undefined {
  return readingComprehensions.find((rc) => rc.activity_id === activityId);
}

export function getAssessmentWithQuestions(activityId: string): { assessment: Assessment; questions: Question[] } | undefined {
  const assessment = assessments.find((a) => a.activity_id === activityId);
  if (!assessment) return undefined;

  return {
    assessment,
    questions: questions.filter((q) => q.assessment_id === assessment.id).sort((a, b) => a.order_no - b.order_no),
  };
}

export function getAllCourses(): Course[] {
  return courses;
}

export function getCoursesForClass(classLevel: number): Course[] {
  return courses.filter((c) => c.class_level === classLevel);
}

export function getSubjects(): string[] {
  return [...new Set(courses.map((c) => c.subject))];
}

export function getClassLevels(): number[] {
  return [...new Set(courses.map((c) => c.class_level))].sort((a, b) => a - b);
}

export function getAllStudents(): StudentProfile[] {
  return mockStudents;
}

export function getBatchEnrollmentCount(batchId: string): number {
  return mockEnrollments.filter((e) => e.batch_id === batchId).length;
}

// Admin functions
export function addCourse(course: Course): void {
  courses = [...courses, course];
}

export function updateCourse(courseId: string, updates: Partial<Course>): void {
  courses = courses.map((c) => (c.id === courseId ? { ...c, ...updates, updated_at: new Date().toISOString() } : c));
}

export function deleteCourse(courseId: string): void {
  courses = courses.filter((c) => c.id !== courseId);
  batches = batches.filter((b) => b.course_id !== courseId);
}

export function addBatch(batch: Batch): void {
  batches = [...batches, batch];
}

export function updateBatch(batchId: string, updates: Partial<Batch>): void {
  batches = batches.map((b) => (b.id === batchId ? { ...b, ...updates, updated_at: new Date().toISOString() } : b));
}

export function deleteBatch(batchId: string): void {
  batches = batches.filter((b) => b.id !== batchId);
}

export function enrollStudent(userId: string, batchId: string): void {
  const enrollmentId = `enroll-${Date.now()}`;
  const orderId = `order-${Date.now()}`;
  const paymentId = `payment-${Date.now()}`;
  const batch = batches.find((b) => b.id === batchId);
  
  if (!batch) return;

  // Create order
  const newOrder: Order = {
    id: orderId,
    user_id: userId,
    batch_id: batchId,
    amount: batch.price,
    currency: batch.currency,
    status: "confirmed",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockOrders = [...mockOrders, newOrder];

  // Create payment
  const newPayment: Payment = {
    id: paymentId,
    order_id: orderId,
    amount: batch.price,
    currency: batch.currency,
    method: "upi",
    status: "completed",
    transaction_id: `ADMIN-TXN-${Date.now()}`,
    paid_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  };
  mockPayments = [...mockPayments, newPayment];

  // Create enrollment
  const newEnrollment: Enrollment = {
    id: enrollmentId,
    user_id: userId,
    batch_id: batchId,
    enrolled_at: new Date().toISOString(),
    status: "active",
    progress_percentage: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockEnrollments = [...mockEnrollments, newEnrollment];
}
