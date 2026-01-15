import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { getClassesForBatch, getClassWithContent, getBatchWithDetails, getReadingComprehension, getAssessmentWithQuestions } from "@/data/mockData";
import { PlayCircle, FileText, BookOpen, CheckCircle, Video, ExternalLink, Clock } from "lucide-react";

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

  if (!batch || classes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No content available</p>
      </div>
    );
  }

  const tabs = [
    { id: "content" as const, label: "Class Content", icon: Video },
    { id: "activities" as const, label: "Activities", icon: BookOpen },
    { id: "supplementary" as const, label: "Materials", icon: FileText },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 learning-sidebar flex-shrink-0 overflow-y-auto">
        <div className="p-4 border-b border-sidebar-border">
          <h2 className="font-semibold text-sidebar-foreground truncate">{batch.course?.title}</h2>
          <p className="text-sm text-muted-foreground">{batch.title}</p>
        </div>
        <nav className="py-2">
          {classes.map((cls, index) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`class-item w-full text-left ${currentClassId === cls.id ? "active" : ""}`}
            >
              <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{cls.title}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {cls.duration_minutes} min
                  {cls.is_live && <span className="ml-1 text-live">• Live</span>}
                </p>
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">
        {currentClass && (
          <>
            <div className="border-b border-border p-4">
              <h1 className="text-xl font-semibold text-foreground mb-1">{currentClass.title}</h1>
              <p className="text-muted-foreground text-sm">{currentClass.description}</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-border px-4 flex gap-2 py-2">
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

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "content" && (
                <div>
                  {currentClass.is_live && currentClass.liveClass ? (
                    <div className="bg-surface-subtle border border-border rounded-lg p-6">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-live rounded-full animate-pulse" />
                        Live Class
                      </h3>
                      <p className="text-muted-foreground mb-4">Meeting ID: {currentClass.liveClass.meeting_id}</p>
                      <a href={currentClass.liveClass.meeting_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                        Join Meeting
                      </a>
                    </div>
                  ) : currentClass.content.length > 0 ? (
                    <div className="space-y-4">
                      {currentClass.content.map((content) => (
                        <div key={content.id} className="video-container flex items-center justify-center">
                          <div className="text-center">
                            <PlayCircle className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                            <p className="text-foreground font-medium">{content.title}</p>
                            <p className="text-sm text-muted-foreground">{Math.floor(content.duration_seconds / 60)} minutes</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No recorded content available</p>
                  )}
                </div>
              )}

              {activeTab === "activities" && (
                <div className="space-y-4">
                  {currentClass.activities.length > 0 ? (
                    currentClass.activities.map((activity) => (
                      <div key={activity.id} className="border border-border rounded-lg p-5">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.type === "reading_comprehension" ? "bg-primary/10" : "bg-warning/10"}`}>
                            {activity.type === "reading_comprehension" ? <BookOpen className="h-5 w-5 text-primary" /> : <FileText className="h-5 w-5 text-warning" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                            <button className="btn-outline text-sm py-2">Start {activity.type === "reading_comprehension" ? "Reading" : "Assessment"}</button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No activities for this class</p>
                  )}
                </div>
              )}

              {activeTab === "supplementary" && (
                <div className="space-y-3">
                  {currentClass.supplementary.length > 0 ? (
                    currentClass.supplementary.map((item) => (
                      <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors">
                        <FileText className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.title}</p>
                          {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No supplementary materials</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
