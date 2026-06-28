"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import { TiltCard } from "@/components/tilt-card";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "NCRB (Citizen Interface)",
    category: "Mobile Application",
    description: "A centralized, dual-user mobile application built for the National Crime Records Bureau connecting the police department and citizens to file reports and streamline operations.",
    image: "/portfolio/ncrb.jpeg",
    link: "https://github.com/Akhil-chaudhary/Citizen-Interface",
    tags: ["React Native", "Android", "iOS", "Firebase"],
  },
  {
    title: "RubiX Club Portal",
    category: "Web Application",
    description: "An aesthetic web experience for the rubiX club. A creative project designed to explore advanced CSS animations, custom canvas layouts, and premium user interaction flows.",
    image: "/portfolio/rubix.PNG",
    link: "https://github.com/Akhil-chaudhary/RubiX",
    tags: ["HTML5", "CSS3", "JavaScript", "Animations"],
  },
  {
    title: "Fintech Tax Assistant",
    category: "Financial Tools Platform",
    description: "A comprehensive, responsive financial tool suite designed to solve daily problems, compute taxes, and offer budgeting estimates for Indian taxpayers.",
    image: "/portfolio/fintech.jpeg",
    link: "https://github.com/Akhil-chaudhary/Fintech",
    tags: ["React JS", "Node.js", "Financial APIs", "Tailwind CSS"],
  },
];

export function ProjectShowcase() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  } as const;

  return (
    <div className="w-full px-4 max-w-6xl mx-auto py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {projects.map((project, idx) => (
          <TiltCard key={idx} className="h-full">
            <motion.div
              variants={cardVariants}
              data-cursor="view"
              className="group bg-[#0d0d12]/60 border border-[#1f1f2e]/60 rounded-3xl overflow-hidden hover:border-[#e94b3c]/40 hover:bg-[#0d0d12]/90 transition-all duration-500 flex flex-col h-full shadow-lg relative"
            >
              {/* Project Image Panel */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 border-b border-[#1f1f2e]/60">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12]/90 to-transparent opacity-60" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {project.category}
                </div>
              </div>

              {/* Project Details Panel */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#e94b3c] transition-colors duration-300 tracking-tight mb-2 flex items-center justify-between">
                    <span>{project.title}</span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-white transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-bold text-neutral-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Action Link */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#e94b3c] hover:text-white group-hover:translate-x-1 transition-all duration-300 cursor-pointer border-t border-neutral-900 w-full pt-4"
                  >
                    <span>Explore Repository</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </motion.div>
    </div>
  );
}
