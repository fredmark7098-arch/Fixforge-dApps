"use client";

import ConnectWalletImage from "@/app/components/shared/ConnectWalletImage";
import { Companiesdata } from "@/lib/data/pageData";

function LogoCells({ suffix }: { suffix: string }) {
  return (
    <>
      {Companiesdata.map((item, i) => (
        <div
          key={`${suffix}-${i}`}
          className="flex shrink-0 items-center justify-center px-6 md:px-8"
        >
          <ConnectWalletImage
            src={item.imgSrc}
            alt="Partner logo"
            width={203}
            height={101}
            className="h-auto w-[120px] object-contain opacity-90 sm:w-[140px] md:w-auto"
            buttonClassName="cursor-pointer"
          />
        </div>
      ))}
    </>
  );
}

const Companies = () => {
  return (
    <section className="border-none -my-2 pt-0 overflow-x-hidden">
      <div className="container min-w-0">
        <div
          className="relative min-h-[101px] overflow-hidden py-2"
          aria-label="Partner logos"
        >
          <div className="logos-marquee flex w-max will-change-transform">
            <div className="flex items-center">
              <LogoCells suffix="a" />
            </div>
            <div className="flex items-center" aria-hidden>
              <LogoCells suffix="b" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Companies;
