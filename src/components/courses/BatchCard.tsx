import { BatchWithInstructor } from "@/types";
import { Calendar, Clock, Users, Video } from "lucide-react";

interface BatchCardProps {
  batch: BatchWithInstructor;
  onEnroll: (batchId: string) => void;
}

export function BatchCard({ batch, onEnroll }: BatchCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="border border-border rounded-lg p-5 bg-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-foreground mb-1">{batch.title}</h4>
          <p className="text-sm text-muted-foreground">{batch.description}</p>
        </div>
        {batch.is_live ? (
          <span className="badge-live">Live</span>
        ) : (
          <span className="badge-recorded">Self-Paced</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {formatDate(batch.start_date)} - {formatDate(batch.end_date)}
          </span>
        </div>

        {batch.schedule && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{batch.schedule}</span>
          </div>
        )}

        {batch.max_students && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Max {batch.max_students} students</span>
          </div>
        )}

        {!batch.is_live && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Video className="h-4 w-4" />
            <span>Recorded lectures</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-4 p-3 bg-surface-subtle rounded-md">
        {batch.instructor.avatar_url && (
          <img
            src={batch.instructor.avatar_url}
            alt={batch.instructor.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-sm font-medium text-foreground">{batch.instructor.name}</p>
          <p className="text-xs text-muted-foreground">{batch.instructor.qualifications[0]}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <span className="text-2xl font-semibold text-foreground">
            ₹{batch.price.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground ml-1">{batch.currency}</span>
        </div>
        <button
          onClick={() => onEnroll(batch.id)}
          className="btn-primary text-sm py-2 px-5"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}
