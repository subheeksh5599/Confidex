import type { Metadata } from "next";

export const siteConfig = {
  name: "Confidex",
  tagline: "Confidential Wrapper Registry Terminal",
  description:
    "Explore, shield, and unshield tokens from the Zama Protocol Wrappers Registry on Sepolia. Built for Zama Developer Program Season 3.",
  url: "https://confidex.vercel.app",
  ogImage: "/og-image.png",
  creator: "@zama",
  authors: [{ name: "Confidex", url: "https://confidex.vercel.app" }],
  keywords: ["Zama", "FHE", "confidential tokens", "ERC-7984", "wrapper registry", "Sepolia", "fhEVM"],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.creator,
  },
  icons: { icon: "/favicon.ico", apple: "/apple-icon.svg" },
};

export function createMetadata({
  title,
  description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: title ?? siteConfig.name, description: description ?? siteConfig.description, url: `${siteConfig.url}${path}` },
    twitter: { title: title ?? siteConfig.name, description: description ?? siteConfig.description },
  };
}
