"use client";
import { AlignRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useRef, useState } from "react";
import Logo from "@/assets/logo.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Members", href: "/members" },
  { name: "Albums", href: "/albums" },
  { name: "Projects", href: "/projects" },
  { name: "Schedule", href: "/schedule" },
  { name: "Lecturers", href: "/lecturers" },
  { name: "Notion", href: "/notion" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerBgRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const updateHeaderBg = () => {
      const headerBg = headerBgRef.current;
      if (!headerBg) return;
      const isScrolled = window.scrollY > headerBg.clientHeight - 16;
      if (isScrolled || menuOpen) {
        headerBg.classList.remove("bottom-16", "lg:bottom-20");
        headerBg.classList.add("bottom-0", "lg:bottom-0");
      } else {
        headerBg.classList.remove("bottom-0", "lg:bottom-0");
        headerBg.classList.add("bottom-16", "lg:bottom-20");
      }
      if (menuOpen) {
        headerBg.classList.remove("bg-bg/80", "backdrop-blur-xs");
        headerBg.classList.add("bg-bg");
      } else {
        headerBg.classList.remove("bg-bg");
        headerBg.classList.add("bg-bg/80", "backdrop-blur-xs");
      }
    };
    window.addEventListener("scroll", updateHeaderBg);
    updateHeaderBg();
    return () => window.removeEventListener("scroll", updateHeaderBg);
  }, [menuOpen]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: need to hide menu on change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <span
        ref={headerBgRef}
        className="absolute w-full bottom-16 lg:bottom-20 lg:h-20 h-16 inset-x-0 bg-bg/80 backdrop-blur-xs -z-1 ease-in-out transition-all duration-300"
      ></span>
      <div className="container flex h-16 lg:h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ExportedImage
            src={Logo}
            alt="Logo"
            className="h-12 lg:h-16 w-auto p-2"
            placeholder="empty"
          />
        </Link>
        <nav
          className={`fixed top-16 bottom-0 lg:static bg-bg lg:bg-transparent transition-all duration-500 flex flex-col lg:flex-row items-center gap-6 lg:gap-0 py-12 lg:py-0 text-right lg:text-left w-full lg:w-auto
            ${menuOpen ? "right-0 delay-300" : "-right-full delay-0"}
          `}
        >
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-semibold transition-colors ${
                  isActive ? "text-primary" : "text-white"
                } hover:text-primary block lg:inline-block w-full lg:w-auto px-6 lg:px-4`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="lg:hidden h-10 w-10 relative flex items-center justify-center"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <AlignRight
            data-menu-icon
            className={`absolute top-1/2 left-1/2 -translate-1/2 transition-all duration-300 ease-in-out
              ${menuOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"}
            `}
          />
          <X
            data-close-icon
            className={`absolute top-1/2 left-1/2 -translate-1/2 transition-all duration-300 ease-in-out
              ${menuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"}
            `}
          />
        </button>
      </div>
    </header>
  );
}
