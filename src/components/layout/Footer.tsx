import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-gray-300">
      <div className="container py-12">
        {/* Main Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Vidya Shiksha Academy */}
          <div>
            <h4 className="text-white font-semibold mb-4">Vidya Shiksha Academy</h4>
            <ul className="space-y-2.5">
              <li><Link to="/courses" className="text-sm hover:text-white transition-colors">All Courses</Link></li>
              <li><Link to="/courses?mode=live" className="text-sm hover:text-white transition-colors">Live Classes</Link></li>
              <li><Link to="/courses?mode=self-paced" className="text-sm hover:text-white transition-colors">Self-Paced Learning</Link></li>
              <li><Link to="/courses" className="text-sm hover:text-white transition-colors">Free Courses</Link></li>
              <li><Link to="/courses" className="text-sm hover:text-white transition-colors">Study Materials</Link></li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-white font-semibold mb-4">About Us</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-sm hover:text-white transition-colors">About Us</Link></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h4 className="text-white font-semibold mb-4">Classes</h4>
            <ul className="space-y-2.5">
              {[5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                <li key={grade}>
                  <Link to={`/courses?class=${grade}`} className="text-sm hover:text-white transition-colors">
                    Class {grade} Courses
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-white font-semibold mb-4">Subjects</h4>
            <ul className="space-y-2.5">
              <li><Link to="/courses?subject=mathematics" className="text-sm hover:text-white transition-colors">Mathematics</Link></li>
              <li><Link to="/courses?subject=science" className="text-sm hover:text-white transition-colors">Science</Link></li>
              <li><Link to="/courses?subject=english" className="text-sm hover:text-white transition-colors">English</Link></li>
              <li><Link to="/courses?subject=hindi" className="text-sm hover:text-white transition-colors">Hindi</Link></li>
              <li><Link to="/courses?subject=social" className="text-sm hover:text-white transition-colors">Social Science</Link></li>
              <li><Link to="/courses?subject=computer" className="text-sm hover:text-white transition-colors">Computer Science</Link></li>
            </ul>
          </div>

          {/* Board Exams */}
          <div>
            <h4 className="text-white font-semibold mb-4">Board Exams</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm hover:text-white transition-colors">CBSE Board</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">ICSE Board</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">State Boards</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Board Exam Tips</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Sample Papers</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Previous Years</a></li>
            </ul>
          </div>

          {/* Free Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Free Resources</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Free Video Lessons</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Free Practice Tests</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Free Study Notes</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Free Worksheets</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Free Doubt Solving</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-white font-semibold">Vidya Shiksha</span>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Vidya Shiksha. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}