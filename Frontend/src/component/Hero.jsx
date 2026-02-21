const Hero = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
          Find Trusted Local Professionals <br />
          <span className="text-blue-600">With Verified Trust Score</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with verified electricians, plumbers, and service providers 
          near you. Transparent reviews. Secure payments. Zero fraud.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Book a Service
          </button>

          <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            Become a Provider
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;