import React, { useState } from "react";
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
  Users,
  Server,
  Database,
  Cloud,
  GitBranch,
  Rocket,
  Layers,
  Lock
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
    text: "People often spend hours searching for dependable local professionals. The process is slow, uncertain, and stressful.",
    icon: <Compass size={18} />,
    color: "bg-pink-500"
  },
  {
    title: "Vision Crafting",
    tag: "The Purpose",
    text: "The vision became clear: create a trusted place where people can find verified experts quickly and confidently.",
    icon: <Lightbulb size={18} />,
    color: "bg-indigo-500"
  },
  {
    title: "Solution Development",
    tag: "The Build",
    text: "Smart Local Trust was designed around verification, clean booking flows, and a user-first experience.",
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

const techStack = [
  {
    name: "React",
    role: "Frontend",
    description: "Builds responsive, component-driven experiences with smooth UI updates.",
    icon: <Code2 size={18} />,
    accent: "from-sky-500 to-cyan-400",
    glow: "shadow-sky-200/70"
  },
  {
    name: "Redux",
    role: "State Layer",
    description: "Keeps auth, bookings, and notifications predictable across the app.",
    icon: <Layers size={18} />,
    accent: "from-indigo-500 to-blue-500",
    glow: "shadow-indigo-200/70"
  },
  {
    name: "Node.js",
    role: "Runtime",
    description: "Powers performant backend APIs and real-time flows for chat and updates.",
    icon: <Server size={18} />,
    accent: "from-emerald-500 to-teal-400",
    glow: "shadow-emerald-200/70"
  },
  {
    name: "Express",
    role: "API Engine",
    description: "Delivers secure routing, middleware layers, and clean service endpoints.",
    icon: <GitBranch size={18} />,
    accent: "from-orange-500 to-amber-400",
    glow: "shadow-orange-200/70"
  },
  {
    name: "MongoDB",
    role: "Database",
    description: "Stores users, providers, bookings, and reviews with flexible schemas.",
    icon: <Database size={18} />,
    accent: "from-lime-500 to-green-400",
    glow: "shadow-lime-200/70"
  },
  {
    name: "Cloudinary",
    role: "Media CDN",
    description: "Handles profile images and uploads with optimized cloud delivery.",
    icon: <Cloud size={18} />,
    accent: "from-blue-500 to-sky-400",
    glow: "shadow-blue-200/70"
  },
  {
    name: "JWT Auth",
    role: "Security",
    description: "Protects sessions and role-based routes with secure token auth.",
    icon: <Lock size={18} />,
    accent: "from-rose-500 to-pink-400",
    glow: "shadow-rose-200/70"
  },
  {
    name: "Socket Layer",
    role: "Real-Time",
    description: "Supports instant chat and live notification events for users.",
    icon: <Rocket size={18} />,
    accent: "from-violet-500 to-fuchsia-400",
    glow: "shadow-violet-200/70"
  },
];

const AboutPage = () => {
  const navigate = useNavigate();
  const [activeTech, setActiveTech] = useState(techStack[0]);

  return (
    <div className="min-h-screen bg-[#FFF0F5] py-12 px-4">

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
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
            About Smart Local Trust
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
                <img src="https://api.dicebear.com/9.x/notionists/svg?seed=SmartLocalTrust" alt="Creator avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-1 right-1 bg-white p-2.5 rounded-full shadow-lg border border-gray-100 text-[#007FFF]">
                <User size={18} fill="currentColor" />
              </div>
           </div>
           <h3 className="text-xl font-bold text-gray-800 tracking-tight">Harshit</h3>
           <p className="text-[10px] font-bold text-[#007FFF] uppercase tracking-[0.2em] mt-1 mb-6">Full Stack Developer & Creator</p>
           
           <div className="bg-white/70 backdrop-blur-xl border border-white p-6 rounded-[28px] shadow-sm max-w-2xl mx-auto">
             <p className="text-sm text-gray-600 leading-relaxed font-medium">
               "I built Smart Local Trust to solve three real problems at once: hard-to-verify service providers, confusing booking communication, and low trust in local hiring. This project gives users one reliable place to discover verified professionals, book with clarity, and choose with confidence."
             </p>
           </div>

           <div className="mt-8 flex justify-center gap-4">
              <SocialBtn icon={<Github size={16} />} label="GitHub" href="https://github.com/HarshitRaj2712" />
              <SocialBtn icon={<Linkedin size={16} />} label="LinkedIn" href="https://www.linkedin.com/in/harshit-raj-10931b282/" />
              <SocialBtn icon={<Globe size={16} />} label="Portfolio" href="https://hars8it2712.vercel.app" />
              <SocialBtn icon={<Mail size={16} />} label="Email" href="mailto:hars8it2712@gmail.com" />
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
          <div className="text-center mb-12 md:mb-14">
             <span className="bg-white/85 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-bold text-[#007FFF] border border-[#007FFF]/15 shadow-sm uppercase tracking-[0.2em]">Journey</span>
             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 tracking-tight">The Evolution of the Idea</h2>
             <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto">From a frustrating daily problem to a trusted local-services platform, one milestone at a time.</p>
          </div>

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-0.5 bg-linear-to-b from-[#007FFF]/20 via-amber-300/40 to-emerald-300/40" />

            <div className="space-y-5 md:space-y-7">
              {journeySteps.map((step, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <MotionDiv
                    key={idx}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    className={`relative pl-11 md:pl-0 ${isEven ? "md:pr-[52%]" : "md:pl-[52%]"}`}
                  >
                    <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 top-7 w-6 h-6 rounded-full border-4 border-[#FFF0F5] shadow ${step.color} z-10`}></div>

                    <div
                      className={`group rounded-[28px] border border-white/80 bg-white/90 backdrop-blur-sm p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${
                        isEven ? "md:mr-8" : "md:ml-8"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`p-2.5 rounded-xl ${step.color} text-white shadow-md`}>{step.icon}</span>
                        <div>
                          <h4 className="text-sm md:text-base font-bold text-gray-800 tracking-tight">{step.title}</h4>
                          <p className="text-[10px] font-bold text-[#007FFF] uppercase tracking-[0.15em]">{step.tag}</p>
                        </div>
                      </div>

                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium">
                        {step.text}
                      </p>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- TECH STACK --- */}
        <div className="relative overflow-hidden bg-white/85 backdrop-blur-md border border-white p-6 md:p-8 rounded-[30px] shadow-sm">
          <div className="absolute -top-20 -right-12 w-52 h-52 rounded-full bg-[#007FFF]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-12 w-48 h-48 rounded-full bg-pink-300/15 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4 mb-7">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">Modern Technology Stack</h2>
              <span className="text-[10px] font-bold text-[#007FFF] uppercase tracking-[0.2em] bg-[#007FFF]/10 px-3 py-1 rounded-full">Interactive</span>
            </div>

            <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-5 items-start">
              <div className="grid grid-cols-2 gap-3">
                {techStack.map((tech) => {
                  const isActive = activeTech.name === tech.name;

                  return (
                    <MotionDiv
                      key={tech.name}
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ duration: 0.18 }}
                      onHoverStart={() => setActiveTech(tech)}
                      onFocus={() => setActiveTech(tech)}
                      tabIndex={0}
                      className={`group cursor-pointer rounded-2xl border p-4 bg-white/90 transition-all ${
                        isActive
                          ? "border-[#007FFF]/40 shadow-lg"
                          : "border-gray-100 hover:border-[#007FFF]/25"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-9 h-9 rounded-xl bg-linear-to-br ${tech.accent} text-white flex items-center justify-center shadow ${tech.glow}`}>
                          {tech.icon}
                        </div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{tech.role}</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#007FFF] transition-colors">{tech.name}</h3>
                    </MotionDiv>
                  );
                })}
              </div>

              <MotionDiv
                key={activeTech.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-3xl border border-[#007FFF]/20 bg-linear-to-br from-white to-[#007FFF]/5 p-6 shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-2xl bg-linear-to-br ${activeTech.accent} text-white flex items-center justify-center shadow ${activeTech.glow}`}>
                    {activeTech.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#007FFF] uppercase tracking-[0.2em]">{activeTech.role}</p>
                    <h3 className="text-xl font-bold text-gray-800 tracking-tight">{activeTech.name}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">{activeTech.description}</p>

                <div className="mt-6">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                    <span>Impact on Product</span>
                    <span>High</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <MotionDiv
                      initial={{ width: 0 }}
                      animate={{ width: "88%" }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className={`h-full rounded-full bg-linear-to-r ${activeTech.accent}`}
                    />
                  </div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>

        {/* --- CTA --- */}
        <div className="bg-[#007FFF] p-10 rounded-4xl text-center shadow-2xl shadow-[#007FFF]/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
            <Sparkles size={100} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight relative z-10">Ready to Find Your Match?</h2>
          <p className="text-white/70 text-xs mt-2 mb-8 relative z-10">Join Smart Local Trust today and explore trusted local services.</p>
          <button onClick={() => navigate("/signup")} className="bg-white text-[#007FFF] px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all relative z-10">
            Get Started <ChevronRight size={14} className="inline ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
};

/* --- Helper Social Link --- */
const SocialBtn = ({ icon, label, href }) => (
  <a
    href={href}
    target={href?.startsWith("mailto:") ? "_self" : "_blank"}
    rel={href?.startsWith("mailto:") ? undefined : "noopener noreferrer"}
    className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100 text-[10px] font-bold text-gray-500 hover:text-[#007FFF] hover:shadow-md transition-all uppercase tracking-widest"
  >
    {icon} {label}
  </a>
);

export default AboutPage;