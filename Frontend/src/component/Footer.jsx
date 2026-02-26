import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#007FFF] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white p-1.5 rounded-lg">
                 {/* Placeholder for your LocalTrust Logo Icon */}
                <div className="w-6 h-6 bg-[#007FFF] rounded-md flex items-center justify-center font-bold text-xs">LT</div>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">LocalTrust</h2>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Connecting you with verified local professionals and simplifying service booking. Find, connect, and live better — all in one place.
            </p>
          </div>

          {/* Navigation Section */}
          <div>
            <h4 className="font-bold text-lg mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h4 className="font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li><a href="/how-to-find" className="hover:text-white transition-colors">How to Find a Pro</a></li>
              <li><a href="/how-listing-works" className="hover:text-white transition-colors">How Listing Works</a></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-sm text-white/60">
            © 2026 LocalTrust · All Rights Reserved
          </p>
          
          {/* Scroll to Top Button (As seen in Roomezy image) */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-white/10 hover:bg-white/20 p-3 rounded-xl backdrop-blur-md border border-white/20 transition-all md:relative md:bottom-0 md:right-0"
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