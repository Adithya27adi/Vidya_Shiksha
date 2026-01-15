import { Link } from "react-router-dom";
import { Course } from "@/types";
import { batches } from "@/data/mockData";
import { Clock, Users } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const courseBatches = batches.filter((b) => b.course_id === course.id);
  const hasLiveBatch = courseBatches.some((b) => b.is_live);
  const lowestPrice = Math.min(...courseBatches.map((b) => b.price));

  return (
    <div className="course-card">
      {/* Thumbnail */}
      <div className="relative rounded-md overflow-hidden mb-3">
        <div className="aspect-video bg-muted">
          {course.thumbnail_url && (
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        {/* Badges overlay */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className="badge-class">Class {course.class_level}</span>
          {hasLiveBatch && (
            <span className="badge-live">Live</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div>
          <span className="text-xs font-medium text-primary uppercase tracking-wide">
            {course.subject}
          </span>
          <h3 className="text-base font-semibold text-foreground mt-0.5 line-clamp-2">
            {course.title}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {courseBatches.length} batch{courseBatches.length !== 1 ? "es" : ""}
          </span>
          {courseBatches[0]?.max_students && (
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {courseBatches[0].max_students} seats
            </span>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">From</span>
            <p className="text-lg font-bold text-foreground">
              ₹{lowestPrice.toLocaleString()}
            </p>
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
