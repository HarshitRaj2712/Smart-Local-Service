import { LockKeyhole, Database, ShieldCheck, Mail } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Information We Collect",
    points: [
      "Account details such as name, email, phone number, and role (user/provider).",
      "Booking information including service request details, date/time, and status history.",
      "Provider profile information, verification data, and service category details.",
      "Technical usage data for analytics, security monitoring, and performance improvements.",
    ],
    icon: <Database size={16} className="text-[#007FFF]" />,
  },
  {
    title: "2. How We Use Data",
    points: [
      "To create and manage accounts, bookings, and provider interactions.",
      "To verify providers and improve trust and safety on the platform.",
      "To send important updates like booking confirmations, cancellations, or password reset links.",
      "To detect abuse, prevent fraud, and maintain secure platform operations.",
    ],
    icon: <ShieldCheck size={16} className="text-[#007FFF]" />,
  },
  {
    title: "3. Data Protection and Retention",
    points: [
      "We use secure authentication and protected API access controls.",
      "Personal data is retained only as long as required for service operation, compliance, and support.",
      "We do not sell personal information to third-party advertisers.",
      "Users can request account-related help through our support channels.",
    ],
    icon: <LockKeyhole size={16} className="text-[#007FFF]" />,
  },
];

const PrivacyPolicyPage = () => {
  return (
    <section className="min-h-screen bg-[#FFF0F5] px-6 py-20">
      <div className="mx-auto max-w-4xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl bg-white p-8 shadow-sm border border-white/70"
        >
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            This policy explains how LocalTrust collects, uses, and protects your data when you use our services.
          </p>
          <p className="mt-2 text-xs text-gray-500">Last updated: March 10, 2026</p>
        </motion.div>

        {sections.map((section) => (
          <motion.div
            key={section.title}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl bg-white p-8 shadow-sm border border-white/70"
          >
            <div className="flex items-center gap-2 mb-4">
              {section.icon}
              <h2 className="text-lg font-bold text-gray-800">{section.title}</h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed list-disc pl-5">
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </motion.div>
        ))}

        <div className="rounded-3xl bg-white p-8 shadow-sm border border-white/70">
          <div className="flex items-center gap-2 mb-2 text-[#007FFF]">
            <Mail size={16} />
            <h2 className="text-sm font-bold uppercase tracking-widest">Contact for Privacy Queries</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            For privacy-related requests or account concerns, contact us at support@localtrust.com with your registered email and booking context (if applicable).
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
