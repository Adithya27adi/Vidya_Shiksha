import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses, batches, getSubjects, getClassLevels } from "@/data/mockData";
import { Search, Filter } from "lucide-react";

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const selectedClass = searchParams.get("class") ? parseInt(searchParams.get("class")!) : null;
  const selectedSubject = searchParams.get("subject") || null;
  const selectedType = searchParams.get("type") || null; // "live" or "self-paced"

  const subjects = getSubjects();
  const classLevels = getClassLevels();

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Class filter
      if (selectedClass && course.class_level !== selectedClass) {
        return false;
      }

      // Subject filter
      if (selectedSubject && course.subject !== selectedSubject) {
        return false;
      }

      // Learning type filter
      if (selectedType) {
        const courseBatches = batches.filter((b) => b.course_id === course.id);
        if (selectedType === "live" && !courseBatches.some((b) => b.is_live)) {
          return false;
        }
        if (selectedType === "self-paced" && !courseBatches.some((b) => !b.is_live)) {
          return false;
        }
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          course.title.toLowerCase().includes(query) ||
          course.subject.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [selectedClass, selectedSubject, selectedType, searchQuery]);

  const updateFilter = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery("");
  };

  const hasActiveFilters = selectedClass || selectedSubject || selectedType || searchQuery;

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-2">Browse Courses</h1>
          <p className="text-muted-foreground">
            Find the perfect course for your learning goals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input pl-10"
            />
          </div>

          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mr-4">
              <Filter className="h-4 w-4" />
              <span>Filters:</span>
            </div>

            {/* Class Filter */}
            <select
              value={selectedClass || ""}
              onChange={(e) => updateFilter("class", e.target.value || null)}
              className="px-3 py-2 text-sm border border-input rounded-md bg-background"
            >
              <option value="">All Classes</option>
              {classLevels.map((level) => (
                <option key={level} value={level}>
                  Class {level}
                </option>
              ))}
            </select>

            {/* Subject Filter */}
            <select
              value={selectedSubject || ""}
              onChange={(e) => updateFilter("subject", e.target.value || null)}
              className="px-3 py-2 text-sm border border-input rounded-md bg-background"
            >
              <option value="">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>

            {/* Learning Type Filter */}
            <select
              value={selectedType || ""}
              onChange={(e) => updateFilter("type", e.target.value || null)}
              className="px-3 py-2 text-sm border border-input rounded-md bg-background"
            >
              <option value="">All Types</option>
              <option value="live">Live Classes</option>
              <option value="self-paced">Self-Paced</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline ml-auto"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"} found
          </p>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No courses match your filters</p>
            <button onClick={clearFilters} className="btn-secondary">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
