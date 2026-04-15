"use client";
import { useWalletConnect } from "@/app/contexts/WalletConnectContext";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const { openWalletConnect } = useWalletConnect();
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-999">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => openWalletConnect()}
          className="hidden lg:block rounded-lg bg-linear-to-r from-amber-600 to-orange-800 px-4 py-3.5 text-sm font-medium leading-none text-nowrap text-white shadow-[0_0_18px_rgba(245,158,11,0.35)] hover:opacity-95"
        >
          Connect Wallet
        </button>
        {isVisible && (
          <div
            onClick={scrollToTop}
            aria-label="scroll to top"
            className="back-to-top flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-amber-500/30 bg-darkmode text-white shadow-md shadow-black/40 transition duration-300 ease-in-out hover:border-amber-500/50 hover:bg-tablebg"
          >
            <span className="mt-[6px] h-3 w-3 rotate-45 border-l border-t border-white"></span>
          </div>
        )}
      </div>
    </div>
  );
}
