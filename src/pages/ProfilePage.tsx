import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { getOrdersWithDetails } from "@/data/mockData";
import { User, MapPin, Phone, Mail, GraduationCap, CreditCard, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user } = useAuth();
  const orders = getOrdersWithDetails("user-1");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    grade: user?.grade || "",
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleSave = () => {
    // In a real app, this would update the user profile
    console.log("Saving profile:", formData);
    setIsEditOpen(false);
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-foreground mb-8">My Profile</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex flex-col items-center text-center mb-6">
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                )}
                <h2 className="text-xl font-semibold text-foreground">
                  {user?.first_name} {user?.last_name}
                </h2>
                <p className="text-muted-foreground">Student</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">Class {user?.grade}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">{user?.location}</span>
                </div>
                {user?.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">student@example.com</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-6"
                onClick={() => setIsEditOpen(true)}
              >
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Purchase History */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Purchase History
              </h3>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-border rounded-lg p-4"
                    >
                      <div className="flex items-start gap-4">
                        {order.course.thumbnail_url && (
                          <img
                            src={order.course.thumbnail_url}
                            alt={order.course.title}
                            className="w-20 h-14 object-cover rounded hidden sm:block"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-foreground truncate">
                              {order.course.title}
                            </h4>
                            <span className="text-foreground font-semibold ml-4">
                              ₹{order.amount.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {order.batch.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            <span>Order ID: {order.id}</span>
                            <span>Date: {formatDate(order.created_at)}</span>
                            {order.payment && (
                              <span className="flex items-center gap-1 text-success">
                                <CheckCircle className="h-3 w-3" />
                                Paid via {order.payment.method.toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No purchase history yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Class/Grade</Label>
              <Input
                id="grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}