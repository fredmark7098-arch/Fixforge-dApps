"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders `fallback` on the server and first client paint, then `children` after mount.
 * Avoids hydrating a large DOM tree that browser extensions mutate (e.g. bis_skin_checked)
 * before React runs, which causes unavoidable hydration mismatches.
 */
export default function ClientMountGate({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
