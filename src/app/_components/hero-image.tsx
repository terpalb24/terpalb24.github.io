"use client";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import ExportedImage from "next-image-export-optimizer";
import { useEffect } from "react";
import Hero from "@/assets/hero.jpg";

export default function HeroImage() {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 80, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 80, damping: 20 });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    const handleResize = () => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const handlePointerMove = (e: PointerEvent) => {
      const targetX = (e.clientY - windowHeight / 2) / 30;
      const targetY = -(e.clientX - windowWidth / 2) / 30;
      rotateX.set(targetX);
      rotateY.set(targetY);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [rotateX, rotateY]);

  return (
    <div className="absolute inset-0 -z-1 translate-3d">
      <motion.div
        className="w-full h-full flex items-center justify-center"
        style={{
          rotateX: springX,
          rotateY: springY,
          y,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <figure
          className="relative aspect-square md:aspect-video w-full max-w-6xl overflow-hidden rounded-4xl"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <ExportedImage
            src={Hero}
            alt="Our Class Members"
            className="h-full w-full object-cover object-center"
            fill
            priority
            placeholder="blur"
          />
          <span className="bg-bg/50 absolute inset-0"></span>
        </figure>
      </motion.div>
    </div>
  );
}
