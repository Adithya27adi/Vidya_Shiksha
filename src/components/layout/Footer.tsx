import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-subtle">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-7 w-7 text-primary" />
              <span className="text-lg font-semibold text-foreground">EduLearn</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Quality education for Classes 5–12. Learn at your own pace or join live sessions.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/courses" className="text-sm text-muted-foreground hover:text-primary">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">
                  Student Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Classes</h4>
            <ul className="space-y-3">
              {[5, 6, 7, 8, 9, 10].map((grade) => (
                <li key={grade}>
                  <Link
                    to={`/courses?class=${grade}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Class {grade}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EduLearn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
