"use client";

import { useWalletConnect } from "@/app/contexts/WalletConnectContext";
import { Servicesdata } from "@/lib/data/pageData";
import { Icon } from "@iconify/react/dist/iconify.js";

const Services = () => {
  const { openWalletConnect } = useWalletConnect();

  return (
    <section id="services-section" className="scroll-mt-20">
      <div className="container relative">
        <div className="relative z-10">
          <div className="mb-10 text-center">
            <p className="text-primary text-base sm:text-lg font-semibold mb-4">
              SERVICES
            </p>
            <h2 className="font-semibold mb-6 max-w-2xl mx-auto sm:leading-14 capitalize">
              Hands-on help across the full on-chain lifecycle
            </h2>
            <p className="lg:text-lg font-normal text-lightpurple max-w-2xl mx-auto">
              Short guides for common jobs connect your wallet when you are
              ready to act, and we will route you through the right checks.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {Servicesdata.map((item, i) => (
              <button
                type="button"
                key={i}
                onClick={() => openWalletConnect()}
                aria-label={`${item.heading}: connect wallet`}
                className="group bg-darkmode border border-darkmode hover:border-primary/70 hover:bg-darkmode/90 p-6 rounded-xl flex flex-col gap-3 transition-colors duration-300 text-left w-full min-h-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-body-bg"
              >
                <div className="rounded-full bg-linear-to-r from-primary to-secondary w-fit p-3 flex items-center justify-center group-hover:opacity-95 transition-opacity">
                  <Icon
                    icon={item.icon}
                    className="text-3xl text-white"
                    aria-hidden
                  />
                </div>
                <span className="text-white/80 text-base font-medium capitalize">
                  {item.heading}
                </span>
                <span className="text-white/40 text-sm font-normal leading-relaxed">
                  {item.subheading}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-lightpurple text-sm max-w-md">
              Connect your wallet to continue with guided steps tailored to your
              address and network.
            </p>
            <button
              type="button"
              onClick={() => openWalletConnect()}
              className="text-xl font-semibold text-white py-4 px-8 lg:px-12 bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary rounded-xl cursor-pointer"
            >
              Connect wallet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
