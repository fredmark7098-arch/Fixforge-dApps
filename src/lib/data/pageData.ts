import { FaqType } from "@/app/types/faq";
import { FeatureType } from "@/app/types/features";
import { ServiceType } from "@/app/types/service";
import { FooterType } from "@/app/types/footerlink";
import { HeaderItem } from "@/app/types/menu";
import { SocialType } from "@/app/types/sociallink";
import { WorkType } from "@/app/types/work";
import { SITE_BASE_PATH } from "@/lib/siteBasePath";

const asset = (path: string) =>
  `${SITE_BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;

export const Headerdata: HeaderItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services-section" },
  { label: "Networks", href: "/#network-section" },
  { label: "Features", href: "/#features-section" },
  { label: "FAQ", href: "/#faq-section" },
  { label: "Contact Us", href: "/#contact" },
];

export const Companiesdata: { imgSrc: string }[] = [
  {
    imgSrc: asset("/images/companies/birdseye.svg"),
  },
  {
    imgSrc: asset("/images/companies/break.svg"),
  },
  {
    imgSrc: asset("/images/companies/keddar.svg"),
  },
  {
    imgSrc: asset("/images/companies/shield.svg"),
  },
  {
    imgSrc: asset("/images/companies/tandov.svg"),
  },
  {
    imgSrc: asset("/images/companies/tree.svg"),
  },
];

export const workdata: WorkType[] = [
  {
    imgSrc: asset("/images/work/icon-one.svg"),
    heading: "Connect your wallet",
    subheading:
      "Link a self-custody wallet to prove ownership of keys and interact with smart contracts without handing control to a central intermediary.",
  },
  {
    imgSrc: asset("/images/work/icon-two.svg"),
    heading: "Choose a network",
    subheading:
      "Pick the chain or layer that fits your use case — each network runs its own consensus, validator set, and rules enforced by open-source clients.",
  },
  {
    imgSrc: asset("/images/work/icon-three.svg"),
    heading: "Participate on-chain",
    subheading:
      "Sign transactions, delegate stake, vote in governance, or run infrastructure — activity is replicated across nodes so no single operator defines the truth.",
  },
];

export const Featuresdata: FeatureType[] = [
  {
    imgSrc: asset("/images/features/featureOne.svg"),
    heading: "Distributed validation",
    subheading:
      "Consensus spreads responsibility across many independent nodes so the ledger stays available and tamper-resistant without a single point of failure.",
  },
  {
    imgSrc: asset("/images/features/featureTwo.svg"),
    heading: "Open participation",
    subheading:
      "Anyone can run a node, audit the code, or submit transactions — permissionless design replaces gatekeepers with transparent protocol rules.",
  },
  {
    imgSrc: asset("/images/features/featureThree.svg"),
    heading: "Verifiable state",
    subheading:
      "Blocks and receipts are cryptographically linked; you can trace history and confirm finality without trusting a private database or opaque operator.",
  },
];

export const Servicesdata: ServiceType[] = [
  {
    icon: "tabler:clock-hour-4",
    heading: "Transaction delay",
    subheading:
      "Unstick pending transfers: check gas, nonces, and network congestion so confirmations resume.",
  },
  {
    icon: "tabler:link",
    heading: "Bridging",
    subheading:
      "Move value across chains with the right bridge, finality windows, and destination addresses verified.",
  },
  {
    icon: "tabler:arrows-exchange",
    heading: "Exchange",
    subheading:
      "Compare routes and liquidity sources while keeping custody and slippage expectations clear.",
  },
  {
    icon: "tabler:refresh",
    heading: "Synchronization",
    subheading:
      "Refresh wallet indexes and node views when balances, tokens, or history look out of date.",
  },
  {
    icon: "tabler:coins",
    heading: "Buy token / coin",
    subheading:
      "On-ramps and DEX flows explained step by step, including approvals and network selection.",
  },
  {
    icon: "tabler:key",
    heading: "Recovery",
    subheading:
      "Restore access with seed Phrasees, hardware backups, and safe handling—never share keys blindly.",
  },
  {
    icon: "tabler:alert-triangle",
    heading: "Login error",
    subheading:
      "Fix connector hiccups, wrong chain, or stale sessions so your wallet can sign again.",
  },
  {
    icon: "tabler:gift",
    heading: "Claim airdrop",
    subheading:
      "Confirm official claim sites and contracts; avoid fake links and unnecessary approvals.",
  },
  {
    icon: "tabler:chart-dots-3",
    heading: "Slippage",
    subheading:
      "Set tolerance and size trades so price impact and MEV risk stay within what you expect.",
  },
  {
    icon: "tabler:arrows-right-left",
    heading: "Swap",
    subheading:
      "Execute token swaps with transparent routing and a quick pre-trade checklist.",
  },
  {
    icon: "tabler:tool",
    heading: "Rectification",
    subheading:
      "Address wrong-network sends or misconfigured txs where mitigation is still possible.",
  },
  {
    icon: "tabler:package-export",
    heading: "Migration",
    subheading:
      "Plan contract or chain migrations: snapshots, new addresses, and user communication.",
  },
  {
    icon: "tabler:lock",
    heading: "Staking",
    subheading:
      "Delegate to validators, track epochs, and understand lock-ups and reward cadence.",
  },
  {
    icon: "tabler:list-check",
    heading: "Whitelist",
    subheading:
      "Complete allowlist steps: wallet signing, deadlines, and caps without oversharing data.",
  },
  {
    icon: "tabler:sparkles",
    heading: "NFTs",
    subheading:
      "Listings, transfers, hidden collections, and metadata refreshes—know the right chain and marketplace.",
  },
  {
    icon: "tabler:lock-square-rounded",
    heading: "Locked account",
    subheading:
      "Clear app locks, 2FA or policy holds, and connector permissions without exposing seed Phrasees.",
  },
  {
    icon: "tabler:scale-outline",
    heading: "Missing / irregular balance",
    subheading:
      "Reconcile RPC lag, wrong tokens, or unindexed deposits so totals match explorers and receipts.",
  },
  {
    icon: "tabler:shield-check",
    heading: "Validation",
    subheading:
      "Verify signatures, contract addresses, and domain links before you approve or sign payloads.",
  },
  {
    icon: "tabler:plant-2",
    heading: "DeFi farming",
    subheading:
      "Pools, gauges, and reward schedules decoded—impermanent loss and exit timing in plain terms.",
  },
  {
    icon: "tabler:device-mobile-exclamation",
    heading: "Wallet glitch",
    subheading:
      "Reset caches, update builds, and switch RPCs when the UI freezes, spins, or shows ghost data.",
  },
  {
    icon: "tabler:arrows-cross",
    heading: "Cross transfer",
    subheading:
      "Send between chains or custodial rails with memo tags, bridges, and fee buffers aligned.",
  },
];

export const Faqdata: FaqType[] = [
  {
    heading: "1. What makes a system decentralized?",
    subheading:
      "No single company or server owns the whole network: many independent participants run nodes, produce blocks or attestations, and follow the same open rules. If some operators go offline, the rest keep the system running.",
  },
  {
    heading: "2. How is agreement reached without a central authority?",
    subheading:
      "Protocols use consensus mechanisms — for example proof-of-work or proof-of-stake — so nodes collectively decide which transactions are valid and in what order, using cryptography and economic incentives instead of a trusted third party.",
  },
  {
    heading: "3. What should I know before interacting on-chain?",
    subheading:
      "Transactions are usually irreversible, fees vary with network load, and you are responsible for key safety and understanding smart-contract risk. Start with small amounts, verify contract addresses, and prefer audited code when possible.",
  },
];

export const Sociallinkdata: SocialType[] = [
  {
    imgsrc: asset("/images/footer/insta.svg"),
    href: "https://instagram.com/",
  },
  {
    imgsrc: asset("/images/footer/dribble.svg"),
    href: "https://dribble.com/",
  },
  {
    imgsrc: asset("/images/footer/twitter.svg"),
    href: "https://twitter.com/",
  },
  {
    imgsrc: asset("/images/footer/youtube.svg"),
    href: "https://youtube.com/",
  },
];

export const Footerlinkdata: FooterType[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services-section" },
  { label: "Networks", href: "/#network-section" },
  { label: "Features", href: "/#features-section" },
  { label: "FAQ", href: "/#faq-section" },
  { label: "Contact Us", href: "/#contact" },
];
