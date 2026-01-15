import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { getBatchWithDetails } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { CreditCard, Smartphone, Building2, Wallet, CheckCircle, Lock } from "lucide-react";

type PaymentMethod = "card" | "upi" | "netbanking" | "wallet";

export default function PaymentPage() {
  const { batchId } = useParams<{ batchId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, setPendingEnrollment } = useAuth();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("upi");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

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
    navigate("/login", { state: { from: `/payment/${batchId}` } });
    return null;
  }

  const handlePayment = async () => {
    setProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setProcessing(false);
    setSuccess(true);
    setPendingEnrollment(null);

    // Redirect to dashboard after showing success
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const paymentMethods = [
    { id: "upi" as PaymentMethod, label: "UPI", icon: Smartphone, description: "Pay using any UPI app" },
    { id: "card" as PaymentMethod, label: "Card", icon: CreditCard, description: "Credit or Debit Card" },
    { id: "netbanking" as PaymentMethod, label: "Net Banking", icon: Building2, description: "All major banks" },
    { id: "wallet" as PaymentMethod, label: "Wallet", icon: Wallet, description: "Paytm, PhonePe, etc." },
  ];

  if (success) {
    return (
      <MainLayout showFooter={false}>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground mb-4">
              You have successfully enrolled in {batch.course.title}.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to your dashboard...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout showFooter={false}>
      <div className="container py-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Payment</h1>
          <p className="text-muted-foreground mb-8">
            Complete your payment to start learning
          </p>

          <div className="grid md:grid-cols-5 gap-6">
            {/* Payment Methods */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-medium text-foreground">Select Payment Method</h4>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 border rounded-lg transition-colors ${
                      selectedMethod === method.id
                        ? "border-primary bg-accent"
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedMethod === method.id ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <method.icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">{method.label}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Payment Form based on method */}
              <div className="bg-card border border-border rounded-lg p-6 mt-6">
                {selectedMethod === "upi" && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="form-input"
                    />
                  </div>
                )}

                {selectedMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="form-input"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Expiry
                        </label>
                        <input type="text" placeholder="MM/YY" className="form-input" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          CVV
                        </label>
                        <input type="text" placeholder="123" className="form-input" />
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === "netbanking" && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Select Bank
                    </label>
                    <select className="form-input">
                      <option value="">Choose your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="kotak">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {selectedMethod === "wallet" && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Select Wallet
                    </label>
                    <select className="form-input">
                      <option value="">Choose wallet</option>
                      <option value="paytm">Paytm</option>
                      <option value="phonepe">PhonePe</option>
                      <option value="amazonpay">Amazon Pay</option>
                      <option value="mobikwik">MobiKwik</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-2">
              <div className="bg-surface-subtle border border-border rounded-lg p-5 sticky top-24">
                <h4 className="font-medium text-foreground mb-4">Order Summary</h4>

                <div className="flex gap-3 mb-4 pb-4 border-b border-border">
                  {batch.course.thumbnail_url && (
                    <img
                      src={batch.course.thumbnail_url}
                      alt={batch.course.title}
                      className="w-16 h-10 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {batch.course.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{batch.title}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{batch.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="text-foreground">Included</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="font-semibold text-foreground">
                      ₹{batch.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="btn-primary w-full"
                >
                  {processing ? "Processing..." : `Pay ₹${batch.price.toLocaleString()}`}
                </button>

                <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
