"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);

  // Absolute mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Eased spring positions for the outer follow ring
  const ringX = useSpring(mouseX, { stiffness: 220, damping: 24 });
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 24 });

  useEffect(() => {
    // Ignore custom cursor on mobile touch viewports
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    document.documentElement.classList.add("custom-cursor-active");
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Search for interactive boundaries
      const interactiveEl = target.closest("a, button, [role='button'], input, textarea");
      const viewEl = target.closest("[data-cursor='view']");
      const dragEl = target.closest("[data-cursor='drag']");

      if (viewEl) {
        setCursorType("view");
      } else if (dragEl) {
        setCursorType("drag");
      } else if (interactiveEl) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  // Custom visual variants
  const getRingVariants = () => {
    switch (cursorType) {
      case "hover":
        return {
          width: 50,
          height: 50,
          backgroundColor: "rgba(233, 75, 60, 0.12)",
          borderColor: "rgba(233, 75, 60, 0.5)",
          borderWidth: "1px",
        };
      case "view":
        return {
          width: 65,
          height: 65,
          backgroundColor: "#e94b3c",
          borderColor: "#e94b3c",
          borderWidth: "0px",
        };
      case "drag":
        return {
          width: 65,
          height: 65,
          backgroundColor: "#e94b3c",
          borderColor: "#e94b3c",
          borderWidth: "0px",
        };
      default:
        return {
          width: 24,
          height: 24,
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderColor: "rgba(255, 255, 255, 0.3)",
          borderWidth: "1px",
        };
    }
  };

  return (
    <>
      {/* Outer Spring Follow Circle */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={getRingVariants()}
        transition={{ type: "spring", stiffness: 450, damping: 32 }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center overflow-hidden"
      >
        <AnimatePresence>
          {cursorType === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[9px] font-black tracking-widest text-white uppercase"
            >
              View
            </motion.span>
          )}
          {cursorType === "drag" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[9px] font-black tracking-widest text-white uppercase"
            >
              Drag
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorType !== "default" ? 0 : 1,
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#e94b3c] rounded-full pointer-events-none z-50"
      />
    </>
  );
}
