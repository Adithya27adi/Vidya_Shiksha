import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { getBatchWithDetails } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle } from "lucide-react";

export default function OrderPage() {
  const { batchId } = useParams<{ batchId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const batch = getBatchWithDetails(batchId!);

  if (!batch || !batch.course) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <h1 className="text-foreground mb-4">Batch Not Found</h1>
          <p className="text-muted-foreground">The selected batch doesn't exist.</p>
        </div>
      </MainLayout>
    );
  }

  if (!isAuthenticated) {
    navigate("/login", { state: { from: `/order/${batchId}` } });
    return null;
  }

  const handleConfirmOrder = () => {
    // Navigate to payment page
    navigate(`/payment/${batchId}`);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <MainLayout showFooter={false}>
      <div className="container py-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Order Summary</h1>
          <p className="text-muted-foreground mb-8">
            Review your order before proceeding to payment
          </p>

          {/* Course Info */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex gap-4">
              {batch.course.thumbnail_url && (
                <img
                  src={batch.course.thumbnail_url}
                  alt={batch.course.title}
                  className="w-32 h-20 object-cover rounded-md"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge-class">Class {batch.course.class_level}</span>
                  <span className="text-xs text-muted-foreground">{batch.course.subject}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{batch.course.title}</h3>
                <p className="text-sm text-muted-foreground">{batch.title}</p>
              </div>
            </div>
          </div>

          {/* Batch Details */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h4 className="font-medium text-foreground mb-4">Batch Details</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Batch Type</span>
                <span className="text-foreground">
                  {batch.is_live ? "Live Classes" : "Self-Paced"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start Date</span>
                <span className="text-foreground">{formatDate(batch.start_date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">End Date</span>
                <span className="text-foreground">{formatDate(batch.end_date)}</span>
              </div>
              {batch.schedule && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Schedule</span>
                  <span className="text-foreground">{batch.schedule}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Instructor</span>
                <span className="text-foreground">{batch.instructor.name}</span>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h4 className="font-medium text-foreground mb-4">What's Included</h4>
            <ul className="space-y-2">
              {[
                "Full access to all course materials",
                "Video lectures and demonstrations",
                "Practice exercises and assessments",
                "Downloadable study materials",
                batch.is_live ? "Live doubt clearing sessions" : "6 months course access",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Summary */}
          <div className="bg-surface-subtle border border-border rounded-lg p-6 mb-8">
            <h4 className="font-medium text-foreground mb-4">Price Details</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Course Price</span>
                <span className="text-foreground">₹{batch.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span className="text-foreground">Included</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-medium text-foreground">Total Amount</span>
                <span className="font-semibold text-foreground text-lg">
                  ₹{batch.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="btn-outline flex-1"
            >
              Back
            </button>
            <button
              onClick={handleConfirmOrder}
              className="btn-primary flex-1"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
