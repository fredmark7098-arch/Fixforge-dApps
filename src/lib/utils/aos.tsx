'use client'
import { useEffect, type ReactNode } from "react";

/**
 * Loads AOS only on viewports where scroll animations are enabled (desktop, motion OK).
 * Avoids parsing ~tens of KB of AOS + CSS on phones where we skip animations anyway.
 */
export default function Aoscompo({ children }: { children: ReactNode }) {
  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 767px)")
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    let cancelled = false

    const maybeInit = async () => {
      if (narrow.matches || reduceMotion.matches) return

      const [{ default: AOS }] = await Promise.all([
        import("aos"),
        import("aos/dist/aos.css"),
      ])
      if (cancelled) return

      AOS.init({
        duration: 600,
        once: true,
        offset: 24,
      })
    }

    void maybeInit()

    const onChange = () => {
      void maybeInit()
    }
    narrow.addEventListener("change", onChange)
    reduceMotion.addEventListener("change", onChange)

    return () => {
      cancelled = true
      narrow.removeEventListener("change", onChange)
      reduceMotion.removeEventListener("change", onChange)
    }
  }, [])

  return <>{children}</>
}
