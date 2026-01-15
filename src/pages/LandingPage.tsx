import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses } from "@/data/mockData";
import { BookOpen, Users, Video, Award, ArrowRight, CheckCircle, Star, Shield, Clock, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function LandingPage() {
  const featuredCourses = courses.slice(0, 6);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "Excel in academics",
      titleHighlight: "with expert teachers",
      description: "Learn from top faculty with live mentorship and hands-on learning.",
      cta: "Explore Programs",
      ctaLink: "/courses",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-amber-100 to-orange-100",
      badges: ["CBSE", "ICSE", "State Boards"]
    },
    {
      id: 2,
      title: "Board exam success",
      titleHighlight: "starts here",
      description: "Comprehensive preparation for Class 10 & 12 with mock tests and study material.",
      cta: "Start Preparation",
      ctaLink: "/courses",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-blue-100 to-indigo-100",
      badges: ["Mock Tests", "Study Notes", "Live Doubt Sessions"]
    },
    {
      id: 3,
      title: "Master Science & Math",
      titleHighlight: "with visual learning",
      description: "Interactive lessons with animations and real-world examples.",
      cta: "Explore Courses",
      ctaLink: "/courses",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=500&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-emerald-100 to-teal-100",
      badges: ["Video Lessons", "Practice Problems", "Certificates"]
    },
    {
      id: 4,
      title: "Learn at your pace",
      titleHighlight: "anytime, anywhere",
      description: "Self-paced recorded courses with lifetime access and flexible schedules.",
      cta: "Browse Courses",
      ctaLink: "/courses",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-purple-100 to-pink-100",
      badges: ["Lifetime Access", "Mobile App", "Downloadable"]
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 2 >= heroSlides.length ? 0 : prev + 2));
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 2 < 0 ? Math.max(0, heroSlides.length - 2) : prev - 2));
  }, [heroSlides.length]);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const visibleSlides = heroSlides.slice(currentSlide, currentSlide + 2);
  const totalPages = Math.ceil(heroSlides.length / 2);
  const currentPage = Math.floor(currentSlide / 2);

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
      {/* Hero Carousel Section - Great Learning Style */}
      <section className="bg-white py-6 md:py-10">
        <div className="container">
          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Arrow Left */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>

            {/* Navigation Arrow Right */}
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-11 h-11 rounded-full bg-primary shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>

            {/* Cards Container */}
            <div className="grid md:grid-cols-2 gap-5">
              {visibleSlides.map((slide) => (
                <div 
                  key={slide.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex h-full">
                    {/* Left Content */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
                        {slide.title}
                        <span className="block">{slide.titleHighlight}</span>
                      </h2>
                      <p className="text-gray-600 text-sm md:text-base mb-5 leading-relaxed">
                        {slide.description}
                      </p>
                      <Link 
                        to={slide.ctaLink}
                        className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm w-fit"
                      >
                        {slide.cta}
                      </Link>
                    </div>

                    {/* Right Image Section */}
                    <div className={`relative w-44 md:w-52 flex-shrink-0 ${slide.bgColor}`}>
                      <img 
                        src={slide.image}
                        alt="Student"
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Floating Badges */}
                      <div className="absolute bottom-4 left-0 right-0 flex flex-wrap justify-center gap-1.5 px-2">
                        {slide.badges.map((badge, idx) => (
                          <span 
                            key={badge}
                            className={`px-2.5 py-1 text-xs font-medium rounded-full shadow-md ${
                              idx === 0 ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-200'
                            }`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index * 2)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentPage 
                      ? 'w-6 bg-gray-800' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Trust Ratings Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-10 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span className="text-xl font-bold text-gray-900">4.8</span>
              <span className="text-sm text-gray-600">Google Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-green-500 text-green-500" />
              <span className="text-xl font-bold text-gray-900">4.9</span>
              <span className="text-sm text-gray-600">Parent Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-blue-500 text-blue-500" />
              <span className="text-xl font-bold text-gray-900">10K+</span>
              <span className="text-sm text-gray-600">Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-purple-500 text-purple-500" />
              <span className="text-xl font-bold text-gray-900">50+</span>
              <span className="text-sm text-gray-600">Expert Teachers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Modes - Premium cards */}
      <section className="section bg-gray-50">
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
      <section className="section bg-gray-50">
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
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.name} 
                className="feature-card p-6 flex flex-col bg-card"
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