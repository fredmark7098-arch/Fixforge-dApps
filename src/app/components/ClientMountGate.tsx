"use client";

import { useEffect, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback: ReactNode;
};

/** Avoids hydration mismatches from client-only providers until the app has mounted. */
export default function ClientMountGate({ children, fallback }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return fallback;
  }

  return children;
}
