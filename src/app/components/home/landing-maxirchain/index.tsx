"use client";

import ConnectWalletImage from "@/app/components/shared/ConnectWalletImage";
import { RevealOnView } from "@/app/components/shared/RevealOnView";
import Services from "@/app/components/home/services";
import { getImagePath } from "@/lib/utils/imagePath";
import { Icon } from "@iconify/react";
import type { ReactNode } from "react";

/** Encode spaces for static filenames under /public. */
function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return getImagePath(normalized.replace(/ /g, "%20"));
}

const sectionShell =
  "relative overflow-hidden border-t border-white/[0.06] bg-[#070504] py-16 md:py-24";

const glowImage =
  "relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-amber-500/15 shadow-[0_0_48px_rgba(245,158,11,0.12),0_0_80px_rgba(99,102,241,0.08)]";

const CHAINS = [
  { sym: "BTC", name: "Bitcoin", icon: "cryptocurrency-color:btc" },
  { sym: "ETH", name: "Ethereum", icon: "cryptocurrency-color:eth" },
  { sym: "SOL", name: "Solana", icon: "cryptocurrency-color:sol" },
  { sym: "BNB", name: "BNB", icon: "cryptocurrency-color:bnb" },
  { sym: "ADA", name: "Cardano", icon: "simple-icons:cardano" },
] as const;

function ChainTicker() {
  return (
    <div
      className="mx-auto mb-14 max-w-5xl rounded-2xl border border-white/10 bg-black/40 px-2 py-4 backdrop-blur-sm"
      aria-label="Supported networks"
    >
      <div className="overflow-hidden">
        <div className="chain-marquee flex w-max will-change-transform">
          <div className="flex items-stretch gap-10 px-6 md:gap-14">
            {CHAINS.map((c) => (
              <div
                key={`a-${c.sym}`}
                className="flex shrink-0 flex-col items-center gap-1.5 text-center"
              >
                <Icon icon={c.icon} className="text-4xl md:text-5xl" aria-hidden />
                <span className="text-sm font-bold text-white">{c.sym}</span>
                <span className="text-xs text-white/55">{c.name}</span>
              </div>
            ))}
          </div>
          <div className="flex items-stretch gap-10 px-6 md:gap-14" aria-hidden>
            {CHAINS.map((c) => (
              <div
                key={`b-${c.sym}`}
                className="flex shrink-0 flex-col items-center gap-1.5 text-center"
              >
                <Icon icon={c.icon} className="text-4xl md:text-5xl" aria-hidden />
                <span className="text-sm font-bold text-white">{c.sym}</span>
                <span className="text-xs text-white/55">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type ShowcaseProps = {
  id?: string;
  title: string;
  body: ReactNode;
  imageSrc: string;
  imageAlt: string;
};

function Showcase({ id, title, body, imageSrc, imageAlt }: ShowcaseProps) {
  return (
    <section id={id} className={sectionShell + " scroll-mt-24"}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(168,85,247,0.07),transparent_55%)]" />
      <RevealOnView className="container relative z-10">
        <h2 className="mb-6 text-center text-3xl font-bold text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.06)] md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <div className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-white/70 md:text-lg">
          {body}
        </div>
        <ConnectWalletImage
          src={assetPath(imageSrc)}
          alt={imageAlt}
          width={1200}
          height={675}
          className="h-auto w-full object-cover"
          sizes="(max-width: 1024px) 100vw, 80vw"
          buttonClassName={`${glowImage} block w-full cursor-pointer`}
        />
      </RevealOnView>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    q: "How do I start?",
    a: "Click any action above and connect your wallet to begin guided remediation.",
  },
  {
    q: "Is it secure?",
    a: "Fixforge-dApps follows best-practice client flows; we never custody your assets.",
  },
  {
    q: "Which chains are supported?",
    a: "Major EVM, Solana, and more—expanding continuously.",
  },
] as const;

export default function MaxirchainLandingSections() {
  return (
    <>
      <section className="relative border-t border-white/[0.06] bg-[#070504] py-10 md:py-14">
        <RevealOnView className="container relative z-10">
          <ChainTicker />
        </RevealOnView>
      </section>

      <Services />

      <Showcase
        id="wallet-troubleshooter"
        title="Wallet Troubleshooter"
        body={
          <>
            Diagnostics and guided fixes for common wallet issues, including
            missing balances, stuck transactions, incorrect nonces, and risky
            approvals. Our guided flows explain what&apos;s happening and why,
            before proposing a safe, reversible next step.
          </>
        }
        imageSrc="/images/assets/wallet-troubleshooter.jpg"
        imageAlt="Wallet diagnostics and network illustration"
      />

      <Showcase
        title="Take Full Control of Your Crypto"
        body={
          <>
            Insights and resolutions for permissions, approvals, policy locks,
            and address safety so you can transact with confidence. Easily
            review allowances, revoke problematic approvals, and verify contract
            integrity across chains.
          </>
        }
        imageSrc="/images/assets/control-crypto.jpg"
        imageAlt="Digital control and security across chains"
      />

      <Showcase
        title="Our Troubleshooting Expertise"
        body={
          <>
            From swaps to bridges, we help you identify and fix cross-chain
            issues with repeatable workflows and clear guidance. We surface the
            root cause RPC, gas, liquidity, or policy so you can resolve with
            minimal retries and fees.
          </>
        }
        imageSrc="/images/assets/troubleshooting-expertise.jpg"
        imageAlt="Cross-chain troubleshooting and workflows"
      />

      <Showcase
        title="NFT Troubleshooting Services"
        body={
          <>
            Restore metadata visibility, refresh token URIs, sync marketplace
            listings, and resolve transfer hiccups across chains and wallets.{" "}
            <span className="font-medium text-white/90">
              Fixforge-dApps keeps creators, collectors, and marketplaces in
              sync with minimal manual effort.
            </span>
          </>
        }
        imageSrc="/images/assets/nft-services.jpg"
        imageAlt="NFT troubleshooting services"
      />

      <section className={sectionShell + " scroll-mt-24"}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_20%,rgba(251,146,60,0.08),transparent_60%)]" />
        <RevealOnView className="container relative z-10">
          <h2 className="mb-6 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Why Choose Fixforge-dApps for NFTs?
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-white/70 md:text-lg">
            Purpose-built workflows for metadata, indexing, and consistent
            marketplace display of your assets. We prioritize provenance,
            on-chain truth, and practical UX so your collections look right
            everywhere.
          </p>
          <ConnectWalletImage
            src={assetPath("/images/assets/why-choose-nft.jpg")}
            alt="NFT collections and marketplace display"
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 80vw"
            buttonClassName={`${glowImage} block w-full cursor-pointer`}
          />
          <div className="mx-auto mt-6 flex max-w-5xl flex-col divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/35 backdrop-blur-sm sm:flex-row sm:divide-x sm:divide-y-0">
            {(
              [
                "Cross-chain indexing",
                "Marketplace sync",
                "On-chain provenance",
              ] as const
            ).map((label) => (
              <div
                key={label}
                className="flex flex-1 items-center justify-center px-4 py-5 text-center text-sm font-medium text-white/85 md:text-base"
              >
                {label}
              </div>
            ))}
          </div>
        </RevealOnView>
      </section>

      <section className={sectionShell}>
        <RevealOnView className="container relative z-10">
          <h2 className="mb-6 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            What Our Users Say
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-white/70 md:text-lg">
            Real feedback from users who resolved critical multi-chain issues with
            Fixforge-dApps. Faster resolution, safer execution, and fewer
            retries are the reasons users stick with our guided flows.
          </p>
          <ConnectWalletImage
            src={assetPath("/images/assets/what-our-user-say-2.jpg")}
            alt="User testimonials"
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 80vw"
            buttonClassName={`${glowImage} block w-full cursor-pointer`}
          />
        </RevealOnView>
      </section>

      <Showcase
        title="About the Platform"
        body={
          <>
            Observability, automation, and guided remediation built for every
            chain and wallet you already use. Fixforge-dApps integrates
            seamlessly into your existing workflow no new seed phrases, no
            migrations, just outcomes.
          </>
        }
        imageSrc="/images/assets/about-platform.png"
        imageAlt="Platform observability and operations"
      />

      <Showcase
        title="Why Choose Fixforge-dApps?"
        body={
          <>
            Purpose-built for speed, safety, and multi-chain compatibility with a
            focus on user trust and clarity. Everything is explained in plain
            English, with reversible actions whenever possible.
          </>
        }
        imageSrc="/images/assets/why-choose.png"
        imageAlt="Why choose Fixforge-dApps"
      />

      <Showcase
        title="Fixforge-dApps Roadmap"
        body={
          <>
            Continuous delivery of new integrations and automated resolvers to
            reduce friction over time. Expect new chain support, smarter
            diagnostics, and safer default paths—shipped regularly.
          </>
        }
        imageSrc="/images/assets/troubleshooting-expertise (1).jpg"
        imageAlt="Product roadmap visualization"
      />

      <section id="faq-section" className={sectionShell + " scroll-mt-24"}>
        <RevealOnView className="container relative z-10">
          <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
            FAQ
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-base text-white/65 md:text-lg">
            Answers to common questions about setup, security, and
            troubleshooting across multiple chains and wallets.
          </p>
          <div className="mx-auto max-w-3xl space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
              >
                <p className="text-base leading-relaxed md:text-lg">
                  <span className="font-semibold text-amber-300">{item.q} </span>
                  <span className="text-white/85">{item.a}</span>
                </p>
              </div>
            ))}
          </div>
        </RevealOnView>
      </section>

      <section className={sectionShell}>
        <RevealOnView className="container relative z-10">
          <h2 className="mb-6 text-center text-3xl font-bold text-white md:text-4xl">
            About Us
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-base leading-relaxed text-white/70 md:text-lg">
            We&apos;re a distributed team building safer cross-chain experiences
            for everyone. Our mission is simple: remove friction and uncertainty
            so people can just use crypto— afely.
          </p>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <ConnectWalletImage
                src={getImagePath("/images/assets/contact-us.jpg")}
                alt="Security and cross-chain team"
                width={900}
                height={600}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                buttonClassName={`${glowImage} lg:mx-0 block w-full cursor-pointer`}
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-lg leading-relaxed text-white/75">
                We focus on clear guidance, reversible steps, and tooling that
                fits the wallets and networks you already use so you can move
                faster without giving up custody or control.
              </p>
            </div>
          </div>
        </RevealOnView>
      </section>

      <section className="relative border-t border-white/[0.06] bg-[#070504] py-16 md:py-20">
        <RevealOnView className="container relative z-10 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Contact Us
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Need help right now? Use the form below or reach out we&apos;ll guide
            you step-by-step with clear, safe actions once you&apos;re connected.
          </p>
        </RevealOnView>
      </section>
    </>
  );
}
