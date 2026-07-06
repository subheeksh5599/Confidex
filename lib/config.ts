export const siteConfig = {
  name: "Confidex",
  tagline: "Confidential Wrapper Registry Terminal for the Zama Protocol",
  description: "Explore, shield, and unshield confidential ERC-7984 tokens on the Zama Protocol. Built on fhEVM — fully homomorphic encryption for public blockchains.",
  url: "https://confidex.vercel.app",
  social: { twitter: "@zama", github: "https://github.com/subheeksh5599/Confidex" },
  nav: { cta: { text: "Launch App", href: "/dashboard" }, signIn: { text: "Docs", href: "https://docs.zama.org/protocol" } },
} as const;

export const heroConfig = {
  headline: { prefix: "Confidential", accent: "ERC-7984", suffix: "Token Registry" },
  description: "Explore, shield, and unshield confidential tokens on the Zama Protocol. Built on fhEVM — fully homomorphic encryption for public blockchains. Deployed on Sepolia testnet.",
  cta: { primary: { text: "Launch App", href: "/dashboard" }, secondary: { text: "Zama Docs", href: "https://docs.zama.org/protocol" } },
  carousel: ["USDC", "USDT", "WETH", "BRON", "ZAMA", "tGBP", "XAUt"],
} as const;

export const howItWorksConfig = {
  title: "How it works",
  description: "Three steps from public ERC-20 to confidential ERC-7984 tokens on the Zama Protocol.",
  cta: { text: "Try it now", href: "/dashboard" },
} as const;

export const featuresConfig = { title: "Everything you need", description: "A complete terminal for the Zama Wrappers Registry." } as const;
export const statsConfig = { title: "Zama Protocol Stats", description: "The ecosystem is growing fast." } as const;
export const testimonialsConfig = { title: "Backed by Industry Leaders" } as const;

export const pricingConfig = {
  title: "Open Source",
  description: "Confidex is fully open source. Built for the Zama Developer Program Season 3 Bounty Track.",
  cta: { primary: { text: "View on GitHub", href: "https://github.com/subheeksh5599/Confidex" }, secondary: { text: "Launch App", href: "/dashboard" } },
} as const;

export const faqConfig = { title: "FAQ", contact: { text: "Questions about the Zama Protocol?", cta: { text: "Zama Docs", href: "https://docs.zama.org/protocol" } } } as const;
export const finalCtaConfig = { headline: "Ready to explore confidential tokens?", description: "Connect your Sepolia wallet and start shielding tokens on the Zama Protocol.", cta: { text: "Launch App", href: "/dashboard" } } as const;
export const footerConfig = {
  description: "Confidex is the definitive Wrapper Registry Terminal for the Zama Protocol. Explore, shield, and unshield confidential ERC-7984 tokens on Sepolia testnet.",
  cta: { text: "Launch App", href: "/dashboard" },
  links: {
    product: [{ label: "Dashboard", href: "/dashboard" }, { label: "Zama Protocol", href: "https://zama.org" }, { label: "Developer Hub", href: "https://docs.zama.org/protocol" }, { label: "Wrappers Registry", href: "https://eth-sepolia.blockscout.com/address/0x2f0750Bbb0A246059d80e94c454586a7F27a128e" }],
    company: [{ label: "GitHub", href: "https://github.com/subheeksh5599/Confidex" }, { label: "X / Twitter", href: "https://x.com/zama" }, { label: "Telegram", href: "https://t.me/zama_on_telegram" }, { label: "Discord", href: "https://discord.gg/zama" }],
  },
  contact: { location: "Sepolia Testnet", address: "Zama Protocol\nConfidential Token Registry", hours: "Zama Developer Program Season 3", email: "developer@zama.org" },
  copyright: `Confidex - Zama Developer Program Season 3`,
} as const;

export const features = { smoothScroll: true, darkMode: true, ditherCursor: false, statsSection: true } as const;
