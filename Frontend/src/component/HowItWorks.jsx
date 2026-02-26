const HowItWorks = () => {
  return (
    <section id="how" className="py-20 bg-[#FFF0F5]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Section Heading with Theme Color Underline */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block">
          How It Works
          <span className="block h-1.5 w-12 bg-[#007FFF] mx-auto mt-2 rounded-full"></span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          
          {/* Glass Card 1 */}
          <div className="bg-white/30 backdrop-blur-xl border border-white/40 p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <span className="text-5xl font-black text-[#007FFF] block mb-4 ">
              01
            </span>
            <h3 className="text-xl font-bold text-[#007FFF]">Search</h3>
            <p className="mt-4 text-gray-800 font-medium leading-relaxed">
              Find trusted professionals near you.
            </p>
          </div>

          {/* Glass Card 2 */}
          <div className="bg-white/30 backdrop-blur-xl border border-white/40 p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <span className="text-5xl font-black text-[#007FFF] block mb-4 ">
              02
            </span>
            <h3 className="text-xl font-bold text-[#007FFF]">Book & Pay</h3>
            <p className="mt-4 text-gray-800 font-medium leading-relaxed">
              Secure escrow payment system protects you.
            </p>
          </div>

          {/* Glass Card 3 */}
          <div className="bg-white/30 backdrop-blur-xl border border-white/40 p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ">
            <span className="text-5xl font-black text-[#007FFF] block mb-4 ">
              03
            </span>
            <h3 className="text-xl font-bold text-[#007FFF]">Get It Done</h3>
            <p className="mt-4 text-gray-800 font-medium leading-relaxed">
              Approve work and release payment safely.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;