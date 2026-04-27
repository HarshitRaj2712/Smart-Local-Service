import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <section id="how" className="py-20 bg-(--bg-main) transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Section Heading with Theme Color Underline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-(--text-main) relative inline-block"
        >
          How It Works
          <span className="block h-1.5 w-12 bg-[var(--accent)] mx-auto mt-2 rounded-full"></span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          
          {/* Glass Card 1 */}
          <div className="bg-(--bg-panel) backdrop-blur-xl border border-(--border-color) p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <span className="text-5xl font-black text-[var(--accent)] block mb-4 ">
              01
            </span>
            <h3 className="text-xl font-bold text-[var(--accent)]">Search</h3>
            <p className="mt-4 text-(--text-main) font-medium leading-relaxed">
              Find trusted professionals near you.
            </p>
          </div>

          {/* Glass Card 2 */}
          <div className="bg-(--bg-panel) backdrop-blur-xl border border-(--border-color) p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <span className="text-5xl font-black text-[var(--accent)] block mb-4 ">
              02
            </span>
            <h3 className="text-xl font-bold text-[var(--accent)]">Book & Pay</h3>
            <p className="mt-4 text-(--text-main) font-medium leading-relaxed">
              Secure escrow payment system protects you.
            </p>
          </div>

          {/* Glass Card 3 */}
          <div className="bg-(--bg-panel) backdrop-blur-xl border border-(--border-color) p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ">
            <span className="text-5xl font-black text-[var(--accent)] block mb-4 ">
              03
            </span>
            <h3 className="text-xl font-bold text-[var(--accent)]">Get It Done</h3>
            <p className="mt-4 text-(--text-main) font-medium leading-relaxed">
              Approve work and release payment safely.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;