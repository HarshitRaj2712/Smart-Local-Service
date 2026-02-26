const Hero = () => {
  return (
    <section className="bg-[#FFF0F5] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Hero Box: Maintained Blue Theme */}
        <div className="bg-[#007FFF] rounded-xl shadow-lg px-6 py-12 md:py-16 text-center text-white relative overflow-hidden">

          {/* High-Visibility Corner Shapes: Increased opacity to 20% for a stronger look */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/20 rounded-full translate-y-12 -translate-x-12"></div>

          {/* Main Heading - Original Text */}
          <h1 className="text-2xl md:text-4xl font-bold leading-tight relative z-10">
            Find Trusted Local Professionals <br />
            <span className="underline underline-offset-8 decoration-white/30">
              With Verified Trust Score
            </span>
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            {/* Button 1: White -> Blue with Sky Blue Border Hover */}
            <button className="bg-white text-[#007FFF] px-8 py-2.5 rounded-lg font-semibold border-2 border-transparent hover:bg-[#007FFF] hover:text-white hover:border-sky-300 transition-all duration-300">
              Book a Service
            </button>

            {/* Button 2: Border -> White Hover */}
            <button className="border-2 border-white text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-white hover:text-[#007FFF] transition-all duration-300">
              Become a Provider
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;