"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Position coordinates normalized between 0 and 1
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth out coordinate tracking using spring physics
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 160, damping: 22 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 160, damping: 22 });

  // Sheen overlay reflection trackers
  const sheenX = useSpring(useTransform(x, [0, 1], ["0%", "100%"]), { stiffness: 160, damping: 22 });
  const sheenY = useSpring(useTransform(y, [0, 1], ["0%", "100%"]), { stiffness: 160, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const mouseRelativeX = (e.clientX - rect.left) / rect.width;
    const mouseRelativeY = (e.clientY - rect.top) / rect.height;

    x.set(mouseRelativeX);
    y.set(mouseRelativeY);
  };

  const handleMouseLeave = () => {
    // Reset rotations back to center
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className={`relative ${className}`}
    >
      {/* Interactive Sheen overlay layer for Awwwards card depth effect */}
      <motion.div
        style={{
          background: useTransform(
            [sheenX, sheenY],
            ([sX, sY]) =>
              `radial-gradient(circle 180px at ${sX} ${sY}, rgba(233, 75, 60, 0.08), transparent)`
          ),
          transform: "translateZ(5px)",
        }}
        className="absolute inset-0 pointer-events-none z-20 rounded-[inherit]"
      />
      
      {/* Content wrapper with translateZ to separate from card base */}
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
