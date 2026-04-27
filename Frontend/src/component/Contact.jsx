import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-(--bg-main) transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-(--text-main)">Get in Touch</h2>
          <div className="w-16 h-1.5 bg-[var(--accent)] mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-(--text-muted) max-w-xl mx-auto">
            Have questions about a provider or need help with a booking? Our team is here to support you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Information Side */}
          <div className="space-y-6">
            <div className="bg-(--bg-panel) backdrop-blur-md border border-(--border-color) p-6 rounded-3xl shadow-lg flex items-start gap-4">
              <div className="p-3 bg-[var(--accent)] text-white rounded-2xl">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-(--text-main)">Email Us</h4>
                <p className="text-(--text-muted) text-sm">support@localtrust.com</p>
              </div>
            </div>

            <div className="bg-(--bg-panel) backdrop-blur-md border border-(--border-color) p-6 rounded-3xl shadow-lg flex items-start gap-4">
              <div className="p-3 bg-[var(--accent)] text-white rounded-2xl">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-(--text-main)">Call Us</h4>
                <p className="text-(--text-muted) text-sm">+1 (555) 000-0000</p>
              </div>
            </div>

            <div className="bg-(--bg-panel) backdrop-blur-md border border-(--border-color) p-6 rounded-3xl shadow-lg flex items-start gap-4">
              <div className="p-3 bg-[var(--accent)] text-white rounded-2xl">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-(--text-main)">Office</h4>
                <p className="text-(--text-muted) text-sm">123 Trust Lane, Tech City</p>
              </div>
            </div>
          </div>

          {/* Contact Form - Large Glass Container */}
          <div className="lg:col-span-2 bg-(--bg-panel) backdrop-blur-xl border border-(--border-color) p-10 rounded-3xl shadow-2xl">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-(--text-main) mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-(--bg-surface) border border-(--border-color) focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)] outline-none transition-all text-(--text-main)"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-(--text-main) mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl bg-(--bg-surface) border border-(--border-color) focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)] outline-none transition-all text-(--text-main)"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-(--text-main) mb-2">Message</label>
                <textarea 
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl bg-(--bg-surface) border border-(--border-color) focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:var(--accent-soft)] outline-none transition-all text-(--text-main)"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button className="w-full md:w-auto bg-[var(--accent)] text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[var(--accent-hover)] hover:-translate-y-1 transition-all shadow-lg">
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;