import { MainLayout } from "@/components/layout/MainLayout";
import { BookOpen, Users, Award, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="bg-surface-subtle border-b border-border">
        <div className="container py-16">
          <div className="max-w-3xl">
            <h1 className="text-foreground mb-4">About EduLearn</h1>
            <p className="text-body-lg text-muted-foreground">
              We're on a mission to make quality education accessible to every student in India. 
              Our platform brings together expert teachers, comprehensive curriculum, and flexible 
              learning options to help students succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                Education is the foundation of a better future. We believe every student deserves 
                access to quality teaching, regardless of their location or background.
              </p>
              <p className="text-muted-foreground mb-4">
                EduLearn was founded to bridge the gap between students and excellent teachers. 
                We offer live interactive classes for those who thrive on real-time engagement, 
                and self-paced courses for those who prefer flexible learning.
              </p>
              <p className="text-muted-foreground">
                Our curriculum is carefully designed to align with CBSE and ICSE boards, ensuring 
                students are well-prepared for their examinations.
              </p>
            </div>
            <div className="bg-surface-subtle rounded-lg p-8 border border-border">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary mb-1">10,000+</p>
                  <p className="text-sm text-muted-foreground">Students</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary mb-1">50+</p>
                  <p className="text-sm text-muted-foreground">Expert Teachers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary mb-1">200+</p>
                  <p className="text-sm text-muted-foreground">Courses</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary mb-1">95%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-surface-subtle border-y border-border">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-3">Our Values</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Quality First</h4>
              <p className="text-sm text-muted-foreground">
                Every course is designed and reviewed by subject experts to ensure high standards.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Student-Centered</h4>
              <p className="text-sm text-muted-foreground">
                We design our platform around student needs, making learning accessible and engaging.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Results Driven</h4>
              <p className="text-sm text-muted-foreground">
                We measure success by student outcomes—improved grades, confidence, and knowledge.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Trust & Transparency</h4>
              <p className="text-sm text-muted-foreground">
                We're honest about what we offer and committed to earning the trust of students and parents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions about our courses or platform? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@edulearn.com" className="btn-primary">
                Contact Support
              </a>
              <a href="tel:+911234567890" className="btn-outline">
                Call: +91 12345 67890
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
