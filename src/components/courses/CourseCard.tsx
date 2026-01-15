import { Link } from "react-router-dom";
import { Course } from "@/types";
import { batches } from "@/data/mockData";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const courseBatches = batches.filter((b) => b.course_id === course.id);
  const hasLive = courseBatches.some((b) => b.is_live);
  const hasSelfPaced = courseBatches.some((b) => !b.is_live);
  const minPrice = Math.min(...courseBatches.map((b) => b.price));

  return (
    <div className="course-card flex flex-col h-full">
      {course.thumbnail_url && (
        <div className="relative w-full mb-4 rounded-md overflow-hidden bg-muted aspect-video">
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex gap-2 mb-3">
        <span className="badge-class">Class {course.class_level}</span>
        {hasLive && <span className="badge-live">Live</span>}
        {hasSelfPaced && <span className="badge-recorded">Self-Paced</span>}
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
        {course.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
        {course.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground">
          From <span className="font-semibold text-foreground">₹{minPrice.toLocaleString()}</span>
        </span>
        <Link
          to={`/courses/${course.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
