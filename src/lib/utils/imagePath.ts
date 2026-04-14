import { SITE_BASE_PATH } from "@/lib/siteBasePath";

export { SITE_BASE_PATH };

export const getImagePath = (path: string): string => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_BASE_PATH}${normalized}`;
};
