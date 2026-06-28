"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  originalX: number;
  originalY: number;
  originalZ: number;
  radius: number;
  color: string;
}

export function Canvas3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize particles in a sphere distribution
    const particles: Particle[] = [];
    const particleCount = 150;
    const sphereRadius = Math.min(width, height) * 0.25;

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution for even spread on sphere
      const theta = Math.acos(-1 + (2 * i) / particleCount);
      const phi = Math.sqrt(particleCount * Math.PI) * theta;

      const x = sphereRadius * Math.sin(theta) * Math.cos(phi);
      const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
      const z = sphereRadius * Math.cos(theta);

      particles.push({
        x,
        y,
        z,
        originalX: x,
        originalY: y,
        originalZ: z,
        radius: Math.random() * 1.5 + 0.8,
        color: "rgba(224, 224, 225, 0.85)", // sleek metallic/white
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coords around center (-1 to 1)
      mouseRef.current.targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseRef.current.targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Camera field of view (perspective)
    const fov = 400;

    // Rotation angles
    let angleX = 0.001;
    let angleY = 0.0015;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen mouse movements for smooth easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Adjust rotation speed based on mouse movement
      const rotY = angleY + mouseRef.current.x * 0.005;
      const rotX = angleX + mouseRef.current.y * 0.005;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Draw subtle background radial gradient glow
      const gradient = ctx.createRadialGradient(
        width * 0.7 + mouseRef.current.x * 50,
        height * 0.3 + mouseRef.current.y * 50,
        50,
        width * 0.7,
        height * 0.3,
        width * 0.5
      );
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.08)"); // Indigo glow
      gradient.addColorStop(0.5, "rgba(147, 51, 234, 0.03)"); // Violet halo
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Rotate and project particles
      const projected: { x: number; y: number; z: number; size: number; alpha: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Save updated coordinates
        p.x = x1;
        p.y = y2;
        p.z = z2;

        // Perspective Projection
        const scale = fov / (fov + z2);
        const projX = x1 * scale + width / 2;
        const projY = y2 * scale + height / 2;

        // Depth cueing
        const alpha = Math.max(0.1, Math.min(1, (fov - z2) / (fov * 1.5)));
        const size = p.radius * scale;

        projected.push({
          x: projX,
          y: projY,
          z: z2,
          size,
          alpha,
        });
      }

      // Draw links between close nodes in 3D space
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const pi = particles[i];
          const pj = particles[j];

          // Calculate distance in 3D space
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dz = pi.z - pj.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Connect if close enough
          if (dist < 90) {
            const projI = projected[i];
            const projJ = projected[j];

            // Blend alphas and fade out based on distance
            const linkAlpha = (1 - dist / 90) * Math.min(projI.alpha, projJ.alpha) * 0.25;

            // Draw line
            ctx.beginPath();
            ctx.moveTo(projI.x, projI.y);
            ctx.lineTo(projJ.x, projJ.y);
            ctx.strokeStyle = `rgba(156, 163, 175, ${linkAlpha})`; // grey-400 with dynamic alpha
            ctx.stroke();
          }
        }
      }

      // Draw the particles
      for (let i = 0; i < projected.length; i++) {
        const proj = projected[i];
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, proj.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243, 244, 246, ${proj.alpha})`;
        ctx.fill();

        // Extra glowing center for random points to make it premium
        if (i % 15 === 0) {
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, proj.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${proj.alpha * 0.15})`; // blue glow
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-[#070709]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
