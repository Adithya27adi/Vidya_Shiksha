import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { getClassesForBatch, getClassWithContent, getBatchWithDetails } from "@/data/mockData";
import { 
  PlayCircle, FileText, BookOpen, CheckCircle, Video, ExternalLink, 
  Clock, ChevronLeft, Download, ArrowRight, Zap, Radio
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function LearningPage() {
  return (
    <ProtectedRoute>
      <LearningContent />
    </ProtectedRoute>
  );
}

function LearningContent() {
  const { batchId } = useParams<{ batchId: string }>();
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "activities" | "supplementary">("content");

  const batch = getBatchWithDetails(batchId!);
  const classes = getClassesForBatch(batchId!);

  const currentClassId = selectedClassId || classes[0]?.id;
  const currentClass = currentClassId ? getClassWithContent(currentClassId) : null;
  const currentIndex = classes.findIndex(c => c.id === currentClassId);

  if (!batch || classes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="icon-wrapper-primary mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground">No content available</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "content" as const, label: "Class Content", icon: Video },
    { id: "activities" as const, label: "Activities", icon: BookOpen },
    { id: "supplementary" as const, label: "Materials", icon: FileText },
  ];

  const completedClasses = 2; // Mock data
  const progressPercent = (completedClasses / classes.length) * 100;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-80 bg-sidebar border-r border-sidebar-border flex-shrink-0 flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-sidebar-border">
          <Link 
            to="/my-courses" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to My Courses
          </Link>
          <h2 className="font-bold text-foreground text-lg truncate">{batch.course?.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{batch.title}</p>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-primary">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>

        {/* Class list */}
        <nav className="flex-1 overflow-y-auto py-3">
          <div className="px-4 mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Course Content
            </span>
          </div>
          {classes.map((cls, index) => {
            const isCompleted = index < completedClasses;
            const isCurrent = currentClassId === cls.id;
            
            return (
              <button
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all duration-200 border-l-3 ${
                  isCurrent 
                    ? "bg-accent border-l-primary" 
                    : "border-transparent hover:bg-muted/50"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted 
                    ? "bg-live/10" 
                    : isCurrent 
                    ? "gradient-bg text-white" 
                    : "bg-muted"
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4 text-live" />
                  ) : (
                    <span className={`text-sm font-semibold ${isCurrent ? "" : "text-muted-foreground"}`}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${isCurrent ? "font-semibold text-foreground" : "text-foreground"}`}>
                    {cls.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {cls.duration_minutes} min
                    </span>
                    {cls.is_live && (
                      <span className="text-xs text-live font-medium flex items-center gap-1">
                        <Radio className="h-3 w-3" />
                        Live
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {currentClass && (
          <>
            {/* Class Header */}
            <div className="sticky top-0 z-10 glass border-b border-border">
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-primary">
                        Class {currentIndex + 1} of {classes.length}
                      </span>
                      {currentClass.is_live && (
                        <span className="badge-live">
                          <span className="w-1.5 h-1.5 bg-live rounded-full animate-pulse" />
                          Live
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">{currentClass.title}</h1>
                    <p className="text-muted-foreground mt-1">{currentClass.description}</p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mt-5">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`content-tab flex items-center gap-2 ${activeTab === tab.id ? "active" : ""}`}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "content" && (
                <div>
                  {currentClass.is_live && currentClass.liveClass ? (
                    <div className="max-w-2xl">
                      <div className="feature-card p-8">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="relative">
                            <div className="icon-wrapper-live">
                              <Radio className="h-7 w-7 text-live" />
                            </div>
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-live rounded-full animate-pulse" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-foreground">Live Class Session</h3>
                            <p className="text-muted-foreground">Join the interactive session</p>
                          </div>
                        </div>
                        
                        <div className="bg-muted/50 rounded-xl p-4 mb-6">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Platform</span>
                              <p className="font-semibold text-foreground capitalize">{currentClass.liveClass.platform}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Meeting ID</span>
                              <p className="font-semibold text-foreground">{currentClass.liveClass.meeting_id}</p>
                            </div>
                          </div>
                        </div>
                        
                        <a 
                          href={currentClass.liveClass.meeting_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn-primary w-full justify-center gap-2"
                        >
                          <Zap className="h-5 w-5" />
                          Join Live Class
                        </a>
                      </div>
                    </div>
                  ) : currentClass.content.length > 0 ? (
                    <div className="space-y-6">
                      {currentClass.content.map((content, index) => (
                        <div key={content.id} className="video-container group cursor-pointer">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="relative">
                                <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                                  <PlayCircle className="h-10 w-10 text-white ml-1" />
                                </div>
                              </div>
                              <p className="text-foreground font-semibold mt-4 text-lg">{content.title}</p>
                              <p className="text-muted-foreground text-sm">{Math.floor(content.duration_seconds / 60)} minutes</p>
                            </div>
                          </div>
                          {/* Video number badge */}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 rounded-full bg-black/50 text-white text-sm font-medium backdrop-blur-sm">
                              Video {index + 1}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="icon-wrapper-primary mx-auto mb-4">
                        <Video className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground">No recorded content available</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "activities" && (
                <div className="max-w-3xl space-y-4">
                  {currentClass.activities.length > 0 ? (
                    currentClass.activities.map((activity) => (
                      <div key={activity.id} className="feature-card p-6">
                        <div className="flex items-start gap-4">
                          <div className={activity.type === "reading_comprehension" ? "icon-wrapper-primary" : "icon-wrapper-warning"}>
                            {activity.type === "reading_comprehension" ? (
                              <BookOpen className="h-6 w-6 text-primary" />
                            ) : (
                              <FileText className="h-6 w-6 text-warning" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-bold text-foreground text-lg">{activity.title}</h4>
                              <span className={activity.type === "reading_comprehension" ? "badge-recorded" : "badge-class"}>
                                {activity.type === "reading_comprehension" ? "Reading" : "Quiz"}
                              </span>
                            </div>
                            <p className="text-muted-foreground mb-4">{activity.description}</p>
                            <Link 
                              to={activity.type === "reading_comprehension" 
                                ? `/reading/${activity.id}` 
                                : `/assessment/${activity.id}`
                              }
                              className="btn-outline text-sm py-2.5 px-5 gap-2"
                            >
                              Start {activity.type === "reading_comprehension" ? "Reading" : "Assessment"}
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16">
                      <div className="icon-wrapper-primary mx-auto mb-4">
                        <BookOpen className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground">No activities for this class</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "supplementary" && (
                <div className="max-w-3xl space-y-3">
                  {currentClass.supplementary.length > 0 ? (
                    currentClass.supplementary.map((item) => (
                      <a 
                        key={item.id} 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="feature-card flex items-center gap-4 p-5 group"
                      >
                        <div className="icon-wrapper-primary group-hover:scale-110">
                          {item.type === "pdf" ? (
                            <Download className="h-5 w-5 text-primary" />
                          ) : (
                            <ExternalLink className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </p>
                          {item.description && (
                            <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                          )}
                        </div>
                        <span className="badge-class uppercase">{item.type}</span>
                      </a>
                    ))
                  ) : (
                    <div className="text-center py-16">
                      <div className="icon-wrapper-primary mx-auto mb-4">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground">No supplementary materials</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="sticky bottom-0 glass border-t border-border p-4">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
                <button
                  onClick={() => {
                    if (currentIndex > 0) {
                      setSelectedClassId(classes[currentIndex - 1].id);
                    }
                  }}
                  disabled={currentIndex === 0}
                  className="btn-outline py-2.5 px-5 gap-2 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                
                <button className="btn-primary py-2.5 px-6 gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Mark Complete
                </button>

                <button
                  onClick={() => {
                    if (currentIndex < classes.length - 1) {
                      setSelectedClassId(classes[currentIndex + 1].id);
                    }
                  }}
                  disabled={currentIndex === classes.length - 1}
                  className="btn-outline py-2.5 px-5 gap-2 disabled:opacity-50"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}