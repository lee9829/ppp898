const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (configuredUrl
  ? configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`
  : "https://ppp898.vercel.app"
).replace(/\/$/, "");

export const siteName = "강남의밤";
export const phoneNumber = "010-4690-4050";
export const phoneHref = "tel:01046904050";
