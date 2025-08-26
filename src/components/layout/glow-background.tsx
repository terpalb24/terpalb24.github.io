"use client";
import { useEffect, useRef } from "react";

export default function GlowBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame: number;
    const animate = () => {
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.03;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.03;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentMouse.x}px, ${currentMouse.y}px, 0)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-1 mix-blend-screen">
      <div
        ref={glowRef}
        className="absolute bg-radial pointer-events-none -translate-1/2 from-secondary/50 to-secondary/0 to-50% md:blur-sm h-[150vh] rounded-full aspect-square"
      ></div>
    </div>
  );
}
