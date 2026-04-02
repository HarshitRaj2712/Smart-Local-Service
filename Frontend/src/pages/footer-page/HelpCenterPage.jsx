import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Home,
  Clock,
  ShieldCheck,
  CreditCard,
  UserPlus
} from "lucide-react";

const MotionSection = motion.section;
const MotionDiv = motion.div;

const HelpCenterPage = () => {
  const [activeCategory, setActiveCategory] = useState("Booking");
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    "Booking",
    "Pricing",
    "Account",
    "Communication",
    "Trust & Safety",
    "Billing",
  ];

  const faqByCategory = {
    Booking: [
      {
        q: "How do I book a service on LocalTrust?",
        a: "Go to the providers page, choose a service provider, and click Book Now. Select your date and time, add details, and submit your booking request.",
      },
      {
        q: "Can I reschedule or cancel my booking?",
        a: "Yes. Open User Dashboard > My Bookings and choose reschedule or cancel. Cancellation terms may vary depending on provider policy and booking status.",
      },
      {
        q: "Where can I track booking status?",
        a: "You can track pending, accepted, completed, or cancelled bookings from your User Dashboard in real time.",
      },
      {
        q: "What happens after a provider accepts my request?",
        a: "You receive an in-app update, and the booking moves to confirmed status. You can then manage communication and service details from your dashboard.",
      },
    ],
    Pricing: [
      {
        q: "Are service prices fixed or set by providers?",
        a: "Prices are generally set by individual providers based on their experience, service type, and location. You can compare pricing on provider profiles before booking.",
      },
      {
        q: "Do I pay any platform fee as a customer?",
        a: "LocalTrust aims to keep pricing transparent. If any platform or convenience fee applies, it is shown clearly during checkout before you confirm payment.",
      },
      {
        q: "Can providers update their service pricing?",
        a: "Yes. Providers can update rates from their provider dashboard and profile setup, and updated prices apply to new bookings.",
      },
      {
        q: "Do I get an estimate before placing a booking?",
        a: "Yes. You can review the visible service price and booking details before final confirmation.",
      },
    ],
    Account: [
      {
        q: "How do I create an account?",
        a: "Use the Sign Up page, provide your details, verify your email, and then log in to access booking and dashboard features.",
      },
      {
        q: "I forgot my password. How can I reset it?",
        a: "Click Forgot Password on the login page. You will receive a reset link by email to set a new password securely.",
      },
      {
        q: "Can I switch between user and provider roles?",
        a: "You can register as a provider by completing provider profile setup. Role-based access then unlocks provider dashboard features.",
      },
      {
        q: "Why is email verification required?",
        a: "Email verification helps secure accounts, reduce fraud, and ensure important booking notifications reach you.",
      },
    ],
    Communication: [
      {
        q: "How will I receive booking updates?",
        a: "Booking updates are sent through platform notifications and to your registered email for important status changes.",
      },
      {
        q: "How do I contact support quickly?",
        a: "Use support@localtrust.com with your booking ID for fastest help. You can also use the forum or phone support for guidance.",
      },
      {
        q: "Can I contact providers before confirming a service?",
        a: "Provider profile information helps you evaluate services. Once booked, coordination details are managed through the platform flow.",
      },
      {
        q: "Why didn't I receive a notification email?",
        a: "Check spam/promotions, confirm your account email is verified, and ensure your mailbox is not full. Then try again from your dashboard.",
      },
    ],
    "Trust & Safety": [
      {
        q: "How are providers verified on LocalTrust?",
        a: "Providers go through profile and identity checks before appearing publicly. Verified badges indicate completed verification steps.",
      },
      {
        q: "Can I report suspicious behavior?",
        a: "Yes. Contact support immediately with booking details and screenshots if needed. We investigate and take action quickly.",
      },
      {
        q: "How do reviews improve safety?",
        a: "User reviews and ratings help highlight reliable providers and maintain service quality standards across the platform.",
      },
      {
        q: "Is my personal data secure?",
        a: "The platform uses authenticated access and protected APIs. We recommend strong passwords and verified emails for additional account safety.",
      },
    ],
    Billing: [
      {
        q: "What payment methods are supported?",
        a: "Supported payment methods are displayed during checkout. Available options may vary by service type and region.",
      },
      {
        q: "Where can I view my payment history?",
        a: "You can check booking and payment-related details in your dashboard under bookings and account activity.",
      },
      {
        q: "How are refunds handled for cancelled bookings?",
        a: "Refund eligibility depends on cancellation timing and provider policy. If approved, refunds are processed to your original payment method.",
      },
      {
        q: "Who should I contact for a failed payment?",
        a: "First retry with a stable network and valid payment details. If it still fails, contact support with timestamp and booking context.",
      },
    ],
  };

  const faqs = faqByCategory[activeCategory];

  return (
    <div className="min-h-screen bg-[#FFF0F5] ">
      {/* --- HEADER SECTION --- */}
      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pt-20 pb-12 px-6 text-center"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm mb-4 text-[#007FFF]">
          <HelpCircle size={28} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          LocalTrust Help Center
        </h1>
        <p className="mt-3 text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Your guide to finding, booking, and managing local services with confidence. 
          Explore guides, FAQs, and connect with our support team.
        </p>
      </MotionSection>

      <div className="max-w-4xl mx-auto px-6 space-y-10 pb-24">
        
        {/* --- QUICK ACTIONS --- */}
        <div className="grid md:grid-cols-2 gap-4">
          <QuickActionCard 
            icon={<Zap size={20} className="text-[#007FFF]" />} 
            title="How to Book a Service" 
            desc="Step-by-step guide to finding your first expert."
          />
          <QuickActionCard 
            icon={<Home size={20} className="text-[#007FFF]" />} 
            title="Manage Your Bookings" 
            desc="View, reschedule, or cancel your active requests."
          />
        </div>

        {/* --- SEARCH & CATEGORIES --- */}
        <div className="bg-white rounded-4xl p-8 shadow-sm border border-white/50">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search for topics, questions, or keywords..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#FFF0F5]/50 border border-gray-100 focus:outline-none focus:border-[#007FFF]/30 text-sm font-medium"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenFaq(null);
                }}
                className={`px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat ? "bg-[#007FFF] text-white shadow-lg shadow-[#007FFF]/20" : "bg-white border border-gray-100 text-gray-400 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- FAQ SECTION --- */}
        <div className="bg-white rounded-4xl p-8 shadow-sm border border-white/50">
          <div className="flex items-center gap-3 mb-8">
             <div className="p-2 bg-[#007FFF]/10 rounded-lg text-[#007FFF]">
                <ShieldCheck size={20} />
             </div>
             <h2 className="text-xl font-bold text-gray-800">{activeCategory} FAQs</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <MotionDiv
                key={index}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
                className="border-b border-gray-50 last:border-0 pb-4 last:pb-0"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between py-2 text-left group"
                >
                  <span className="text-sm font-bold text-gray-700 group-hover:text-[#007FFF] transition-colors">{faq.q}</span>
                  {openFaq === index ? <ChevronUp size={18} className="text-[#007FFF]" /> : <ChevronDown size={18} className="text-gray-400" />}
                </button>
                {openFaq === index && (
                  <div className="mt-3 text-xs md:text-sm text-gray-500 leading-relaxed font-medium animate-in fade-in slide-in-from-top-2">
                    {faq.a}
                  </div>
                )}
              </MotionDiv>
            ))}
          </div>
        </div>

        {/* --- CONTACT SECTION --- */}
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Still Need Help?</h2>
            <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">Our support team is just a click away</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
             <ContactCard icon={<Mail size={20} />} title="Email Support" value="support@localtrust.com" />
             <ContactCard icon={<MessageCircle size={20} />} title="Community Forum" value="Join the Discord" />
             <ContactCard icon={<Phone size={20} />} title="Phone Support" value="+1-800-TRUST" />
          </div>

          <div className="bg-white/50 rounded-2xl p-6 border border-white text-left">
             <div className="flex items-center gap-2 text-[#007FFF] mb-2 font-bold text-xs uppercase tracking-widest">
                <Clock size={14} /> Support Hours & Tips
             </div>
             <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
               Our team is available Monday–Friday, 9 AM – 6 PM IST. We typically respond within 24 hours. For faster help, please include your booking ID or provider name in your query.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

/* --- Helper Components --- */
const QuickActionCard = ({ icon, title, desc }) => (
  <MotionDiv
    whileHover={{ y: -3 }}
    transition={{ duration: 0.2 }}
    className="bg-white p-6 rounded-[28px] border border-white shadow-sm hover:shadow-md transition-all flex items-center gap-5 group cursor-pointer"
  >
    <div className="p-4 bg-[#FFF0F5] rounded-2xl group-hover:bg-[#007FFF]/10 transition-colors">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-bold text-gray-800">{title}</h3>
      <p className="text-[11px] text-gray-400 font-medium mt-0.5">{desc}</p>
    </div>
  </MotionDiv>
);

const ContactCard = ({ icon, title, value }) => (
  <MotionDiv
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
    className="bg-white p-6 rounded-[28px] border border-white shadow-sm text-center space-y-2 hover:-translate-y-1 transition-transform"
  >
    <div className="text-[#007FFF] flex justify-center">{icon}</div>
    <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">{title}</h3>
    <p className="text-[11px] font-bold text-[#007FFF]">{value}</p>
  </MotionDiv>
);

export default HelpCenterPage;