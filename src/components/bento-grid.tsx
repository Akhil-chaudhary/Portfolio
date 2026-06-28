"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Coffee,
  Download,
  Code2,
  Sparkles,
  Github,
} from "lucide-react";
import Image from "next/image";
import { TiltCard } from "@/components/tilt-card";

interface Skill {
  name: string;
  percentage: number;
  iconPath: string;
  color: string;
}

const skills: Skill[] = [
  { name: "React Native", percentage: 72, iconPath: "/tools/reactnative.png", color: "from-[#e94b3c]/20 to-[#e94b3c]/10" },
  { name: "React JS", percentage: 65, iconPath: "/tools/react.png", color: "from-[#e94b3c]/20 to-[#e94b3c]/10" },
  { name: "Frontend Development", percentage: 85, iconPath: "/tools/frontend.png", color: "from-[#e94b3c]/20 to-[#e94b3c]/10" },
  { name: "Node JS", percentage: 75, iconPath: "/tools/js.png", color: "from-[#e94b3c]/20 to-[#e94b3c]/10" },
  { name: "Backend (Django)", percentage: 70, iconPath: "/tools/django.png", color: "from-[#e94b3c]/20 to-[#e94b3c]/10" },
  { name: "Python", percentage: 68, iconPath: "/tools/python.png", color: "from-[#e94b3c]/20 to-[#e94b3c]/10" },
  { name: "Git & Github", percentage: 60, iconPath: "/tools/github.png", color: "from-[#e94b3c]/20 to-[#e94b3c]/10" },
  { name: "Photoshop", percentage: 48, iconPath: "/tools/photoshop.png", color: "from-[#e94b3c]/20 to-[#e94b3c]/10" },
];

export function BentoGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  const handleDownloadResume = () => {
    window.open(
      "https://drive.google.com/file/d/14VNgXVWYmwOqtyoZHzzAxEUa21malanA/view?usp=drivesdk",
      "_blank"
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto w-full px-4"
    >
      {/* Bio / Main Profile Card */}
      <TiltCard className="sm:col-span-2 h-full">
        <motion.div
          variants={itemVariants}
          className="bg-[#0d0d12]/60 border border-[#1f1f2e]/60 rounded-3xl p-8 relative overflow-hidden group hover:border-[#e94b3c]/40 hover:bg-[#0d0d12]/80 transition-colors duration-500 flex flex-col justify-between min-h-[300px] h-full"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e94b3c]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#e94b3c]/10 transition-all duration-700" />
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#e94b3c] uppercase mb-4">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Fullstack Developer & Designer</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight mb-4">
              I craft digital experiences with speed and precision.
            </h3>
            <p className="text-neutral-400 text-base leading-relaxed max-w-xl">
              Hi, I'm Akhil Chaudhary. I specialize in building top-tier website and mobile applications (Android/iOS) for brands, small businesses, and agencies. I bridge the gap between elegant UI aesthetics and powerful backend infrastructure.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 bg-white text-black hover:bg-neutral-200 transition-colors duration-300 font-medium px-5 py-3 rounded-full text-sm cursor-pointer shadow-lg shadow-white/5"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>
            <a
              href="https://github.com/Akhil-chaudhary"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white transition-colors duration-300 border border-white/10 font-medium px-5 py-3 rounded-full text-sm cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Profile</span>
            </a>
          </div>
        </motion.div>
      </TiltCard>

      {/* Coffee Counter Card */}
      <TiltCard className="h-full">
        <motion.div
          variants={itemVariants}
          className="bg-[#0d0d12]/60 border border-[#1f1f2e]/60 rounded-3xl p-8 relative overflow-hidden group hover:border-[#e94b3c]/40 hover:bg-[#0d0d12]/80 transition-colors duration-500 flex flex-col justify-between h-full"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#e94b3c]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#e94b3c]/10 transition-all duration-700" />
          <div className="flex justify-between items-start">
            <div className="p-3 bg-[#e94b3c]/10 rounded-2xl border border-[#e94b3c]/20 text-[#e94b3c]">
              <Coffee className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 border border-neutral-800 rounded-full px-3 py-1">
              Productivity
            </span>
          </div>
          <div className="my-6">
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-extrabold text-white tracking-tighter">462</span>
              <span className="text-[#e94b3c] font-semibold text-lg">cups</span>
            </div>
            <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
              "Coffee has given me unrealistic expectations of productivity."
            </p>
          </div>
          <div className="text-xs text-neutral-500 border-t border-neutral-900 pt-4 flex justify-between">
            <span>Active Tracking</span>
            <span className="text-[#e94b3c] font-medium animate-pulse">● Live</span>
          </div>
        </motion.div>
      </TiltCard>

      {/* Location Card */}
      <TiltCard className="h-full">
        <motion.div
          variants={itemVariants}
          className="bg-[#0d0d12]/60 border border-[#1f1f2e]/60 rounded-3xl p-8 relative overflow-hidden group hover:border-[#e94b3c]/40 hover:bg-[#0d0d12]/80 transition-colors duration-500 flex flex-col justify-between h-full"
        >
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#e94b3c]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#e94b3c]/10 transition-all duration-700" />
          <div className="flex justify-between items-start">
            <div className="p-3 bg-[#e94b3c]/10 rounded-2xl border border-[#e94b3c]/20 text-[#e94b3c]">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 border border-neutral-800 rounded-full px-3 py-1">
              Base Location
            </span>
          </div>
          <div className="my-6">
            <h4 className="text-2xl font-bold text-white tracking-tight">Ghaziabad, India</h4>
            <p className="text-neutral-400 text-sm mt-2 leading-relaxed">
              ABESIT, Ghaziabad, 201009 INDIA. Open for contract projects & global remote collaborations.
            </p>
          </div>
          <div className="text-xs text-neutral-500 border-t border-neutral-900 pt-4 flex justify-between items-center">
            <span>Current Timezone</span>
            <span className="text-[#e94b3c] font-medium">GMT +5:30</span>
          </div>
        </motion.div>
      </TiltCard>

      {/* Skills Grid Card */}
      <TiltCard className="sm:col-span-2 h-full">
        <motion.div
          variants={itemVariants}
          className="bg-[#0d0d12]/60 border border-[#1f1f2e]/60 rounded-3xl p-8 relative overflow-hidden group hover:border-[#e94b3c]/40 hover:bg-[#0d0d12]/80 transition-colors duration-500 h-full"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#e94b3c]/10 rounded-xl border border-[#e94b3c]/20 text-[#e94b3c]">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-bold text-white">Technical Core</h4>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 border border-neutral-800 rounded-full px-3 py-1">
              Tools & Skills
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col justify-between group/skill hover:bg-white/10 hover:border-white/10 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <Image
                      src={skill.iconPath}
                      alt={skill.name}
                      width={32}
                      height={32}
                      className="object-contain filter grayscale group-hover/skill:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <span className="text-xs font-semibold text-neutral-400 group-hover/skill:text-white transition-colors duration-300">
                    {skill.percentage}%
                  </span>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-300 leading-tight group-hover/skill:text-white">
                    {skill.name}
                  </h5>
                  <div className="w-full bg-neutral-900 h-1 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.05 }}
                      className="bg-[#e94b3c] h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}
