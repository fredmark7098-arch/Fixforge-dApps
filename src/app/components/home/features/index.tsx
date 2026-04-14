"use client";
import { Featuresdata } from "@/lib/data/pageData";
import Image from "next/image";

const Features = () => {
  return (
    <section id="features-section" className="scroll-mt-20">
      <div className="container relative">
        <div className="bg-linear-to-r from-primary to-secondary absolute w-full h-full top-0 -left-1/4 blur-[64px] sm:blur-[120px] lg:blur-[390px]"></div>
        <div className=" gap-x-4 gap-y-4 relative z-10">
          {/* Column-1 */}
          <div className="mb-10">
            <p className="text-primary text-base sm:text-lg font-semibold mb-4 text-center">
              FEATURES
            </p>
            <h2 className="font-semibold mb-6 text-center max-w-2xl mx-auto sm:leading-14 capitalize">
              Why decentralized architecture matters
            </h2>
            <p className="lg:text-lg font-normal text-lightpurple text-center max-w-2xl mx-auto ">
              The same ideas power public blockchains, peer replication, and
              open governance: shared rules, many operators, and proofs anyone
              can check instead of blind trust in one host.
            </p>
          </div>
          {/* Column-2 */}
          <div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-x-10 gap-y-4 -right-1/4">
              {Featuresdata?.map((items, i) => (
                <div
                  className="bg-darkmode p-8 rounded-lg flex flex-col gap-3"
                  key={i}
                >
                  <div className="rounded-full bg-linear-to-r from-primary to-secondary w-fit p-4 flex items-center justify-center">
                    <Image
                      src={items.imgSrc}
                      alt={items.imgSrc}
                      width={60}
                      height={60}
                      className="w-auto"
                    />
                  </div>
                  <h5 className="text-white/80 text-lg font-medium capitalize">
                    {items.heading}
                  </h5>
                  <p className="text-white/40 text-sm font-normal">
                    {items.subheading}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
