"use client";

import { RevealOnView } from "@/app/components/shared/RevealOnView";
import { useWalletConnect } from "@/app/contexts/WalletConnectContext";

const Simple = () => {
  const { openWalletConnect } = useWalletConnect();

  return (
    <section className="bg-simple-bg relative before:absolute before:w-full before:h-full before:bg-arrow-bg before:bg-no-repeat before:top-10">
      <div className="">
        <RevealOnView className="container relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-center font-semibold mb-6 sm:leading-16 capitalize">
              A clearer path into decentralized infrastructure
            </h2>
            <p className="text-center text-lightpurple text-lg font-normal mb-8">
              See how networks stay resilient when many operators share the work
              of validation, propagation, and governance then plug in with
              your own keys when you are ready.
            </p>
          </div>
          <div className="flex justify-center ">
            <button
              type="button"
              onClick={() => openWalletConnect()}
              className="text-xl font-semibold text-white py-4 px-6 lg:px-12 bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary rounded-xl cursor-pointer"
            >
              Connect Wallet
            </button>
          </div>
        </RevealOnView>
      </div>
    </section>
  );
};

export default Simple;
