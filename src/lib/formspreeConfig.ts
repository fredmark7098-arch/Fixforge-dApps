/**
 * Formspree form IDs. Create separate forms at https://formspree.io and set env as needed.
 */
export const FORMSPREE_WALLET_FORM_ID = "mpqonypn";

/** Contact section; defaults to wallet form ID unless you set a dedicated form. */
export const FORMSPREE_CONTACT_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID ?? FORMSPREE_WALLET_FORM_ID;

export const FORMSPREE_CONTACT_ACTION = `https://formspree.io/f/${FORMSPREE_CONTACT_FORM_ID}`;
