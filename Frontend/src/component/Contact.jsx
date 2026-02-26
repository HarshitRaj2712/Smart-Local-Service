import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-[#FFF0F5]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Get in Touch</h2>
          <div className="w-16 h-1.5 bg-[#007FFF] mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-xl mx-auto">
            Have questions about a provider or need help with a booking? Our team is here to support you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Information Side */}
          <div className="space-y-6">
            <div className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-lg flex items-start gap-4">
              <div className="p-3 bg-[#007FFF] text-white rounded-2xl">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Email Us</h4>
                <p className="text-gray-600 text-sm">support@localtrust.com</p>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-lg flex items-start gap-4">
              <div className="p-3 bg-[#007FFF] text-white rounded-2xl">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Call Us</h4>
                <p className="text-gray-600 text-sm">+1 (555) 000-0000</p>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-lg flex items-start gap-4">
              <div className="p-3 bg-[#007FFF] text-white rounded-2xl">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Office</h4>
                <p className="text-gray-600 text-sm">123 Trust Lane, Tech City</p>
              </div>
            </div>
          </div>

          {/* Contact Form - Large Glass Container */}
          <div className="lg:col-span-2 bg-white/40 backdrop-blur-xl border border-white/60 p-10 rounded-3xl shadow-2xl">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/80 focus:border-[#007FFF] focus:ring-2 focus:ring-[#007FFF]/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/80 focus:border-[#007FFF] focus:ring-2 focus:ring-[#007FFF]/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea 
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/80 focus:border-[#007FFF] focus:ring-2 focus:ring-[#007FFF]/20 outline-none transition-all"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button className="w-full md:w-auto bg-[#007FFF] text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#005fcc] hover:-translate-y-1 transition-all shadow-lg shadow-[#007FFF]/20">
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