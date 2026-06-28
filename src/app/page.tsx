"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Globe,
  ArrowUp,
  Instagram,
  Linkedin,
  Github,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Camera,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { BentoGrid } from "@/components/bento-grid";
import { ProjectShowcase } from "@/components/project-card";
import { MarqueeTestimonials } from "@/components/marquee-testimonials";
import { ContactForm } from "@/components/contact-form";

const rotatingWords = ["Freelancer!", "Website Builder!", "App Architect!", "Creative Designer!"];
const sections = [
  { id: "home", label: "Intro", num: "01" },
  { id: "about", label: "About Me", num: "02" },
  { id: "services", label: "Core Services", num: "03" },
  { id: "works", label: "Recent Works", num: "04" },
  { id: "reviews", label: "Testimonials", num: "05" },
  { id: "contact", label: "Start Project", num: "06" },
];

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);

    const handleScroll = () => {
      // Toggle back to top button visibility
      setShowScrollTop(window.scrollY > 600);

      // ScrollSpy active section detection
      let current = "home";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if section is centered or near top of viewport
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section.id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Align scroll considering sticky header height on mobile
      const headerOffset = window.innerWidth < 1024 ? 80 : 0;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Ambient ambient background glows inspired by sui.io */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#e94b3c]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-[#e94b3c]/3 rounded-full blur-[150px]" />
      </div>

      {/* Sticky Mobile Nav Header (Hides on desktop split pane view) */}
      <header className="lg:hidden sticky top-0 z-40 w-full bg-[#070709]/80 backdrop-blur-xl border-b border-white/5 h-20 flex items-center justify-between px-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("home")}>
          <Image
            src="/logo.png"
            alt="Akhil Chaudhary Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="font-heading text-base font-bold tracking-wider text-white">
            AKHIL
          </span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-20 left-0 w-full z-45 border-b border-white/5 bg-[#070709]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="text-left text-lg font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer py-1"
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dual-Panel Split Wrapper */}
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row relative">
        
        {/* Left fixed information pane on desktop */}
        <aside className="w-full lg:w-[42%] lg:fixed lg:top-0 lg:left-auto lg:h-screen lg:flex lg:flex-col lg:justify-between p-6 sm:p-12 lg:py-16 lg:pr-8 z-30 pointer-events-none">
          
          {/* Logo & Subhead */}
          <div className="pointer-events-auto flex items-center gap-3 mb-8 lg:mb-0">
            <Image
              src="/logo.png"
              alt="Logo"
              width={42}
              height={42}
              className="object-contain"
            />
            <span className="font-heading text-xs font-black tracking-widest text-neutral-400 uppercase">
              Akhil Chaudhary
            </span>
          </div>

          {/* Heavy Editorial Typography Header */}
          <div className="pointer-events-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e94b3c]/10 border border-[#e94b3c]/20 text-[10px] font-bold uppercase tracking-wider text-[#e94b3c]">
              <span>Open to global contracts</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black font-heading text-white tracking-tight leading-[1.1]">
              I build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e94b3c] via-red-200 to-white">
                performant systems
              </span> <br />
              & mobile apps.
            </h1>

            <div className="h-8 flex items-center">
              <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest mr-2">Core:</span>
              <div className="relative overflow-hidden h-7 w-52">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute text-sm font-bold text-white tracking-wider"
                  >
                    {rotatingWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-white text-black hover:bg-neutral-200 transition-colors duration-300 font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg cursor-pointer"
              >
                Get In Touch
              </button>
            </div>
          </div>

          {/* Desktop Index ScrollSpy indicators */}
          <nav className="hidden lg:flex flex-col gap-4 pointer-events-auto my-10">
            {sections.map((sec) => {
              const active = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="group flex items-center gap-4 text-left w-fit cursor-pointer py-1"
                >
                  <span className={`text-[10px] font-bold tracking-widest font-heading transition-colors duration-300 ${
                    active ? "text-[#e94b3c]" : "text-neutral-600 group-hover:text-neutral-400"
                  }`}>
                    {sec.num}
                  </span>
                  
                  {/* Sliding underscore or text transition */}
                  <span className={`text-xs font-bold tracking-wider transition-all duration-300 transform ${
                    active 
                      ? "text-white translate-x-2 pl-2 border-l-2 border-[#e94b3c]" 
                      : "text-neutral-500 group-hover:text-neutral-300 group-hover:translate-x-1"
                  }`}>
                    {sec.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Social Links Footer */}
          <div className="pointer-events-auto flex items-center gap-6 mt-8 lg:mt-0">
            {[
              { icon: <Github className="w-4.5 h-4.5" />, href: "https://github.com/Akhil-chaudhary" },
              { icon: <Linkedin className="w-4.5 h-4.5" />, href: "https://www.linkedin.com/in/akhil-chaudhary-0478a1187" },
              { icon: <Instagram className="w-4.5 h-4.5" />, href: "https://www.instagram.com/akhilchaudhary.js/" },
              { icon: <Twitter className="w-4.5 h-4.5" />, href: "https://twitter.com/code_bugged?s=08" }
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-white transition-colors duration-300"
              >
                {soc.icon}
              </a>
            ))}
          </div>

        </aside>

        {/* Right scrollable panel on desktop */}
        <main className="w-full lg:w-[58%] lg:ml-[42%] border-l border-white/5 relative z-10">
          
          {/* Cover Panel representing the intro Hero */}
          <section id="home" className="py-16 sm:py-24 px-6 flex flex-col justify-center min-h-[50vh] lg:min-h-screen border-b border-white/5">
            <div className="space-y-6 max-w-xl">
              <span className="text-xs font-bold tracking-widest text-[#e94b3c] uppercase">Welcome</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Engineering digital products that work, look premium, and get discovered.
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                I build clean frontend portals and structured cross-platform mobile apps. Drawing inspiration from top design standards (like Awwwards and minimalist design systems), I aim to help companies and creators grow their brands with modern technologies.
              </p>
              
              <div className="pt-6">
                <span className="w-2.5 h-2.5 bg-[#e94b3c] rounded-full inline-block animate-pulse mr-2" />
                <span className="text-xs font-semibold text-neutral-300">Currently active from India</span>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 border-b border-white/5 px-4 bg-[#08080a]">
            <div className="max-w-xl mx-auto px-4 mb-12">
              <span className="text-xs font-bold tracking-widest text-[#e94b3c] uppercase">02 / Profile</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2">About & Skills</h2>
            </div>
            <BentoGrid />
          </section>

          {/* Services Section */}
          <section id="services" className="py-20 border-b border-white/5 px-6">
            <div className="max-w-xl mx-auto px-4 mb-12">
              <span className="text-xs font-bold tracking-widest text-[#e94b3c] uppercase">03 / Capability</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2">What I Offer</h2>
            </div>

            <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
              {/* App Development Card */}
              <div className="bg-[#0d0d12]/50 border border-[#1f1f2e]/60 backdrop-blur-md rounded-3xl p-8 hover:border-[#e94b3c]/40 transition-colors duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#e94b3c]/5 rounded-full blur-2xl pointer-events-none" />
                <div className="p-3 bg-[#e94b3c]/10 rounded-2xl border border-[#e94b3c]/20 text-[#e94b3c] w-fit mb-6">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e94b3c] transition-colors duration-300">
                  App Development (iOS & Android)
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  Mobile applications provide direct, friction-free engagement points for users. Utilizing cross-platform technologies like React Native, I deliver native-performing applications for both major platforms simultaneously, cutting development costs and time-to-market in half.
                </p>
              </div>

              {/* Web Development Card */}
              <div className="bg-[#0d0d12]/50 border border-[#1f1f2e]/60 backdrop-blur-md rounded-3xl p-8 hover:border-[#e94b3c]/40 transition-colors duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#e94b3c]/5 rounded-full blur-2xl pointer-events-none" />
                <div className="p-3 bg-[#e94b3c]/10 rounded-2xl border border-[#e94b3c]/20 text-[#e94b3c] w-fit mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#e94b3c] transition-colors duration-300">
                  Web Development & System Design
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  A high-performing web application is the core of any digital marketing strategy. I engineer speed-optimized, visually stunning static and dynamic portals utilizing Next.js, prioritizing semantic HTML layouts and structured Open Graph elements to maximize search discoverability (SEO).
                </p>
              </div>
            </div>
          </section>

          {/* Works Section */}
          <section id="works" className="py-20 border-b border-white/5 px-4 bg-[#08080a]">
            <div className="max-w-xl mx-auto px-4 mb-8">
              <span className="text-xs font-bold tracking-widest text-[#e94b3c] uppercase">04 / Projects</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2">Recent Works</h2>
            </div>
            <ProjectShowcase />
          </section>

          {/* Testimonials Section */}
          <section id="reviews" className="py-20 border-b border-white/5">
            <div className="max-w-xl mx-auto px-6 mb-8">
              <span className="text-xs font-bold tracking-widest text-[#e94b3c] uppercase">05 / Reviews</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2">Client Testimonials</h2>
            </div>
            <MarqueeTestimonials />
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 border-b border-white/5 px-6 bg-[#08080a]">
            <div className="max-w-xl mx-auto px-4 mb-12">
              <span className="text-xs font-bold tracking-widest text-[#e94b3c] uppercase">06 / Connect</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2">Start A Project</h2>
            </div>

            <div className="max-w-xl mx-auto space-y-12">
              <div className="space-y-6">
                <p className="text-neutral-400 text-sm leading-relaxed">
                  If you have a concept, want to audit your existing app system, or need a developer to implement premium frontends, get in touch. I respond within 24 hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
                  <div className="flex gap-3 items-center">
                    <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-[#e94b3c]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Email Me At</h4>
                      <a href="mailto:akhilcodebugged@gmail.com?Subject=Hello" className="text-xs font-semibold text-white hover:text-[#e94b3c] transition-colors">
                        akhilcodebugged@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-[#e94b3c]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Call Me At</h4>
                      <a href="tel:+91-8181022104" className="text-xs font-semibold text-white hover:text-[#e94b3c] transition-colors">
                        (+91) 8181022104
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <ContactForm />
            </div>
          </section>

          {/* Footer Section */}
          <footer className="py-12 px-6 bg-[#060608]">
            <div className="max-w-xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start gap-8">
              <div className="space-y-3 text-center sm:text-left">
                <Image
                  src="/logo.png"
                  alt="Footer Logo"
                  width={48}
                  height={48}
                  className="object-contain mx-auto sm:mx-0"
                />
                <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider">
                  © {new Date().getFullYear()} Akhil Chaudhary. All rights reserved.
                </p>
              </div>

              <div className="flex flex-col items-center sm:items-end gap-4">
                <a
                  href="https://akhil-chaudhary.github.io/Photo-gallery/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#e94b3c] hover:text-white transition-colors cursor-pointer border border-[#e94b3c]/20 hover:border-white/20 bg-[#e94b3c]/5 hover:bg-white/5 px-4 py-2 rounded-full"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Photo Gallery</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </footer>

        </main>
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollToSection("home")}
            className="fixed bottom-8 right-8 z-50 p-3 bg-white text-black hover:bg-neutral-200 transition-colors duration-300 rounded-full shadow-2xl cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
