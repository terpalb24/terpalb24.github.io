import { GlobeIcon } from "lucide-react";
import Facebook from "./icons/facebook";
import Github from "./icons/github";
import Instagram from "./icons/instagram";
import Linkedin from "./icons/linkedin";

interface Props {
  type: "github" | "facebook" | "linkedin" | "instagram" | "website";
  href: string;
}

export default function SocialLink({ type, href }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-white group overflow-hidden relative inline-flex h-10 w-10 rounded-full items-center justify-center"
    >
      <span className="absolute bg-bg inset-0"></span>
      <span
        className={`absolute inset-0 scale-0 group-hover:scale-100 rounded-full transition-all duration-300 ease-in-out ${type === "github" ? "bg-[#181717]" : type === "facebook" ? "bg-[#0866FF]" : type === "instagram" ? "bg-[#FF0069]" : type === "linkedin" ? "bg-[#0a66c2]" : type === "website" ? "bg-secondary" : ""}`}
      ></span>

      <span className="absolute inset-0 inline-flex items-center justify-center">
        {type === "github" ? (
          <Github className="w-6 h-6 fill-current" />
        ) : type === "facebook" ? (
          <Facebook className="w-6 h-6 fill-current" />
        ) : type === "instagram" ? (
          <Instagram className="w-6 h- fill-current" />
        ) : type === "linkedin" ? (
          <Linkedin className="w-6 h-6 fill-current" />
        ) : type === "website" ? (
          <GlobeIcon className="w-6 h-6 stroke-current" />
        ) : null}
      </span>
    </a>
  );
}
