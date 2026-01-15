import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses } from "@/data/mockData";
import { BookOpen, Users, Video, Award, ArrowRight, CheckCircle, Star, Shield, Clock, Quote, ChevronLeft, ChevronRight, ThumbsUp, GraduationCap, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    {
      name: "Vikram Singh",
      role: "Class 9 Student",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      content: "The doubt-clearing sessions are amazing! I can ask any question and get detailed explanations. My understanding of Science has improved tremendously.",
      rating: 5
    },
    {
      name: "Meera Joshi",
      role: "Parent of Class 6 Student",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      content: "Finally found a platform that makes learning fun for my daughter. The interactive quizzes and animations keep her engaged throughout the lessons.",
      rating: 5
    },
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-slide testimonials every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

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
              <ThumbsUp className="h-5 w-5 text-green-500" />
              <span className="text-xl font-bold text-gray-900">4.9</span>
              <span className="text-sm text-gray-600">Parent Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="text-xl font-bold text-gray-900">10K+</span>
              <span className="text-sm text-gray-600">Students</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-500" />
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

      {/* FAQ Section - Modern Design */}
      <section className="section bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Header */}
            <div className="lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <HelpCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">FAQs</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Got Questions?<br />
                <span className="text-primary">We've Got Answers</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Everything you need to know about our courses and platform. Can't find what you're looking for?
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                Contact our support team
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Right - Accordion */}
            <div>
              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="item-1" className="bg-white rounded-2xl border-0 shadow-sm px-6 data-[state=open]:shadow-md transition-shadow">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 gap-4">
                    What classes do you offer courses for?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    We offer comprehensive courses for students from Class 5 to Class 12. Our curriculum covers all major subjects including Mathematics, Science, English, Hindi, Social Science, and Computer Science, aligned with CBSE, ICSE, and various state board syllabi.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-white rounded-2xl border-0 shadow-sm px-6 data-[state=open]:shadow-md transition-shadow">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 gap-4">
                    What is the difference between Live and Self-Paced courses?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    Live courses include real-time interactive sessions with teachers where you can ask questions and get instant doubt clearing. Self-Paced courses are pre-recorded video lectures that you can watch anytime, anywhere at your own convenience with lifetime access.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-white rounded-2xl border-0 shadow-sm px-6 data-[state=open]:shadow-md transition-shadow">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 gap-4">
                    Do you provide study materials and practice tests?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    Yes! All our courses come with comprehensive study materials, chapter-wise notes, practice worksheets, and mock tests. For board exam classes (10th & 12th), we also provide previous year question papers with solutions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-white rounded-2xl border-0 shadow-sm px-6 data-[state=open]:shadow-md transition-shadow">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 gap-4">
                    How can I get my doubts cleared?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    For Live courses, you can ask questions directly during the class. We also have dedicated doubt-clearing sessions and a discussion forum where teachers respond within 24 hours. Self-Paced students can post their doubts in the course discussion section.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-white rounded-2xl border-0 shadow-sm px-6 data-[state=open]:shadow-md transition-shadow">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 gap-4">
                    Is there a free trial available?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    Yes, we offer free demo classes for all our live courses and free preview lessons for self-paced courses. You can also access our free resources section which includes sample video lessons, study notes, and practice tests.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="bg-white rounded-2xl border-0 shadow-sm px-6 data-[state=open]:shadow-md transition-shadow">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 gap-4">
                    What is the refund policy?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    We offer a 7-day money-back guarantee on all our courses. If you're not satisfied with the course content or teaching quality, you can request a full refund within 7 days of purchase, no questions asked.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Compact Modern Design */}
      <section className="py-16 bg-[#0f172a]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Left - Header */}
            <div className="md:w-1/3 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                What Our Students Say
              </h3>
              <p className="text-white/60 text-sm mb-4">
                Trusted by 10,000+ students
              </p>
              <div className="flex items-center justify-center md:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-white/80 text-sm ml-2">4.9/5</span>
              </div>
            </div>

            {/* Right - Testimonial Card */}
            <div className="md:w-2/3 relative">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <img 
                    src={testimonials[testimonialIndex].image} 
                    alt={testimonials[testimonialIndex].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-white">{testimonials[testimonialIndex].name}</p>
                      <span className="text-white/40">•</span>
                      <p className="text-white/60 text-sm">{testimonials[testimonialIndex].role}</p>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      "{testimonials[testimonialIndex].content}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-1.5">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setTestimonialIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === testimonialIndex 
                          ? 'w-6 bg-primary' 
                          : 'w-1.5 bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={prevTestimonial}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-4 w-4 text-white" />
                  </button>
                  <button 
                    onClick={nextTestimonial}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Premium Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-white/90">Limited Time: Free Access to Demo Classes</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Start Your
              <span className="block mt-2 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                Learning Journey?
              </span>
            </h2>
            
            <p className="text-white/70 mb-10 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              Join thousands of students who are achieving their academic goals with Vidya Shiksha.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/signup" 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-2xl shadow-black/20 hover:shadow-black/30 hover:-translate-y-1"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/courses" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Explore Courses
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">10K+</p>
                <p className="text-sm text-white/60">Students</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-sm text-white/60">Courses</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">4.9★</p>
                <p className="text-sm text-white/60">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}