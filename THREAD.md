1/

Zama's Bounty Track this season asked for one thing: turn the Wrappers Registry into a usable product.

Here's what I built — Confidex.

confidex-wheat.vercel.app

2/

The problem Zama called out:

Developers spin up their own ERC-20 test tokens and ERC-7984 wrappers instead of using the ones already in the official registry. Ecosystem fragmented. No canonical place to point to.

3/

Confidex fixes that. It reads the on-chain Wrappers Registry at 0x2f07...a128e on Sepolia, surfaces all 7 registered pairs, and lets you:

- Shield (wrap ERC-20 → ERC-7984)
- Unshield (unwrap ERC-7984 → ERC-20)  
- Decrypt balances via EIP-712
- Use a built-in faucet for cTokenMocks

4/

Plus an extra: there's a "Custom Decrypt" panel where you can paste ANY ERC-7984 address and decrypt its balance. Not just the 7 registry pairs. Paste an address, sign once, see the encrypted balance.

5/

Built entirely on the @zama React SDK (@zama-fhe/react-sdk v3.2.0). Zero custom Solidity. Zero hand-rolled crypto. Every FHE operation — shield, unshield, EIP-712 reencrypt — is delegated to the audited SDK.

6/

The registry sourcing is hybrid:

- Primary: reads getConfidentialToken() from the live on-chain contract via wagmi useReadContracts
- Fallback: local config in lib/zama.ts for dev-only or unregistered pairs

Each pair is tagged "onchain" or "local" in the UI so you know the source.

7/

Adding a new pair takes two entries in one file. Add the underlying token + wrapper mapping, rebuild, deployed. Full documented process with a cDAI example in the README.

8/

Tech: Next.js 16 • TypeScript • Tailwind v4 • RainbowKit • wagmi • Motion • Zama SDK 3.2.0

Open source, deployed on Vercel, live on Sepolia.

9/

Built for @zama Developer Program Season 3 — Bounty Track.

Repo: github.com/subheeksh5599/Confidex  
Live: confidex-wheat.vercel.app

#ZamaDeveloperProgram
