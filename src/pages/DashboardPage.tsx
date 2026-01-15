import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { getEnrollmentsWithDetails, getClassesForBatch } from "@/data/mockData";
import { BookOpen, PlayCircle, Calendar, Clock, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const enrollments = getEnrollmentsWithDetails("user-1");

  // Get upcoming live classes
  const upcomingClasses = enrollments
    .filter((e) => e.batch.is_live)
    .flatMap((e) => {
      const classes = getClassesForBatch(e.batch.id);
      return classes
        .filter((c) => c.is_live && c.scheduled_at && new Date(c.scheduled_at) > new Date())
        .map((c) => ({
          ...c,
          course: e.course,
          batch: e.batch,
        }));
    })
    .sort((a, b) => new Date(a.scheduled_at!).getTime() - new Date(b.scheduled_at!).getTime())
    .slice(0, 3);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-foreground mb-2">Welcome back, {user?.first_name}!</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Continue Learning</h2>
                <Link to="/my-courses" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>

              {enrollments.length > 0 ? (
                <div className="space-y-4">
                  {enrollments.slice(0, 3).map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="bg-card border border-border rounded-lg p-5 flex gap-4"
                    >
                      {enrollment.course.thumbnail_url && (
                        <img
                          src={enrollment.course.thumbnail_url}
                          alt={enrollment.course.title}
                          className="w-32 h-20 object-cover rounded-md hidden sm:block"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="badge-class">Class {enrollment.course.class_level}</span>
                          {enrollment.batch.is_live ? (
                            <span className="badge-live">Live</span>
                          ) : (
                            <span className="badge-recorded">Self-Paced</span>
                          )}
                        </div>
                        <h3 className="font-semibold text-foreground mb-1 truncate">
                          {enrollment.course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {enrollment.batch.title}
                        </p>

                        {/* Progress */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${enrollment.progress_percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {enrollment.progress_percentage}%
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/learn/${enrollment.batch.id}`}
                        className="self-center btn-primary text-sm py-2 px-4"
                      >
                        Continue
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-surface-subtle border border-border rounded-lg p-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet</p>
                  <Link to="/courses" className="btn-primary">
                    Browse Courses
                  </Link>
                </div>
              )}
            </section>

            {/* Quick Stats */}
            <section className="grid grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-primary mb-1">{enrollments.length}</p>
                <p className="text-sm text-muted-foreground">Enrolled Courses</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-primary mb-1">
                  {Math.round(
                    enrollments.reduce((acc, e) => acc + e.progress_percentage, 0) /
                      (enrollments.length || 1)
                  )}%
                </p>
                <p className="text-sm text-muted-foreground">Avg. Progress</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-primary mb-1">{upcomingClasses.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming Classes</p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upcoming Live Classes */}
            <section className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Live Classes
              </h3>

              {upcomingClasses.length > 0 ? (
                <div className="space-y-4">
                  {upcomingClasses.map((cls) => (
                    <div key={cls.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <p className="text-sm font-medium text-foreground mb-1">{cls.title}</p>
                      <p className="text-xs text-muted-foreground mb-2">{cls.course.title}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(cls.scheduled_at!)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(cls.scheduled_at!)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No upcoming classes scheduled</p>
              )}
            </section>

            {/* Quick Actions */}
            <section className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  to="/courses"
                  className="flex items-center justify-between p-3 bg-surface-subtle rounded-md hover:bg-muted transition-colors"
                >
                  <span className="text-sm text-foreground">Browse More Courses</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center justify-between p-3 bg-surface-subtle rounded-md hover:bg-muted transition-colors"
                >
                  <span className="text-sm text-foreground">View Profile</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
