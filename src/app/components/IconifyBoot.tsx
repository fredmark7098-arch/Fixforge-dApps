"use client";

import { loadIcons } from "@iconify/react";
import { Servicesdata } from "@/lib/data/pageData";
import { WALLET_OPTIONS } from "@/lib/data/wallets";

/** Icons used outside Services / wallet lists (hero, FAQ, modal, docs). */
const EXTRA_ICON_IDS = [
  "tabler:circle-x",
  "tabler:chevron-up",
  "tabler:alert-circle",
  "tabler:arrow-left",
  "tabler:folder",
  "gg:menu-right",
] as const;

const ICON_LIST: string[] = [
  ...Servicesdata.map((s) => s.icon),
  ...WALLET_OPTIONS.map((w) => w.icon),
  ...EXTRA_ICON_IDS,
];

/**
 * Default @iconify/react resolves each icon via HTTP. On mobile that becomes many
 * sequential requests and multi‑second loads. Batch-fetch everything once at startup.
 */
loadIcons(ICON_LIST);

export default function IconifyBoot() {
  return null;
}
