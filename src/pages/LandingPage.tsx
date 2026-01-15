import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses } from "@/data/mockData";
import { BookOpen, Users, Video, Award, ArrowRight, CheckCircle, Star, Shield, Clock, Quote } from "lucide-react";

export default function LandingPage() {
  const featuredCourses = courses.slice(0, 6);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Class 10 Student",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      content: "Vidya Shiksha helped me improve my Math scores from 65% to 92%. The live classes are interactive and the teachers explain concepts so clearly!",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Parent of Class 8 Student",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "As a parent, I'm impressed by the quality of education. My son now looks forward to his study time. The recorded lectures are a blessing for revision.",
      rating: 5
    },
    {
      name: "Ananya Patel",
      role: "Class 12 Student",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "The self-paced courses gave me flexibility to balance board exam preparation with competitive exams. Highly recommend for serious students!",
      rating: 5
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section - Premium with subtle gradient */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 pattern-dots opacity-30" />
        
        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Trust badge */}
            <div className="trust-badge mb-6 animate-fade-in">
              <Star className="h-4 w-4" />
              Trusted by 10,000+ students across India
            </div>
            
            <h1 className="text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Premium Education for
              <span className="block gradient-text">Classes 5–12</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Learn from India's top educators through live interactive sessions or self-paced 
              recorded courses. Build a strong academic foundation with our comprehensive curriculum.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/courses" className="btn-primary px-8 py-3 text-base">
                Explore Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/about" className="btn-outline px-8 py-3 text-base">
                Learn More
              </Link>
            </div>

            {/* Quick stats inline */}
            <div className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-border/50 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {[
                { number: "50+", label: "Expert Teachers" },
                { number: "100+", label: "Courses" },
                { number: "10K+", label: "Active Students" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Modes - Premium cards */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="section-header text-center max-w-2xl mx-auto">
            <h2 className="text-foreground mb-3">Two Ways to Learn</h2>
            <p className="text-muted-foreground text-lg">
              Choose the learning style that best fits your schedule and preferences
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Live Classes Card */}
            <div className="feature-card p-8 group">
              <div className="flex items-start gap-5">
                <div className="icon-wrapper-live flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Video className="h-7 w-7 text-live" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-foreground">Live Interactive Classes</h3>
                    <span className="badge-live">
                      <span className="w-2 h-2 bg-live rounded-full animate-pulse" />
                      Live
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Engage in real-time with expert teachers through interactive sessions with instant doubt clearing.
                  </p>
                  <ul className="space-y-3">
                    {[
                      { text: "Real-time Q&A sessions", icon: CheckCircle },
                      { text: "Scheduled class timings", icon: Clock },
                      { text: "Live doubt clearing", icon: Shield },
                    ].map(({ text, icon: Icon }) => (
                      <li key={text} className="flex items-center gap-3 text-sm text-foreground">
                        <div className="w-5 h-5 rounded-full bg-live/10 flex items-center justify-center">
                          <Icon className="h-3 w-3 text-live" />
                        </div>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Self-Paced Card */}
            <div className="feature-card p-8 group">
              <div className="flex items-start gap-5">
                <div className="icon-wrapper-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-foreground">Self-Paced Learning</h3>
                    <span className="badge-recorded">Recorded</span>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Learn at your own pace with high-quality recorded lectures you can watch anytime, anywhere.
                  </p>
                  <ul className="space-y-3">
                    {[
                      { text: "Learn anytime, anywhere", icon: CheckCircle },
                      { text: "Flexible schedule", icon: Clock },
                      { text: "Lifetime access", icon: Shield },
                    ].map(({ text, icon: Icon }) => (
                      <li key={text} className="flex items-center gap-3 text-sm text-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="h-3 w-3 text-primary" />
                        </div>
                        {text}
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
          <div className="section-header flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <div className="badge-accent mb-4 w-fit">
                <Star className="h-3.5 w-3.5 mr-1" />
                Popular Picks
              </div>
              <h2 className="text-foreground mb-2">Featured Courses</h2>
              <p className="text-muted-foreground text-lg">
                Our most popular courses across all subjects and grade levels
              </p>
            </div>
            <Link 
              to="/courses" 
              className="btn-outline group"
            >
              View all courses
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Premium grid */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="section-header text-center max-w-2xl mx-auto">
            <h2 className="text-foreground mb-3">Why Choose Vidya Shiksha</h2>
            <p className="text-muted-foreground text-lg">
              Trusted by students and parents across India for quality education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Users, 
                title: "Expert Teachers", 
                desc: "Learn from qualified educators with years of teaching experience",
                color: "primary"
              },
              { 
                icon: BookOpen, 
                title: "Comprehensive Curriculum", 
                desc: "Aligned with CBSE, ICSE, and state board syllabi",
                color: "accent"
              },
              { 
                icon: Video, 
                title: "Flexible Learning", 
                desc: "Choose between live classes or self-paced recorded courses",
                color: "live"
              },
              { 
                icon: Award, 
                title: "Proven Results", 
                desc: "Students consistently improve their grades and confidence",
                color: "warning"
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="grid-card group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${
                  color === 'primary' ? 'bg-primary/10' :
                  color === 'accent' ? 'bg-accent/10' :
                  color === 'live' ? 'bg-live/10' :
                  'bg-warning/10'
                }`}>
                  <Icon className={`h-7 w-7 ${
                    color === 'primary' ? 'text-primary' :
                    color === 'accent' ? 'text-accent' :
                    color === 'live' ? 'text-live' :
                    'text-warning'
                  }`} />
                </div>
                <h4 className="font-bold text-foreground text-lg mb-2">{title}</h4>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center max-w-2xl mx-auto">
            <div className="badge-accent mb-4 mx-auto w-fit">
              <Quote className="h-3.5 w-3.5 mr-1" />
              Student Stories
            </div>
            <h2 className="text-foreground mb-3">What Our Students Say</h2>
            <p className="text-muted-foreground text-lg">
              Hear from students and parents who transformed their learning journey with us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name} 
                className="feature-card p-6 flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Quote icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-primary/20" />
                </div>
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-foreground leading-relaxed flex-1 mb-6">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium gradient */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute inset-0 pattern-dots opacity-10" />
        
        <div className="container relative py-20 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto text-lg">
            Join thousands of students who are achieving their academic goals with Vidya Shiksha.
          </p>
          <Link 
            to="/signup" 
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-foreground font-semibold rounded-xl hover:bg-white/95 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}