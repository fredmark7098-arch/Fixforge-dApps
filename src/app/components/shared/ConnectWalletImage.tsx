"use client";

import { useWalletConnect } from "@/app/contexts/WalletConnectContext";
import Image, { type ImageProps } from "next/image";

export type ConnectWalletImageProps = ImageProps & {
  /** Tailwind / classes on the clickable wrapper (e.g. rounded corners, max-width). */
  buttonClassName?: string;
};

/**
 * Image that opens the Connect Wallet modal when clicked (accessibility: button + aria-label).
 */
export default function ConnectWalletImage({
  buttonClassName = "",
  className,
  alt,
  ...rest
}: ConnectWalletImageProps) {
  const { openWalletConnect } = useWalletConnect();
  const label =
    typeof alt === "string" && alt.trim() !== ""
      ? `Connect wallet — ${alt}`
      : "Connect wallet";

  return (
    <button
      type="button"
      onClick={() => openWalletConnect()}
      className={`m-0 max-w-full border-0 bg-transparent p-0 text-left leading-none [font:inherit] transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${buttonClassName}`}
      aria-label={label}
    >
      <Image alt={alt} className={className} {...rest} />
    </button>
  );
}
