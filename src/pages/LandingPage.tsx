import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses } from "@/data/mockData";
import { BookOpen, Users, Video, Award, ArrowRight, Sparkles, GraduationCap, Clock } from "lucide-react";

export default function LandingPage() {
  const featuredCourses = courses.slice(0, 6);
  const classLevels = [5, 6, 7, 8, 9, 10];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 gradient-bg-subtle" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        
        <div className="container relative py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Trusted by 10,000+ students across India
            </div>
            
            <h1 className="text-foreground mb-6 text-shadow">
              Quality Education for{" "}
              <span className="gradient-text">Classes 5–12</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Learn from expert teachers through live interactive sessions or self-paced 
              recorded courses. Build a strong foundation for academic success.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/courses" className="btn-primary text-lg px-8 py-4 gap-2">
                Explore Courses
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/about" className="btn-outline text-lg px-8 py-4">
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
              <div className="stat-card">
                <div className="text-3xl font-bold gradient-text mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Expert Teachers</div>
              </div>
              <div className="stat-card">
                <div className="text-3xl font-bold gradient-text mb-1">100+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="stat-card">
                <div className="text-3xl font-bold gradient-text mb-1">10K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Class */}
      <section className="section bg-background">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="text-foreground mb-4">Browse by Class</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Find courses tailored to your grade level
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {classLevels.map((level) => (
              <Link
                key={level}
                to={`/courses?class=${level}`}
                className="group feature-card flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="icon-wrapper-primary mb-4 group-hover:scale-110">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <span className="text-3xl font-bold text-foreground mb-1">
                  {level}
                </span>
                <span className="text-sm text-muted-foreground">Class</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Modes */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="text-foreground mb-4">Two Ways to Learn</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Choose the learning style that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="feature-card p-8">
              <div className="flex items-start gap-5">
                <div className="icon-wrapper-live flex-shrink-0">
                  <Video className="h-7 w-7 text-live" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-foreground">Live Classes</h3>
                    <span className="badge-live">
                      <span className="w-1.5 h-1.5 bg-live rounded-full animate-pulse" />
                      Live
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-5">
                    Interactive sessions with expert teachers. Ask questions in real-time, 
                    participate in discussions, and get instant feedback.
                  </p>
                  <ul className="space-y-3">
                    {["Real-time interaction", "Scheduled sessions", "Doubt clearing"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-live/10 flex items-center justify-center">
                          <span className="w-2 h-2 bg-live rounded-full" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="feature-card p-8">
              <div className="flex items-start gap-5">
                <div className="icon-wrapper-primary flex-shrink-0">
                  <BookOpen className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-foreground">Self-Paced</h3>
                    <span className="badge-recorded">
                      <Clock className="h-3 w-3" />
                      Flexible
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-5">
                    Learn at your own speed with recorded lectures. Pause, rewind, and 
                    revisit topics as many times as you need.
                  </p>
                  <ul className="space-y-3">
                    {["Learn anytime", "Flexible schedule", "Lifetime access"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="w-2 h-2 bg-primary rounded-full" />
                        </div>
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
              <h2 className="text-foreground mb-2">Featured Courses</h2>
              <p className="text-lg text-muted-foreground">
                Popular courses across all subjects
              </p>
            </div>
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
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
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="text-foreground mb-4">Why Choose EduLearn</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Trusted by students and parents across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Expert Teachers", desc: "Learn from qualified and experienced educators" },
              { icon: BookOpen, title: "Comprehensive Curriculum", desc: "Aligned with CBSE and ICSE boards" },
              { icon: Video, title: "Flexible Learning", desc: "Live classes or self-paced options" },
              { icon: Award, title: "Proven Results", desc: "Students consistently improve their grades" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="feature-card text-center p-8">
                <div className="icon-wrapper-primary mx-auto mb-5">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-2">{title}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 gradient-bg" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTItNC0yLTItNCAyLTQgMi00IDQtMiA0LTIgMi00IDItNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            
            <div className="relative px-8 py-16 md:py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of students who are already improving their grades with EduLearn.
              </p>
              <Link 
                to="/signup" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}