import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { BatchCard } from "@/components/courses/BatchCard";
import { getCourseWithBatches } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle } from "lucide-react";

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, setPendingEnrollment } = useAuth();

  const courseWithBatches = getCourseWithBatches(courseId!);

  if (!courseWithBatches) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <h1 className="text-foreground mb-4">Course Not Found</h1>
          <p className="text-muted-foreground">The course you're looking for doesn't exist.</p>
        </div>
      </MainLayout>
    );
  }

  const handleEnroll = (batchId: string) => {
    if (!isAuthenticated) {
      // Save pending enrollment and redirect to login
      setPendingEnrollment({ courseId: courseWithBatches.id, batchId });
      navigate("/login", { state: { from: `/order/${batchId}` } });
    } else {
      // Already logged in, go to order page
      navigate(`/order/${batchId}`);
    }
  };

  return (
    <MainLayout>
      {/* Course Header */}
      <section className="bg-surface-subtle border-b border-border">
        <div className="container py-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge-class">Class {courseWithBatches.class_level}</span>
            <span className="text-sm text-muted-foreground">{courseWithBatches.subject}</span>
          </div>

          <h1 className="text-foreground mb-4">{courseWithBatches.title}</h1>
          <p className="text-body-lg text-muted-foreground max-w-3xl">
            {courseWithBatches.description}
          </p>
        </div>
      </section>

      <div className="container py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Learning Outcomes */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {courseWithBatches.learning_outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Batches */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Available Batches
              </h2>
              <div className="space-y-4">
                {courseWithBatches.batches.map((batch) => (
                  <BatchCard key={batch.id} batch={batch} onEnroll={handleEnroll} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Course Image */}
          <div className="lg:col-span-1">
            {courseWithBatches.thumbnail_url && (
              <div className="sticky top-24">
                <div className="rounded-lg overflow-hidden border border-border">
                  <img
                    src={courseWithBatches.thumbnail_url}
                    alt={courseWithBatches.title}
                    className="w-full aspect-video object-cover"
                  />
                </div>

                <div className="mt-4 p-4 bg-surface-subtle rounded-lg border border-border">
                  <h4 className="font-medium text-foreground mb-2">Course Includes</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Video lectures and demonstrations</li>
                    <li>• Practice exercises and assessments</li>
                    <li>• Downloadable study materials</li>
                    <li>• Reading comprehension activities</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
