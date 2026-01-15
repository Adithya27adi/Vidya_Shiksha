import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { activities, readingComprehensions, classes } from "@/data/mockData";
import { useState, useEffect } from "react";

const ReadingComprehensionPage = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const activity = activities.find((a) => a.id === activityId);
  const reading = readingComprehensions.find((r) => r.activity_id === activityId);
  const classItem = activity ? classes.find((c) => c.id === activity.class_id) : null;

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
      
      if (progress >= 90) {
        setIsCompleted(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!activity || !reading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Reading material not found
          </h1>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  // Parse markdown-like content to HTML
  const renderContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      // Headers
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-semibold mt-8 mb-4 text-foreground">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-semibold mt-10 mb-4 text-foreground">
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-bold mt-0 mb-6 text-foreground">
            {line.replace("# ", "")}
          </h1>
        );
      }
      // List items
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="text-lg leading-8 text-foreground ml-6 mb-2">
            {line.replace("- ", "")}
          </li>
        );
      }
      // Empty lines
      if (line.trim() === "") {
        return <div key={index} className="h-4" />;
      }
      // Regular paragraphs
      return (
        <p key={index} className="text-lg leading-8 text-foreground mb-4">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed progress bar at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <Progress value={scrollProgress} className="h-1 rounded-none" />
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Class
          </Button>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {reading.estimated_reading_time} min read
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {reading.word_count} words
            </span>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <main className="pt-24 pb-32">
        <article className="reading-content">
          {/* Breadcrumb */}
          {classItem && (
            <div className="text-sm text-muted-foreground mb-8">
              <span>{classItem.title}</span>
              <span className="mx-2">→</span>
              <span className="text-foreground">{activity.title}</span>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {renderContent(reading.content)}
          </div>
        </article>
      </main>

      {/* Completion footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isCompleted ? (
              <>
                <CheckCircle className="h-5 w-5 text-live" />
                <span className="text-sm font-medium text-live">
                  Reading completed
                </span>
              </>
            ) : (
              <>
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {Math.round(scrollProgress)}% completed
                </span>
              </>
            )}
          </div>
          <Button
            onClick={() => navigate(-1)}
            disabled={!isCompleted}
            className={isCompleted ? "" : "opacity-50"}
          >
            {isCompleted ? "Mark Complete & Continue" : "Finish Reading"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReadingComprehensionPage;
