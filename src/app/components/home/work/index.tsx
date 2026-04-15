"use client";
import ConnectWalletImage from "@/app/components/shared/ConnectWalletImage";
import { RevealOnView } from "@/app/components/shared/RevealOnView";
import { workdata } from "@/lib/data/pageData";
import { getImagePath } from "@/lib/utils/imagePath";

const Work = () => {
  return (
    <section className="relative ">
      <div className="bg-banner-image absolute w-full h-full right-auto blur-[64px] sm:blur-[120px] lg:blur-[390px]" />
      <RevealOnView className="container">
        <div className="text-center mb-14">
          <h2 className="mb-3 capitalize">How It Works</h2>
          <p className="text-lightpurple max-w-2xl mx-auto md:text-lg font-normal md:leading-8 capitalize">
            Onboarding is lightweight: link a wallet, pick a network, and send
            signed messages that nodes validate together no central ledger
            operator has to approve you first.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-5 mt-20">
          {workdata?.map((items, i) => (
            <div
              className="bg-darkmode border border-darkmode group hover:border-primary hover:scale-105 duration-300 p-8 relative rounded-2xl hover:mb-5"
              key={i}
            >
              <div className="rounded-full flex justify-center absolute -top-10 left-40% p-6 bg-linear-to-r from-primary to-secondary">
                <ConnectWalletImage
                  src={items.imgSrc}
                  alt={items.heading}
                  width={44}
                  height={44}
                  buttonClassName="cursor-pointer"
                />
              </div>
              <div>
                <ConnectWalletImage
                  src={getImagePath("/images/icons/bg-arrow.svg")}
                  alt="Decorative arrow"
                  width={85}
                  height={35}
                  buttonClassName="cursor-pointer"
                />
              </div>
              <p className="text-2xl text-white/80 font-semibold text-center mt-8 capitalize">
                {items.heading}
              </p>
              <p className="text-base font-normal text-white/60 text-center mt-2 overflow-hidden line-clamp-3 group-hover:h-auto group-hover:line-clamp-none transition-all duration-300">
                {items.subheading}
              </p>
            </div>
          ))}
        </div>
      </RevealOnView>
    </section>
  );
};

export default Work;
