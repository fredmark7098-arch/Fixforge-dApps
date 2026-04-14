"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const WalletConnectModal = dynamic(
  () => import("@/app/components/wallet-connect/WalletConnectModal"),
  { ssr: false }
);

type WalletConnectContextValue = {
  openWalletConnect: () => void;
  closeWalletConnect: () => void;
};

const WalletConnectContext = createContext<WalletConnectContextValue | null>(
  null
);

export function WalletConnectProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openWalletConnect = useCallback(() => setOpen(true), []);
  const closeWalletConnect = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openWalletConnect, closeWalletConnect }),
    [openWalletConnect, closeWalletConnect]
  );

  return (
    <WalletConnectContext.Provider value={value}>
      {children}
      {open && <WalletConnectModal onClose={closeWalletConnect} />}
    </WalletConnectContext.Provider>
  );
}

export function useWalletConnect() {
  const ctx = useContext(WalletConnectContext);
  if (!ctx) {
    throw new Error(
      "useWalletConnect must be used within WalletConnectProvider"
    );
  }
  return ctx;
}
