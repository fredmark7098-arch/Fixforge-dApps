"use client";

import { useWalletConnect } from "@/app/contexts/WalletConnectContext";
import { getImagePath } from "@/lib/utils/imagePath";
import Image from "next/image";
import { BinaryColumns } from "./BinaryColumns";

const gridStyle = {
  backgroundImage: `
    linear-gradient(rgba(251, 191, 36, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(251, 191, 36, 0.04) 1px, transparent 1px)
  `,
  backgroundSize: "56px 56px",
} as const;

const ctaClass =
  "inline-flex rounded-lg bg-gradient-to-r from-amber-600 via-orange-700 to-amber-900 px-7 py-2.5 text-sm font-semibold text-white shadow-[0_0_18px_rgba(245,158,11,0.35)] transition hover:shadow-[0_0_26px_rgba(245,158,11,0.48)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 sm:px-8 sm:text-base";

const Banner = () => {
  const { openWalletConnect } = useWalletConnect();

  return (
    <section className="relative overflow-hidden pb-0" id="home-section">
      <div className="relative min-h-[100svh]">
        {/* Background stack */}
        <div className="absolute inset-0 z-0 min-h-[100svh] bg-[#070504]">
          <div
            className="absolute inset-0 opacity-[0.85]"
            style={gridStyle}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_18%,rgba(251,191,36,0.12),transparent_55%),radial-gradient(ellipse_60%_50%_at_80%_30%,rgba(168,85,247,0.08),transparent_50%),radial-gradient(ellipse_100%_80%_at_50%_100%,rgba(0,0,0,0.85),transparent_65%)]"
            aria-hidden
          />
          <div className="absolute inset-0 z-0 min-h-[100svh]">
            <BinaryColumns />
          </div>
          <div
            className="pointer-events-none absolute -right-16 top-[12%] hidden h-[min(55vh,480px)] w-[min(42vw,320px)] rounded-[45%] border border-amber-400/15 lg:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_45%,transparent_0%,rgba(7,5,4,0.5)_75%,#070504_100%)]"
            aria-hidden
          />
        </div>

        {/* Main hero */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pb-16 pt-28 text-center sm:pt-32 md:pt-36">
          <div className="hero-enter mb-8 drop-shadow-[0_0_32px_rgba(168,85,247,0.45)]">
            <Image
              src={getImagePath("/images/assets/1.jpg")}
              alt=""
              width={120}
              height={120}
              priority
              className="mx-auto h-24 w-24 rounded-2xl object-cover sm:h-28 sm:w-28 md:h-32 md:w-32"
            />
          </div>

          <h1 className="hero-enter hero-enter-delay-1 mb-6 max-w-4xl bg-gradient-to-b from-amber-100 via-yellow-50 to-white/90 bg-clip-text text-3xl font-bold leading-[1.15] text-transparent drop-shadow-[0_0_28px_rgba(251,191,36,0.2)] sm:text-4xl md:text-5xl lg:text-6xl">
            Fixforge-dApps — All Chains Resolver
          </h1>

          <p className="hero-enter hero-enter-delay-2 mb-10 max-w-2xl text-base font-normal leading-relaxed text-white/85 sm:text-lg md:text-xl">
            Fixforge-dApps is a protocol for autonomous, cross-chain remediation
            — engineered to fix what slows you down and safeguard what moves you
            forward.{" "}
            <span className="font-medium text-lime-400 drop-shadow-[0_0_12px_rgba(163,230,53,0.35)]">
              Experience instant migration recovery
            </span>{" "}
            across the wallets and networks you already use — continuously,
            securely, and on your terms.
          </p>

          <div className="hero-enter hero-enter-delay-3">
            <button
              type="button"
              onClick={() => openWalletConnect()}
              className={ctaClass}
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/[0.06] bg-[#070504]/80 px-4 pb-20 pt-14 backdrop-blur-[2px]">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="hero-enter hero-enter-delay-4 mb-5 text-2xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] sm:text-3xl md:text-4xl">
              Trusted by Thousands Worldwide
            </h2>
            <p className="text-base leading-relaxed text-white/70 sm:text-lg">
              Secure, reliable, and designed for real-world multi-chain support
              with modern protections, best-practice flows, and continuous
              improvements. Fixforge-dApps scales from individual wallets to
              institutional teams, helping you diagnose issues faster and execute
              remediations confidently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
