import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses } from "@/data/mockData";
import { BookOpen, Users, Video, Award, ArrowRight, CheckCircle } from "lucide-react";

export default function LandingPage() {
  const featuredCourses = courses.slice(0, 6);
  const classLevels = [5, 6, 7, 8, 9, 10];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-primary mb-3">
              Trusted by 10,000+ students
            </p>
            <h1 className="text-foreground mb-4">
              Quality Education for Classes 5–12
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Learn from expert teachers through live interactive sessions or self-paced 
              recorded courses. Build a strong foundation for academic success.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/courses" className="btn-primary px-6 py-2.5">
                Explore Courses
              </Link>
              <Link to="/about" className="btn-outline px-6 py-2.5">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border py-8">
        <div className="container">
          <div className="grid grid-cols-3 gap-8 max-w-lg">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Teachers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Courses</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Class */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="text-foreground mb-2">Browse by Class</h2>
            <p className="text-muted-foreground">
              Find courses tailored to your grade level
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {classLevels.map((level) => (
              <Link
                key={level}
                to={`/courses?class=${level}`}
                className="feature-card text-center py-6 hover:border-primary transition-colors"
              >
                <span className="text-2xl font-bold text-foreground block mb-1">
                  {level}
                </span>
                <span className="text-sm text-muted-foreground">Class</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Modes */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="section-header">
            <h2 className="text-foreground mb-2">Two Ways to Learn</h2>
            <p className="text-muted-foreground">
              Choose the learning style that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="feature-card bg-background">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-live/10 flex items-center justify-center flex-shrink-0">
                  <Video className="h-5 w-5 text-live" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">Live Classes</h3>
                    <span className="badge-live">Live</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Interactive sessions with real-time Q&A and discussions.
                  </p>
                  <ul className="space-y-2">
                    {["Real-time interaction", "Scheduled sessions", "Doubt clearing"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-live" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="feature-card bg-background">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">Self-Paced</h3>
                    <span className="badge-recorded">Recorded</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn at your own speed with recorded lectures.
                  </p>
                  <ul className="space-y-2">
                    {["Learn anytime", "Flexible schedule", "Lifetime access"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section">
        <div className="container">
          <div className="section-header flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-foreground mb-1">Featured Courses</h2>
              <p className="text-muted-foreground">
                Popular courses across all subjects
              </p>
            </div>
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
            >
              View all courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="section-header">
            <h2 className="text-foreground mb-2">Why Choose EduLearn</h2>
            <p className="text-muted-foreground">
              Trusted by students and parents across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Users, title: "Expert Teachers", desc: "Qualified and experienced educators" },
              { icon: BookOpen, title: "Comprehensive Curriculum", desc: "Aligned with CBSE and ICSE boards" },
              { icon: Video, title: "Flexible Learning", desc: "Live or self-paced options" },
              { icon: Award, title: "Proven Results", desc: "Students improve their grades" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="feature-card bg-background">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{title}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-primary-foreground mb-3">
            Ready to Start Learning?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
            Join thousands of students who are improving their grades with EduLearn.
          </p>
          <Link 
            to="/signup" 
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-background text-foreground font-medium rounded-md hover:bg-background/90 transition-colors"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
