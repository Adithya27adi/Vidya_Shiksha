import { Link } from "react-router-dom";
import { Course } from "@/types";
import { batches } from "@/data/mockData";
import { Clock, Users, ArrowRight, Star } from "lucide-react";

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
      <div className="relative rounded-xl overflow-hidden mb-4">
        <div className="aspect-video bg-gradient-to-br from-muted to-muted/50">
          {course.thumbnail_url && (
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge-class backdrop-blur-sm bg-background/90">
            Class {course.class_level}
          </span>
          {hasLiveBatch && (
            <span className="badge-live backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-live rounded-full animate-pulse" />
              Live
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Subject tag */}
        <div className="flex items-center gap-2">
          <span className="badge-accent text-xs">
            {course.subject}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {courseBatches.length} batch{courseBatches.length !== 1 ? "es" : ""}
          </span>
          {courseBatches[0]?.max_students && (
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {courseBatches[0].max_students} seats
            </span>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            <span className="text-xs text-muted-foreground block">Starting from</span>
            <p className="text-xl font-bold text-foreground">
              ₹{lowestPrice.toLocaleString()}
            </p>
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="btn-outline py-2 text-sm group/btn"
          >
            View Details
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}