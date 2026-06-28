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
import { Canvas3D } from "@/components/canvas-3d";
import { BentoGrid } from "@/components/bento-grid";
import { ProjectShowcase } from "@/components/project-card";
import { MarqueeTestimonials } from "@/components/marquee-testimonials";
import { ContactForm } from "@/components/contact-form";

const rotatingWords = ["Freelancer!", "Website Builder!", "App Architect!", "Creative Designer!"];

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
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
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* 3D background canvas */}
      <Canvas3D />

      {/* Sticky Header Nav */}
      <header className="sticky top-0 z-50 w-full bg-[#070709]/60 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("home")}>
            <Image
              src="/logo.png"
              alt="Akhil Chaudhary Logo"
              width={48}
              height={48}
              className="object-contain hover:scale-105 transition-transform"
            />
            <span className="font-heading text-lg font-bold tracking-wider text-white hidden sm:inline-block">
              AKHIL CHAUDHARY
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {["Home", "About", "Services", "Works", "Reviews", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-neutral-400 hover:text-white hover:translate-y-[-1px] transition-all duration-300 cursor-pointer"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-white/5 bg-[#070709]/95 backdrop-blur-2xl overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-5">
                {["Home", "About", "Services", "Works", "Reviews", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-left text-lg font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer py-1"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center py-20 px-6 max-w-6xl mx-auto z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03),transparent_50%)] pointer-events-none" />
        
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 mt-4">
          <div className="flex-1 text-center md:text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e94b3c]/10 border border-[#e94b3c]/20 text-xs font-semibold uppercase tracking-widest text-[#e94b3c]"
            >
              <span>Available for Freelance</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-5xl sm:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.05]"
            >
              I am <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e94b3c] via-red-200 to-white">
                Akhil Chaudhary
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-10 flex items-center justify-center md:justify-start"
            >
              <span className="text-xl md:text-2xl font-medium text-neutral-400 mr-2">Creative</span>
              <div className="relative overflow-hidden h-8 w-60">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute text-xl md:text-2xl font-bold text-white tracking-wide"
                  >
                    {rotatingWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start pt-4"
            >
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-white text-black hover:bg-neutral-200 transition-colors duration-300 font-bold px-8 py-4 rounded-full text-sm shadow-xl shadow-white/5 cursor-pointer"
              >
                Start a Project
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors duration-300 font-bold px-8 py-4 rounded-full text-sm cursor-pointer"
              >
                More About Me
              </button>
            </motion.div>
          </div>

          {/* Floating Profile/Abstract Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-72 h-72 md:w-96 md:h-96 relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#e94b3c]/15 to-transparent rounded-full blur-3xl" />
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl relative">
              <Image
                src="/Me.jpg"
                alt="Akhil Chaudhary Profile Portrait"
                fill
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 bg-[#0d0d12]/90 border border-[#1f1f2e] backdrop-blur-md px-5 py-2.5 rounded-2xl flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#e94b3c] rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-white">Open to contracts</span>
            </div>
          </motion.div>
        </div>

        {/* Floating Social Icons */}
        <div className="hidden lg:flex flex-col gap-6 absolute left-6 bottom-12 z-20">
          {[
            { icon: <Github className="w-5 h-5" />, href: "https://github.com/Akhil-chaudhary" },
            { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/akhil-chaudhary-0478a1187" },
            { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/akhilchaudhary.js/" },
            { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com/code_bugged?s=08" }
          ].map((soc, index) => (
            <a
              key={index}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors duration-300 hover:translate-y-[-2px] transform"
            >
              {soc.icon}
            </a>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-t border-white/5 bg-[#08080a] relative z-10">
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="text-center md:text-left space-y-4">
            <span className="text-xs font-semibold tracking-widest text-[#e94b3c] uppercase">Professional Details</span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">About Me & Skills</h2>
          </div>
        </div>
        <BentoGrid />
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="max-w-xl text-center md:text-left space-y-4">
            <span className="text-xs font-semibold tracking-widest text-[#e94b3c] uppercase">Core Services</span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
              Launch and grow your personal brand & business
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6 w-full">
          {/* App Development Card */}
          <div className="bg-[#0d0d12]/50 border border-[#1f1f2e]/60 backdrop-blur-md rounded-3xl p-8 hover:border-[#e94b3c]/40 transition-colors duration-350 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e94b3c]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="p-4 bg-[#e94b3c]/10 rounded-2xl border border-[#e94b3c]/20 text-[#e94b3c] w-fit mb-6">
              <Smartphone className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#e94b3c] transition-colors duration-300">
              App Development (iOS & Android)
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Mobile applications provide a platform to resolve user pain points directly, increase brand engagement, provide streamlined access to updates, and drive retention. Cross-platform frameworks like React Native ensure your apps share a single, performant codebase for double the speed to market.
            </p>
          </div>

          {/* Web Development Card */}
          <div className="bg-[#0d0d12]/50 border border-[#1f1f2e]/60 backdrop-blur-md rounded-3xl p-8 hover:border-[#e94b3c]/40 transition-colors duration-350 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e94b3c]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="p-4 bg-[#e94b3c]/10 rounded-2xl border border-[#e94b3c]/20 text-[#e94b3c] w-fit mb-6">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#e94b3c] transition-colors duration-300">
              Web Development & System Design
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              A high-performing web application acts as your primary visual identity and sales funnel. I engineer SEO-optimized, super-fast, and accessible web experiences utilizing frameworks like Next.js. I guarantee scalable architectures to capture leads, showcase achievements, and elevate your personal brand.
            </p>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-24 border-t border-white/5 bg-[#08080a] relative z-10">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="text-center md:text-left space-y-4">
            <span className="text-xs font-semibold tracking-widest text-[#e94b3c] uppercase">Recent Creations</span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">Recent Works</h2>
          </div>
        </div>
        <ProjectShowcase />
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-24 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="text-center md:text-left space-y-4">
            <span className="text-xs font-semibold tracking-widest text-[#e94b3c] uppercase">Endorsements</span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">Client Testimonials</h2>
          </div>
        </div>
        <MarqueeTestimonials />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 border-t border-white/5 bg-[#08080a] relative z-10">
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="text-center md:text-left space-y-4">
            <span className="text-xs font-semibold tracking-widest text-[#e94b3c] uppercase">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">Start A Project</h2>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start w-full">
          {/* Info Details */}
          <div className="space-y-8 lg:pr-12">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Let's create something extraordinary together.
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              If you have an app idea, need a custom modern web app, or want to discuss fullstack engineering, reach out! I'm responsive, precise, and motivated to build solutions that will grow your business.
            </p>

            <div className="space-y-6 pt-4 border-t border-neutral-900">
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-white/5 border border-white/5 rounded-2xl text-[#e94b3c]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-500">Email Me At</h4>
                  <a href="mailto:akhilcodebugged@gmail.com?Subject=Hello" className="text-sm font-semibold text-white hover:text-[#e94b3c] transition-colors">
                    akhilcodebugged@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-white/5 border border-white/5 rounded-2xl text-[#e94b3c]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-500">Call Me At</h4>
                  <a href="tel:+91-8181022104" className="text-sm font-semibold text-white hover:text-[#e94b3c] transition-colors">
                    (+91) 8181022104
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-white/5 border border-white/5 rounded-2xl text-[#e94b3c]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-500">Office Location</h4>
                  <span className="text-sm font-semibold text-white">
                    Ghaziabad, Uttar Pradesh, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-16 border-t border-white/5 bg-[#060608] relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-12 w-full">
          
          <div className="space-y-4 max-w-sm text-center md:text-left">
            <Image
              src="/logo.png"
              alt="Akhil Chaudhary Footer Logo"
              width={64}
              height={64}
              className="object-contain mx-auto md:mx-0"
            />
            <p className="text-neutral-400 text-sm font-medium leading-relaxed italic">
              "Coffee has given me unrealistic expectations of productivity."
            </p>
            <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">
              © {new Date().getFullYear()} Akhil Chaudhary. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <a
              href="https://akhil-chaudhary.github.io/Photo-gallery/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e94b3c] hover:text-white transition-colors cursor-pointer border border-[#e94b3c]/20 hover:border-white/20 bg-[#e94b3c]/5 hover:bg-white/5 px-4 py-2.5 rounded-full"
            >
              <Camera className="w-4 h-4" />
              <span>Explore Photo Gallery</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="flex gap-4">
              {[
                { icon: <Github className="w-4 h-4" />, href: "https://github.com/Akhil-chaudhary" },
                { icon: <Linkedin className="w-4 h-4" />, href: "https://www.linkedin.com/in/akhil-chaudhary-0478a1187" },
                { icon: <Instagram className="w-4 h-4" />, href: "https://www.instagram.com/akhilchaudhary.js/" },
                { icon: <Twitter className="w-4 h-4" />, href: "https://twitter.com/code_bugged?s=08" }
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-full transition-colors border border-white/5 cursor-pointer"
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

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
