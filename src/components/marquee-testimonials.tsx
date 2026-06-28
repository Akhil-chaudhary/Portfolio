"use client";

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ritik Kumar",
    role: "Client",
    avatar: "/avatars/user-01.jpg",
    text: "Awesome work dude, I like this very much and moreover its above my expectations. I must say that it's completely amazing. Thanks a lot!",
  },
  {
    name: "Sahyog Saini",
    role: "Team Leader",
    avatar: "/avatars/user.jpg",
    text: "Working with Akhil was better than I expected, and I had really high expectations. He is an incredibly talented developer, but what makes him stand out is his work ethic and steady approach. He is very professional and very clean about his work.",
  },
  {
    name: "Divyansh Sharma",
    role: "Tech Lead, Web Solutions",
    avatar: "/avatars/user-02.jpg",
    text: "Akhil's ability to turn complex requirements into high-performance applications is remarkable. His architectural decisions are clean, and his React Native skills are top-tier.",
  },
  {
    name: "Anjali Gupta",
    role: "Product Manager",
    avatar: "/avatars/user-05.jpg",
    text: "Akhil delivered our cross-platform client portal ahead of schedule. His attention to responsive layout constraints and micro-interactions was exceptional.",
  },
];

// Duplicate items for seamless infinite looping
const doubledTestimonials = [...testimonials, ...testimonials];

export function MarqueeTestimonials() {
  return (
    <div className="w-full overflow-hidden py-10 relative select-none">
      {/* Shadow gradient overlays to fade edges */}
      <div className="absolute top-0 left-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#08080a] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#08080a] to-transparent z-10 pointer-events-none" />

      {/* Sliding track */}
      <div data-cursor="drag" className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
        {doubledTestimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="w-[300px] md:w-[420px] bg-[#0d0d12]/50 border border-[#1f1f2e]/60 backdrop-blur-md rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-[#e94b3c]/40 transition-colors duration-300"
          >
            <div>
              <div className="text-[#e94b3c] mb-4 opacity-40">
                <Quote className="w-8 h-8 rotate-180 fill-current" />
              </div>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-normal">
                "{testimonial.text}"
              </p>
            </div>
            
            <div className="flex items-center gap-4 border-t border-neutral-900 mt-6 pt-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-neutral-800">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">{testimonial.name}</h4>
                <p className="text-xs text-neutral-500 font-medium">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
