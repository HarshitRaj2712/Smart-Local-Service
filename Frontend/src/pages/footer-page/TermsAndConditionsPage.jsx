import { FileText, UserCheck, WalletCards, AlertTriangle, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const termsSections = [
  {
    title: "1. Account Responsibilities",
    text: "Users and providers must submit accurate profile information, keep account credentials secure, and avoid unauthorized access or misuse of the platform.",
    icon: <UserCheck size={16} className="text-[#007FFF]" />,
  },
  {
    title: "2. Booking and Service Conduct",
    text: "Bookings should include valid service details and expected timelines. Providers are responsible for delivering services professionally, and users must communicate job requirements clearly.",
    icon: <FileText size={16} className="text-[#007FFF]" />,
  },
  {
    title: "3. Payments, Cancellations, and Refunds",
    text: "Applicable charges are shown at checkout. Cancellation and refund eligibility can depend on timing, booking state, and provider policy. Disputes should be reported promptly with supporting details.",
    icon: <WalletCards size={16} className="text-[#007FFF]" />,
  },
  {
    title: "4. Prohibited Activities",
    text: "Fraudulent behavior, fake reviews, abusive communication, illegal service requests, or attempts to bypass platform safety controls are strictly prohibited and may lead to account suspension.",
    icon: <AlertTriangle size={16} className="text-[#007FFF]" />,
  },
  {
    title: "5. Updates to Terms",
    text: "LocalTrust may update these terms to improve clarity, legal compliance, or platform operations. Continued use of the platform after updates means acceptance of revised terms.",
    icon: <RefreshCcw size={16} className="text-[#007FFF]" />,
  },
];

const TermsAndConditionsPage = () => {
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
          <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            By using LocalTrust, you agree to these terms that govern account usage, bookings, payments, and platform behavior.
          </p>
          <p className="mt-2 text-xs text-gray-500">Last updated: March 10, 2026</p>
        </MotionDiv>

        <div className="space-y-4">
          {termsSections.map((section) => (
            <MotionDiv
              key={section.title}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl bg-white p-6 shadow-sm border border-white/70"
            >
              <div className="flex items-center gap-2 mb-2">
                {section.icon}
                <h2 className="text-base font-bold text-gray-800">{section.title}</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{section.text}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditionsPage;
