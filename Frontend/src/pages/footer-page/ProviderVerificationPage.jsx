import React from "react";
import { ShieldCheck, FileCheck2, BadgeCheck, Star, SearchCheck, BellRing } from "lucide-react";

const steps = [
  {
    title: "Profile Submission",
    desc: "Providers complete profile setup with service category, experience, location, and contact details.",
    icon: <FileCheck2 size={18} className="text-[#007FFF]" />,
  },
  {
    title: "Identity & Skill Review",
    desc: "Our team reviews submitted verification details and checks profile quality before approval.",
    icon: <SearchCheck size={18} className="text-[#007FFF]" />,
  },
  {
    title: "Verified Badge Activation",
    desc: "Approved providers receive a verified badge so users can identify trusted professionals quickly.",
    icon: <BadgeCheck size={18} className="text-[#007FFF]" />,
  },
  {
    title: "Ongoing Quality Monitoring",
    desc: "Ratings, reviews, and booking performance help maintain quality and trust across the platform.",
    icon: <Star size={18} className="text-[#007FFF]" />,
  },
];

const ProviderVerificationPage = () => {
  return (
    <section className="min-h-screen bg-[#FFF0F5] px-6 py-20">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm text-[#007FFF] mb-4">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">Provider Verification</h1>
          <p className="mt-3 text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Trust is at the core of LocalTrust. Our verification process is designed to help users discover reliable professionals with confidence.
          </p>
        </div>

        <div className="bg-white rounded-4xl p-8 shadow-sm border border-white/50">
          <h2 className="text-xl font-bold text-gray-800 mb-2">How verification works</h2>
          <p className="text-sm text-gray-500 mb-8">
            Every provider goes through these quality checkpoints before and after joining the platform.
          </p>

          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="flex items-start gap-4 rounded-2xl border border-gray-100 p-4 hover:border-[#007FFF]/30 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#007FFF]/10 font-bold text-[#007FFF]">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {step.icon}
                    <h3 className="text-sm font-bold text-gray-800">{step.title}</h3>
                  </div>
                  <p className="mt-1 text-xs md:text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-white shadow-sm">
          <div className="flex items-center gap-2 text-[#007FFF] mb-2 font-bold text-xs uppercase tracking-widest">
            <BellRing size={14} /> Safety Reminder
          </div>
          <p className="text-[12px] text-gray-500 leading-relaxed font-medium">
            Always review provider profiles, ratings, and completed job history before confirming a booking. If you notice suspicious activity, contact support immediately from the Help Center.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProviderVerificationPage;
