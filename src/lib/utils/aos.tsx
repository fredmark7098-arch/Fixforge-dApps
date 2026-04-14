'use client'
import { useEffect, type ReactNode } from "react";
import AOS from "aos"
import 'aos/dist/aos.css';

const Aoscompo = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const narrow = window.matchMedia('(max-width: 767px)')
    AOS.init({
      duration: 600,
      once: true,
      offset: 24,
      disable: () => reduceMotion.matches || narrow.matches,
    })
    const refresh = () => AOS.refresh()
    reduceMotion.addEventListener('change', refresh)
    narrow.addEventListener('change', refresh)
    return () => {
      reduceMotion.removeEventListener('change', refresh)
      narrow.removeEventListener('change', refresh)
    }
  }, [])
  return (
    <div>
      {children}
    </div>
  )
}

export default Aoscompo
