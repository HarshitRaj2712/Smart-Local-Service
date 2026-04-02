import { CheckCircle2, Search, UserCheck, CalendarCheck2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const steps = [
  {
    title: "Search by Service",
    text: "Use the providers section to filter by your required service and location, then open detailed provider profiles.",
    icon: <Search size={16} className="text-[#007FFF]" />,
  },
  {
    title: "Compare Trusted Profiles",
    text: "Review pricing, experience, availability, and ratings. Verified badges help you identify reliable professionals faster.",
    icon: <UserCheck size={16} className="text-[#007FFF]" />,
  },
  {
    title: "Book with Clear Details",
    text: "Select your preferred time, add instructions, and submit booking details so the provider can respond accurately.",
    icon: <CalendarCheck2 size={16} className="text-[#007FFF]" />,
  },
  {
    title: "Stay Protected",
    text: "Track status in your dashboard, keep communication on-platform, and report suspicious behavior to support immediately.",
    icon: <ShieldCheck size={16} className="text-[#007FFF]" />,
  },
];

const proTips = [
  "Choose providers with complete profiles and recent reviews.",
  "Compare at least 2-3 providers before final booking.",
  "Share clear job details to avoid pricing confusion.",
  "Use your booking ID when contacting support for quick help.",
];

const HowToFindAProPage = () => {
  return (
    <section className="min-h-screen bg-[#FFF0F5] px-6 py-20">
      <div className="mx-auto max-w-4xl space-y-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl bg-white p-8 shadow-sm border border-white/70"
        >
          <h1 className="text-3xl font-bold text-gray-900">How to Find and Book a Pro</h1>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            LocalTrust is built to make service discovery simple and safe. Follow this flow to find the right professional quickly.
          </p>
        </MotionDiv>

        <div className="rounded-3xl bg-white p-8 shadow-sm border border-white/70">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Step-by-step process</h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <MotionDiv
                key={step.title}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex gap-4 rounded-2xl border border-gray-100 p-4"
              >
                <div className="h-9 w-9 rounded-lg bg-[#007FFF]/10 flex items-center justify-center font-bold text-[#007FFF]">
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    {step.icon}
                    <h3 className="text-sm font-bold text-gray-800">{step.title}</h3>
                  </div>
                  <p className="mt-1 text-xs md:text-sm text-gray-500 leading-relaxed">{step.text}</p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm border border-white/70">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pro tips before confirming</h2>
          <ul className="space-y-3">
            {proTips.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle2 size={16} className="text-[#007FFF] mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HowToFindAProPage;
