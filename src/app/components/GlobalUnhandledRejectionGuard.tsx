"use client";

import { useEffect } from "react";

/**
 * Next.js turns unhandled promise rejections into overlay errors. Some libraries
 * (or browser/extension quirks) reject with a DOM Event instead of an Error,
 * which surfaces as `Error: [object Event]`. Those are not actionable app bugs.
 *
 * We swallow only plain Event-shaped reasons (not ErrorEvent, which may carry
 * real script errors) and stop propagation so the dev overlay does not open.
 */
function shouldSwallowNonErrorRejection(reason: unknown): boolean {
  if (reason instanceof Error) return false;
  if (typeof DOMException !== "undefined" && reason instanceof DOMException) {
    return false;
  }
  if (!(reason instanceof Event)) return false;
  if (reason instanceof ErrorEvent) return false;
  return true;
}

export default function GlobalUnhandledRejectionGuard() {
  useEffect(() => {
    const handler = (ev: PromiseRejectionEvent) => {
      if (!shouldSwallowNonErrorRejection(ev.reason)) return;
      ev.preventDefault();
      ev.stopImmediatePropagation();
      console.warn(
        "[GlobalUnhandledRejectionGuard] Ignored promise rejection with DOM Event reason (not an Error).",
        ev.reason
      );
    };
    window.addEventListener("unhandledrejection", handler, { capture: true });
    return () =>
      window.removeEventListener("unhandledrejection", handler, {
        capture: true,
      });
  }, []);

  return null;
}
