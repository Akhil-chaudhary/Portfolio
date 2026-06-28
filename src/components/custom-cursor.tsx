"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);
  // Track how many data-cursor zones we're currently inside
  const dataCursorDepth = useRef(0);

  // Absolute mouse coordinates
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Eased spring positions for the outer follow ring
  const ringX = useSpring(mouseX, { stiffness: 220, damping: 24 });
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 24 });

  useEffect(() => {
    // Ignore custom cursor on touch viewports
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    document.documentElement.classList.add("custom-cursor-active");
    setIsVisible(true);

    // ── 1. Track exact mouse position ────────────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // ── 2. Resolve cursor type on every movement ─────────────────────────────
    //       Walk up from the element under the pointer and find the nearest
    //       data-cursor attribute. That wins. If none found, fall back to
    //       checking for generic interactive elements.
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Walk up the DOM to find the nearest [data-cursor] ancestor
      const dataCursorEl = target.closest<HTMLElement>("[data-cursor]");

      if (dataCursorEl) {
        const type = dataCursorEl.dataset.cursor;
        if (type === "view") {
          setCursorType("view");
          return;
        }
        if (type === "drag") {
          setCursorType("drag");
          return;
        }
      }

      // Fall back: generic interactive elements
      const interactiveEl = target.closest("a, button, [role='button'], input, textarea, select, label");
      if (interactiveEl) {
        setCursorType("hover");
        return;
      }

      setCursorType("default");
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
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

  // ── Visual variants ────────────────────────────────────────────────────────
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
          width: 72,
          height: 72,
          backgroundColor: "#e94b3c",
          borderColor: "#e94b3c",
          borderWidth: "0px",
        };
      case "drag":
        return {
          width: 72,
          height: 72,
          backgroundColor: "#e94b3c",
          borderColor: "#e94b3c",
          borderWidth: "0px",
        };
      default:
        return {
          width: 28,
          height: 28,
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
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden border border-solid"
      >
        <AnimatePresence>
          {cursorType === "view" && (
            <motion.span
              key="view"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="text-[9px] font-black tracking-widest text-white uppercase select-none"
            >
              View
            </motion.span>
          )}
          {cursorType === "drag" && (
            <motion.span
              key="drag"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="text-[9px] font-black tracking-widest text-white uppercase select-none"
            >
              Drag
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner Dot — hidden when cursor is in a special state */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorType !== "default" ? 0 : 1,
          opacity: cursorType !== "default" ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-2 h-2 bg-[#e94b3c] rounded-full pointer-events-none z-[9999]"
      />
    </>
  );
}
