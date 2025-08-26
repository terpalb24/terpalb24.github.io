import { ArrowRight } from "lucide-react";
import Button from "@/components/button";
import HeroImage from "./hero-image";

export default function HeroSection() {
  return (
    <section className="h-screen">
      <div className="relative container h-full">
        <HeroImage />
        <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
          <h1 className="hero-heading flex flex-col items-center justify-center gap-4 font-black">
            <span className="text-4xl lg:text-5xl text-shadow-lg text-shadow-bg">
              Welcome to
            </span>
            <span className="text-primary text-7xl lg:text-8xl text-shadow-lg text-shadow-bg">
              Terpal B 24
            </span>
          </h1>
          <h2 className="mx-auto max-w-[700px] md:text-xl">
            Software Engineering Class Part of{" "}
            <a
              href="https://if.polibatam.ac.id/teknologi-rekayasa-perangkat-lunak/"
              className="transition-opacity duration-200 hover:opacity-75"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Prodi TRPL Polibatam</strong>
            </a>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button href="/members">
              Our Members
              <ArrowRight className="h-4 w-4 hidden sm:inline-block" />
            </Button>
            <Button color="white" href="/projects">
              Our Projects
              <ArrowRight className="h-4 w-4 hidden sm:inline-block" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
