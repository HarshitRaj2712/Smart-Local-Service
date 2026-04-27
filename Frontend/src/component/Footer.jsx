import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[var(--footer-bg)] text-[var(--footer-text)] pt-16 pb-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-[var(--footer-text)] p-1.5 rounded-lg">
                 {/* Placeholder for your LocalTrust Logo Icon */}
                <div className="w-6 h-6 bg-[var(--footer-bg)] rounded-md flex items-center justify-center font-bold text-xs">LT</div>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">LocalTrust</h2>
            </div>
            <p className="text-[color:var(--footer-muted)] text-sm leading-relaxed max-w-xs">
              Connecting you with verified local professionals and simplifying service booking. Find, connect, and live better — all in one place.
            </p>
          </div>

          {/* Navigation Section */}
          <div>
            <h4 className="font-bold text-lg mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-[color:var(--footer-muted)]">
              <li><Link to="/" className="hover:text-[var(--footer-text)] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[var(--footer-text)] transition-colors">About Us</Link></li>
              <li><Link to="/help-center" className="hover:text-[var(--footer-text)] transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h4 className="font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-[color:var(--footer-muted)]">
              <li><Link to="/how-to-find-a-pro" className="hover:text-[var(--footer-text)] transition-colors">How to Find a Pro</Link></li>
              <li><Link to="/provider-verification" className="hover:text-[var(--footer-text)] transition-colors">Provider Verification</Link></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-[color:var(--footer-muted)]">
              <li><Link to="/privacy-policy" className="hover:text-[var(--footer-text)] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-[var(--footer-text)] transition-colors">Terms and Conditions</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[color:var(--footer-muted)]/15 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-sm text-[color:var(--footer-muted)]/80">
            © 2026 LocalTrust · All Rights Reserved
          </p>
          
          {/* Scroll to Top Button (As seen in Roomezy image) */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-[color:rgba(255,255,255,0.10)] hover:bg-[color:rgba(255,255,255,0.18)] p-3 rounded-xl backdrop-blur-md border border-[color:rgba(255,255,255,0.18)] transition-all md:relative md:bottom-0 md:right-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;