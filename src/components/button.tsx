import Link from "next/link";
import type React from "react";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  color?: "primary" | "white";
  children: React.ReactNode;
}

export default function Button({
  href,
  color = "primary",
  children,
  ...rest
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`ripple inline-flex h-12 items-center rounded-full px-6 font-semibold ${
        color === "white" ? "ripple-white" : "ripple-primary"
      }`}
      {...rest}
    >
      <span className="ripple-bg"></span>
      <span className="ripple-bg2"></span>
      <span className="ripple-fg inline-flex items-center gap-2">
        {children}
      </span>
    </Link>
  );
}
