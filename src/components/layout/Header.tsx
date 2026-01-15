import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const publicLinks = [
    { href: "/courses", label: "Courses" },
    { href: "/about", label: "About" },
  ];

  const authLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/my-courses", label: "My Courses" },
    { href: "/profile", label: "Profile" },
  ];

  const links = isAuthenticated ? authLinks : publicLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border glass">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 transition-shadow">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">EduLearn</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="btn-outline text-sm py-2 px-4"
            >
              Logout
            </button>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2 transition-colors"
              >
                Login
              </Link>
              <Link to="/signup" className="btn-primary text-sm py-2.5 px-5">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
          <nav className="container py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium py-3 px-4 rounded-lg transition-colors ${
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border mt-3 pt-4 flex flex-col gap-3">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-outline text-sm py-2.5"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-center py-2.5 text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary text-sm py-2.5 text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}