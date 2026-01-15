import { Link } from "react-router-dom";
import { Course } from "@/types";
import { batches } from "@/data/mockData";
import { Clock, Users, ArrowRight } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const courseBatches = batches.filter((b) => b.course_id === course.id);
  const hasLiveBatch = courseBatches.some((b) => b.is_live);
  const lowestPrice = Math.min(...courseBatches.map((b) => b.price));

  return (
    <div className="course-card group">
      {/* Thumbnail */}
      <div className="relative rounded-xl overflow-hidden mb-4 -mx-1 -mt-1">
        <div className="aspect-video bg-gradient-to-br from-muted to-secondary">
          {course.thumbnail_url && (
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>
        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge-class">Class {course.class_level}</span>
          {hasLiveBatch && (
            <span className="badge-live">
              <span className="w-1.5 h-1.5 bg-live rounded-full animate-pulse" />
              Live
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            {course.subject}
          </span>
          <h3 className="text-lg font-bold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
            {course.title}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {courseBatches.length} batch{courseBatches.length !== 1 ? "es" : ""}
          </span>
          {courseBatches[0]?.max_students && (
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {courseBatches[0].max_students} seats
            </span>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">Starting from</span>
            <p className="text-xl font-bold gradient-text">
              ₹{lowestPrice.toLocaleString()}
            </p>
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}