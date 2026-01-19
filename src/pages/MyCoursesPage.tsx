import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { getEnrollmentsWithDetails } from "@/data/mockData";
import { BookOpen } from "lucide-react";

export default function MyCoursesPage() {
  return (
    <ProtectedRoute>
      <MyCoursesContent />
    </ProtectedRoute>
  );
}

function MyCoursesContent() {
  const enrollments = getEnrollmentsWithDetails("user-1");

  const activeEnrollments = enrollments.filter((e) => e.status === "active");
  const completedEnrollments = enrollments.filter((e) => e.status === "completed");

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-2">My Courses</h1>
          <p className="text-muted-foreground">All your enrolled courses in one place</p>
        </div>

        {enrollments.length === 0 ? (
          <div className="bg-surface-subtle border border-border rounded-lg p-12 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No courses yet</h3>
            <p className="text-muted-foreground mb-6">
              You haven't enrolled in any courses. Start learning today!
            </p>
            <Link to="/courses" className="btn-primary">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Active Courses */}
            {activeEnrollments.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  In Progress ({activeEnrollments.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeEnrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="bg-card border border-border rounded-lg overflow-hidden"
                    >
                      {enrollment.course.thumbnail_url && (
                        <img
                          src={enrollment.course.thumbnail_url}
                          alt={enrollment.course.title}
                          className="w-full aspect-video object-cover"
                        />
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="badge-class">Class {enrollment.course.class_level}</span>
                          {enrollment.batch.is_live ? (
                            <span className="badge-live">Live</span>
                          ) : (
                            <span className="badge-recorded">Self-Paced</span>
                          )}
                        </div>

                        <h3 className="font-semibold text-foreground mb-1">
                          {enrollment.course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {enrollment.batch.title}
                        </p>

                        <Link
                          to={`/learn/${enrollment.batch.id}`}
                          className="btn-primary w-full text-sm"
                        >
                          Continue Learning
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Completed Courses */}
            {completedEnrollments.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Completed ({completedEnrollments.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedEnrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="bg-card border border-border rounded-lg overflow-hidden opacity-75"
                    >
                      {enrollment.course.thumbnail_url && (
                        <img
                          src={enrollment.course.thumbnail_url}
                          alt={enrollment.course.title}
                          className="w-full aspect-video object-cover grayscale"
                        />
                      )}
                      <div className="p-5">
                        <span className="badge-class mb-2 inline-block">
                          Class {enrollment.course.class_level}
                        </span>
                        <h3 className="font-semibold text-foreground mb-1">
                          {enrollment.course.title}
                        </h3>
                        <p className="text-sm text-success font-medium">✓ Completed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
