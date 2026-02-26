import { ShieldCheck, Users, Clock, Star } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <ShieldCheck size={40} />,
      title: "Verified Providers",
      description:
        "All service providers are verified to ensure trust and reliability.",
    },
    {
      icon: <Users size={40} />,
      title: "Easy Booking",
      description:
        "Book trusted professionals in just a few clicks with real-time availability.",
    },
    {
      icon: <Clock size={40} />,
      title: "Fast & Reliable",
      description:
        "Quick response time and reliable services at your convenience.",
    },
    {
      icon: <Star size={40} />,
      title: "Top Rated Services",
      description:
        "Choose from highly rated professionals based on real customer reviews.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-[#FFF0F5]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Section Heading with Theme Underline */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Why Choose LocalTrust?
        </h2>
        <div className="w-16 h-1 bg-[#007FFF] mx-auto mb-6 rounded-full"></div>
        
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto font-medium">
          We connect you with trusted local service providers quickly and securely.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/40 backdrop-blur-md border border-white/60 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              {/* Icon Container with Theme Color */}
              <div className="flex justify-center mb-6 text-[#007FFF] group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-[#007FFF] transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;