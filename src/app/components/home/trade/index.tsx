"use client";

import ConnectWalletImage from "@/app/components/shared/ConnectWalletImage";
import { RevealOnView } from "@/app/components/shared/RevealOnView";
import { getImagePath } from "@/lib/utils/imagePath";

const Trade = () => {
  return (
    <section className="overflow-hidden">
      <div className="container relative">
        <div className="bg-linear-to-r from-primary to-secondary hidden lg:block absolute w-full h-full top-1/2  blur-390"></div>
        <RevealOnView className="grid lg:grid-cols-2 gap-x-5 gap-y-8 items-center relative z-10">
          <div className="min-w-0 w-full">
            <ConnectWalletImage
              src={getImagePath("/images/trade/macbook.png")}
              alt="App on laptop"
              width={787}
              height={512}
              className="h-auto w-full max-w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
              buttonClassName="block w-full cursor-pointer"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-6 sm:gap-7">
            <h2 className="font-semibold text-center sm:text-start max-w-full sm:max-w-96 sm:leading-14 leading-tight text-3xl sm:text-5xl">
              Monitor and connect from anywhere
            </h2>
            <p className="lg:text-lg font-normal text-lightblue text-center sm:text-start px-1">
              Follow network status, explorers, and your own addresses on
              desktop or mobile. The underlying system stays globally replicated
             you are interfacing with peers, not a single company&apos;s
              closed dashboard.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-between sm:gap-2">
              <ConnectWalletImage
                src={getImagePath("/images/trade/mac.svg")}
                alt="macOS"
                width={61}
                height={105}
                className="h-12 w-auto sm:h-[105px]"
                buttonClassName="cursor-pointer"
              />
              <div className="verticalLine hidden h-16 sm:block" />
              <ConnectWalletImage
                src={getImagePath("/images/trade/appstore.svg")}
                alt="App Store"
                width={80}
                height={105}
                className="h-12 w-auto sm:h-[105px]"
                buttonClassName="cursor-pointer"
              />
              <div className="verticalLine hidden h-16 sm:block" />
              <ConnectWalletImage
                src={getImagePath("/images/trade/windows.svg")}
                alt="Windows"
                width={80}
                height={105}
                className="h-12 w-auto sm:h-[105px]"
                buttonClassName="cursor-pointer"
              />
              <div className="verticalLine hidden h-16 sm:block" />
              <ConnectWalletImage
                src={getImagePath("/images/trade/android.svg")}
                alt="Android"
                width={71}
                height={105}
                className="h-12 w-auto sm:h-[105px]"
                buttonClassName="cursor-pointer"
              />
            </div>
          </div>
        </RevealOnView>
      </div>
    </section>
  );
};

export default Trade;
