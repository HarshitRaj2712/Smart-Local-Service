import React from "react";
import { 
  Compass, 
  Lightbulb, 
  Code2, 
  Users2, 
  Github, 
  Linkedin, 
  Globe, 
  Mail,
  User,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const stats = [
  { label: "100%", sub: "User Focused", icon: <Users size={20} className="text-[#007FFF]" /> },
  { label: "Verified", sub: "Secure Platform", icon: <ShieldCheck size={20} className="text-[#007FFF]" /> },
  { label: "Cutting Edge", sub: "Modern Tech", icon: <Zap size={20} className="text-[#007FFF]" /> },
  { label: "Growing", sub: "Community Driven", icon: <TrendingUp size={20} className="text-[#007FFF]" /> },
];

const journeySteps = [
  {
    title: "Problem Discovery",
    tag: "The Struggle",
    text: "Users often spend hours trying to find reliable local professionals. The process is slow, uncertain, and stressful.",
    icon: <Compass size={18} />,
    color: "bg-pink-500"
  },
  {
    title: "Vision Crafting",
    tag: "The Purpose",
    text: "The goal became clear: build a trusted place where people can find verified experts quickly and confidently.",
    icon: <Lightbulb size={18} />,
    color: "bg-indigo-500"
  },
  {
    title: "Solution Development",
    tag: "The Build",
    text: "LocalTrust was designed around verification, clean booking flows, and a user-first experience.",
    icon: <Code2 size={18} />,
    color: "bg-emerald-500"
  },
  {
    title: "Community Growth",
    tag: "The Future",
    text: "With real feedback and improvements, the platform keeps becoming faster, safer, and more reliable.",
    icon: <Users2 size={18} />,
    color: "bg-orange-500"
  },
];

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF0F5] py-12 px-4 ">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* --- BACK BUTTON --- */}
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>

        {/* --- HERO SECTION --- */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-4"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-white border border-[#007FFF]/10 text-[#007FFF] text-[10px] font-bold uppercase tracking-[0.2em]">
            About Roomezy
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight leading-tight">
            Redefining <span className="text-[#007FFF]">Local Service</span> Discovery
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Where modern technology meets communal trust. We make finding local experts simple, safe, and transparent.
          </p>
        </MotionDiv>

        {/* --- MEET THE CREATOR --- */}
        <div className="text-center">
           <h2 className="text-xl font-bold text-gray-800 mb-8">Meet the Creator</h2>
           <div className="relative inline-block group mb-6">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-2xl overflow-hidden mx-auto ring-8 ring-white/30">
                <img src="https://via.placeholder.com/150" alt="Harshit" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-1 right-1 bg-white p-2.5 rounded-full shadow-lg border border-gray-100 text-[#007FFF]">
                <User size={18} fill="currentColor" />
              </div>
           </div>
           <h3 className="text-xl font-bold text-gray-800 tracking-tight">Harshit</h3>
           <p className="text-[10px] font-bold text-[#007FFF] uppercase tracking-[0.2em] mt-1 mb-6">Full Stack Developer & Creator</p>
           
           <div className="bg-white/70 backdrop-blur-xl border border-white p-6 rounded-[28px] shadow-sm max-w-2xl mx-auto">
             <p className="text-sm text-gray-600 leading-relaxed font-medium">
               "I created Roomezy to solve one practical problem: finding dependable professionals should feel easy, not risky. This platform is built to reduce guesswork and improve trust."
             </p>
           </div>

           <div className="mt-8 flex justify-center gap-4">
              <SocialBtn icon={<Github size={16} />} label="GitHub" />
              <SocialBtn icon={<Linkedin size={16} />} label="LinkedIn" />
              <SocialBtn icon={<Globe size={16} />} label="Portfolio" />
              <SocialBtn icon={<Mail size={16} />} label="Email" />
           </div>
        </div>

        {/* --- STATS BADGES (THE 4 BOXES) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <MotionDiv
              key={i}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white/80 backdrop-blur-md border border-white p-6 rounded-3xl shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <div className="bg-[#007FFF]/5 w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4 italic">
                {s.icon}
              </div>
              <h4 className="text-lg font-bold text-gray-800">{s.label}</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{s.sub}</p>
            </MotionDiv>
          ))}
        </div>

        {/* --- EVOLUTION OF AN IDEA (TIMELINE) --- */}
        <div className="pt-10">
          <div className="text-center mb-12">
             <span className="bg-white px-4 py-1 rounded-full text-[10px] font-bold text-[#007FFF] border border-[#007FFF]/10 shadow-sm uppercase tracking-widest">Roadmap</span>
             <h2 className="text-3xl font-bold text-gray-800 mt-4 tracking-tight">The Evolution of an Idea</h2>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto relative before:absolute before:left-8 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
            {journeySteps.map((step, idx) => (
              <div key={idx} className="relative pl-16 group">
                <div className={`absolute left-5 top-2 w-6 h-6 rounded-full border-4 border-white shadow-md ${step.color} z-10 group-hover:scale-110 transition-transform`}></div>
                <div className="bg-white p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`p-2 rounded-lg ${step.color} text-white`}>{step.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">{step.title}</h4>
                      <p className="text-[9px] font-bold text-[#007FFF] uppercase tracking-widest">{step.tag}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- TECH STACK --- */}
        <div className="bg-white/80 backdrop-blur-md border border-white p-8 rounded-[28px] shadow-sm text-center">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">Modern Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["React", "Node.js", "Express", "MongoDB", "Tailwind", "Redux", "Cloudinary", "JWT Auth"].map(t => (
              <div key={t} className="py-3 bg-white border border-gray-100 rounded-xl text-[11px] font-bold text-gray-600 shadow-sm hover:border-[#007FFF]/30 transition-colors">
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* --- CTA --- */}
        <div className="bg-[#007FFF] p-10 rounded-4xl text-center shadow-2xl shadow-[#007FFF]/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
            <Sparkles size={100} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight relative z-10">Ready to Find Your Match?</h2>
          <p className="text-white/70 text-xs mt-2 mb-8 relative z-10">Join Roomezy today and explore trusted local services.</p>
          <button onClick={() => navigate("/signup")} className="bg-white text-[#007FFF] px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all relative z-10">
            Get Started <ChevronRight size={14} className="inline ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
};

/* --- Helper Social Link --- */
const SocialBtn = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100 text-[10px] font-bold text-gray-500 hover:text-[#007FFF] hover:shadow-md transition-all uppercase tracking-widest">
    {icon} {label}
  </button>
);

export default AboutPage;