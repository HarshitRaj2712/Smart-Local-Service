const HowItWorks = () => {
  return (
    <section id="how" className="py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold text-gray-800">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mt-12">
          
          <div>
            <h3 className="text-xl font-semibold">1. Search</h3>
            <p className="mt-3 text-gray-600">
              Find trusted professionals near you.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">2. Book & Pay</h3>
            <p className="mt-3 text-gray-600">
              Secure escrow payment system protects you.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">3. Get It Done</h3>
            <p className="mt-3 text-gray-600">
              Approve work and release payment safely.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;