import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses } from "@/data/mockData";
import { BookOpen, Users, Video, Award } from "lucide-react";

export default function LandingPage() {
  // Get featured courses (one per class level for variety)
  const featuredCourses = courses.slice(0, 6);

  const classLevels = [5, 6, 7, 8, 9, 10];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-surface-subtle border-b border-border">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-display-md md:text-display-lg text-foreground mb-6">
              Quality Education for Classes 5–12
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Learn from expert teachers through live interactive sessions or self-paced 
              recorded courses. Build a strong foundation for academic success.
            </p>
            <Link to="/courses" className="btn-primary text-base px-8 py-3">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Class */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="text-foreground mb-3">Browse by Class</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Find courses tailored to your grade level
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {classLevels.map((level) => (
              <Link
                key={level}
                to={`/courses?class=${level}`}
                className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-sm transition-all"
              >
                <span className="text-2xl font-semibold text-foreground mb-1">
                  {level}
                </span>
                <span className="text-sm text-muted-foreground">Class</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Modes */}
      <section className="section bg-surface-subtle border-y border-border">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="text-foreground mb-3">Two Ways to Learn</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Choose the learning style that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="w-12 h-12 bg-live/10 rounded-lg flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-live" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Live Classes</h3>
              <p className="text-muted-foreground mb-4">
                Interactive sessions with expert teachers. Ask questions in real-time, 
                participate in discussions, and get instant feedback.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-live rounded-full" />
                  Real-time interaction
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-live rounded-full" />
                  Scheduled sessions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-live rounded-full" />
                  Doubt clearing
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <div className="w-12 h-12 bg-recorded/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-recorded" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Self-Paced</h3>
              <p className="text-muted-foreground mb-4">
                Learn at your own speed with recorded lectures. Pause, rewind, and 
                revisit topics as many times as you need.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-recorded rounded-full" />
                  Learn anytime
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-recorded rounded-full" />
                  Flexible schedule
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-recorded rounded-full" />
                  Lifetime access
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section">
        <div className="container">
          <div className="section-header flex items-center justify-between">
            <div>
              <h2 className="text-foreground mb-2">Featured Courses</h2>
              <p className="text-muted-foreground">
                Popular courses across all subjects
              </p>
            </div>
            <Link to="/courses" className="text-sm font-medium text-primary hover:underline hidden md:block">
              View all courses →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/courses" className="btn-outline">
              View all courses
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-surface-subtle border-t border-border">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="text-foreground mb-3">Why Choose EduLearn</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Trusted by students and parents across India
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Expert Teachers</h4>
              <p className="text-sm text-muted-foreground">
                Learn from qualified and experienced educators
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Comprehensive Curriculum</h4>
              <p className="text-sm text-muted-foreground">
                Aligned with CBSE and ICSE boards
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Flexible Learning</h4>
              <p className="text-sm text-muted-foreground">
                Live classes or self-paced options
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Proven Results</h4>
              <p className="text-sm text-muted-foreground">
                Students consistently improve their grades
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
