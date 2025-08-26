import type React from "react";

interface Props {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}
export default function HeaderSection({ title, subtitle, children }: Props) {
  return (
    <header className="pb-12 md:pb-24 pt-24 md:pt-48 text-center container">
      <h1 className="text-5xl page-title leading-normal md:leading-normal xl:leading-normal font-black xl:text-6xl text-primary">
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto page-subtitle mt-4 max-w-[700px] md:text-md xl:text-lg font-semibold">
          {subtitle}
        </p>
      )}
      {children}
    </header>
  );
}
