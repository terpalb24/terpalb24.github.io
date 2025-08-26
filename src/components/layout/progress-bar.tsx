"use client";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

interface Props {
  children?: React.ReactNode;
}
export default function ProgressBar({ children }: Props) {
  return (
    <ProgressProvider
      height="6px"
      color="var(--color-primary)"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
