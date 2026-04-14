"use client";

import { useWalletConnect } from "@/app/contexts/WalletConnectContext";
import { getImagePath } from "@/lib/utils/imagePath";
import Image from "next/image";

interface table {
  index: number;
  name: string;
  blockTime: string;
  health: number;
  operators: string;
  action: string;
  imgSrc: string;
}

const tableData: table[] = [
  {
    index: 1,
    name: "Bitcoin (BTC)",
    imgSrc: getImagePath("/images/table/bitcoin.svg"),
    blockTime: "~10 min",
    health: 99.99,
    operators: "~16k nodes",
    action: "Connect",
  },
  {
    index: 2,
    name: "Ethereum (ETH)",
    imgSrc: getImagePath("/images/table/cryptoone.svg"),
    blockTime: "~12 s",
    health: 99.98,
    operators: "~1M validators",
    action: "Connect",
  },
  {
    index: 3,
    name: "Tether (USDT)",
    imgSrc: getImagePath("/images/table/cryptothree.svg"),
    blockTime: "chain-dependent",
    health: 99.95,
    operators: "multi-chain",
    action: "Connect",
  },
  {
    index: 4,
    name: "BNB Chain (BNB)",
    imgSrc: getImagePath("/images/table/cryptotwo.svg"),
    blockTime: "~0.75 s",
    health: 99.97,
    operators: "41 validators",
    action: "Connect",
  },
];

const Table = () => {
  const { openWalletConnect } = useWalletConnect();

  return (
    <section id="network-section" className="scroll-mt-20">
      <div className="container">
        <div className="rounded-2xl bg-tablebg p-4 sm:p-8 relative z-10 overflow-hidden">
          <p className="text-white/80 text-xl sm:text-2xl">
            Public networks at a glance
          </p>
          <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1 lg:mx-0 lg:overflow-visible lg:px-0">
            <table className="mt-6 w-full min-w-[40rem] border border-border sm:mt-10">
              <thead>
                <tr className="text-white bg-border rounded-2xl">
                  <th className="px-2 py-3 text-xs font-normal rounded-s-lg sm:px-4 sm:py-4 sm:text-sm">
                    #
                  </th>
                  <th className="px-2 py-3 text-start text-xs font-normal sm:px-4 sm:py-4 sm:text-sm">
                    NAME
                  </th>
                  <th className="px-2 py-3 text-xs font-normal sm:px-4 sm:py-4 sm:text-sm">
                    BLOCK TIME
                  </th>
                  <th className="px-2 py-3 text-xs font-normal sm:px-4 sm:py-4 sm:text-sm">
                    UPTIME (30D)
                  </th>
                  <th className="px-2 py-3 text-xs font-normal sm:px-4 sm:py-4 sm:text-sm">
                    OPERATORS
                  </th>
                  <th className="px-2 py-3 text-xs font-normal rounded-e-lg sm:px-4 sm:py-4 sm:text-sm">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((items, i) => (
                  <tr key={i} className="border-b border-b-border">
                    <td className="px-2 py-4 text-center text-sm text-white sm:px-4 sm:py-6 sm:text-base">
                      {items.index}
                    </td>
                    <td className="px-2 py-4 text-white sm:px-4 sm:py-6">
                      <div className="flex min-w-0 items-center justify-start gap-2 sm:gap-5">
                        <Image
                          src={items.imgSrc}
                          alt=""
                          height={50}
                          width={50}
                          className="h-9 w-9 shrink-0 sm:h-[50px] sm:w-[50px]"
                        />
                        <span className="min-w-0 text-left text-xs sm:text-base">
                          {items.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-4 text-center text-sm text-white sm:px-4 sm:py-6 sm:text-base">
                      {items.blockTime}
                    </td>
                    <td
                      className={`px-2 py-4 text-center text-sm sm:px-4 sm:py-6 sm:text-base ${
                        items.health >= 99.97 ? "text-secondary" : "text-primary"
                      } `}
                    >
                      {items.health}%
                    </td>
                    <td className="px-2 py-4 text-center text-sm text-white sm:px-4 sm:py-6 sm:text-base">
                      {items.operators}
                    </td>
                    <td className="px-2 py-4 text-center sm:px-4 sm:py-6">
                      <button
                        type="button"
                        onClick={() => openWalletConnect()}
                        className={`font-semibold underline-offset-2 hover:underline ${
                          items.health >= 99.97 ? "text-secondary" : "text-primary"
                        }`}
                      >
                        {items.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Image
        src={getImagePath("/images/table/Untitled.svg")}
        alt=""
        width={2460}
        height={102}
        loading="lazy"
        sizes="100vw"
        className="h-auto w-full max-w-full"
      />
    </section>
  );
};

export default Table;
