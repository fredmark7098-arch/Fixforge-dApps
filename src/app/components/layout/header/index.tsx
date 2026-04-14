"use client";
import { useWalletConnect } from "@/app/contexts/WalletConnectContext";
import { Headerdata } from "@/lib/data/pageData";
import { useEffect, useRef, useState } from "react";
import Logo from "./logo";
import HeaderLink from "./navigation/HeaderLink";
import MobileHeaderLink from "./navigation/MobileHeaderLink";

const Header: React.FC = () => {
  const { openWalletConnect } = useWalletConnect();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setSticky(window.scrollY >= 10);
  };

  const handleClickOutside = (event: PointerEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [navbarOpen]);

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [navbarOpen]);

  const connect = () => {
    openWalletConnect();
    setNavbarOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full transition-all duration-300 ${
        navbarOpen ? "z-[70]" : "z-40"
      } ${
        sticky
          ? " shadow-lg bg-body-bg bg-banner-image py-3.5"
          : "shadow-none py-4 sm:py-5"
      }`}
    >
      <div>
        <div className="container flex items-center justify-between">
          <Logo />
          <nav className="hidden lg:flex grow items-center gap-8 justify-center ml-14">
            {Headerdata.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={connect}
              className="hidden lg:block bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white duration-300 px-6 py-3 rounded-lg"
            >
              Connect Wallet
            </button>
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="block lg:hidden p-2 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white mt-1.5"></span>
              <span className="block w-6 h-0.5 bg-white mt-1.5"></span>
            </button>
          </div>
        </div>
        {navbarOpen && (
          <button
            type="button"
            aria-label="Close menu"
            className="fixed top-0 left-0 z-[45] h-full w-full cursor-default border-0 bg-black/50 p-0"
            onClick={() => setNavbarOpen(false)}
          />
        )}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 z-[55] h-full w-full max-w-xs transform bg-darkmode shadow-lg transition-transform duration-300 ${
            navbarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-bold text-white">
              <Logo />
            </h2>
            <button
              type="button"
              onClick={() => setNavbarOpen(false)}
              className="rounded-lg p-2 text-white hover:bg-white/10 hover:text-primary"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col items-start p-4 text-white">
            {Headerdata.map((item, index) => (
              <MobileHeaderLink
                key={index}
                item={item}
                onNavigate={() => setNavbarOpen(false)}
              />
            ))}
            <div className="mt-4 flex w-full flex-col space-y-4">
              <button
                type="button"
                onClick={connect}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-transparent border border-primary hover:text-primary"
              >
                Connect Wallet
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
