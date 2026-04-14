/**
 * Web3Forms access key (public; safe in client bundles). Override via env per environment.
 * @see https://web3forms.com
 */
export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
  "0f5fe730-e72d-41fb-9c4e-0435c42f9838";

export const WEB3FORMS_SUBMIT_URL = "https://api.web3forms.com/submit";

export type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

export async function submitWeb3Forms(
  fields: Record<string, string | undefined>
): Promise<void> {
  const body: Record<string, string> = {
    access_key: WEB3FORMS_ACCESS_KEY,
  };
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined && v !== "") {
      body[k] = v;
    }
  }

  const res = await fetch(WEB3FORMS_SUBMIT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  let data: Web3FormsResponse = {};
  try {
    data = (await res.json()) as Web3FormsResponse;
  } catch {
    /* ignore */
  }

  if (!res.ok || data.success !== true) {
    const msg =
      typeof data.message === "string" && data.message
        ? data.message
        : `Could not send (${res.status})`;
    throw new Error(msg);
  }
}
