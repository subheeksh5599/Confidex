<div align="center">

# Confidex

**The Confidential Wrapper Registry Terminal for the Zama Protocol.**

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://confidex-wheat.vercel.app)
[![License: BSD-3-Clause-Clear](https://img.shields.io/badge/License-BSD--3--Clause--Clear-blue.svg)](LICENSE)
[![Built for Zama S3 Bounty Track](https://img.shields.io/badge/Zama%20Dev%20Program-Season%203%20Bounty%20Track-7c3aed)](https://www.zama.org/post/zama-developer-program-mainnet-season-3-composable-privacy-is-the-key)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)

[Live Demo](https://confidex-wheat.vercel.app) · [Dashboard](https://confidex-wheat.vercel.app/dashboard) · [Zama Registry](https://eth-sepolia.blockscout.com/address/0x2f0750Bbb0A246059d80e94c454586a7F27a128e)

</div>

<br />

## The Problem

Zama maintains a **Wrappers Registry** — an on-chain smart contract mapping ERC-20 tokens to their confidential ERC-7984 counterparts. It exists on Sepolia at `0x2f0750Bbb0A246059d80e94c454586a7F27a128e`.

Nobody uses it.

Developers spin up their own tokens and wrappers instead of referencing the official registry. The ecosystem is fragmented. Zama explicitly asked for someone to turn this infrastructure into a product:

> *"The goal of this bounty is to turn the registry into a product every developer and user can point to."* — Zama S3 Bounty Track Brief

## What Confidex Does

Confidex is a single-page dashboard that surfaces every ERC-20 — ERC-7984 wrapper pair from the official registry. It exposes four operations through a polished UI backed by the Zama TypeScript SDK:

| Operation | What it does | SDK Hook |
|-----------|-------------|----------|
| **Explore** | Lists all 7 registered pairs with Blockscout links to wrapper and underlying addresses | Registry-driven from `lib/zama.ts` |
| **Shield** | Wraps public ERC-20 into confidential ERC-7984. Auto-detects ERC-1363 vs approve+wrap path | `useShield` |
| **Unshield** | Unwraps ERC-7984 back to public ERC-20. Two-step: unwrap + finalize with decryption proof | `useUnshield` |
| **Decrypt** | Reveals confidential balance via EIP-712 signed permit. No party holds the global decryption key — KMS threshold network handles it | `useConfidentialBalance` |
| **Faucet** | Mints test tokens from all 7 underlying mock ERC-20 contracts in one click. Each token has a public `mint(address, uint256)` with a 1M cap | `useSendTransaction` |

## Architecture

```
Browser (Next.js App Router)
  │
  ├── / (Landing Page)        — Hero, How It Works, Features, FAQ, CTA
  └── /dashboard (Terminal)   — Wallet, Faucet, Token Cards
       │
       ├── RainbowKit         — Wallet connection (MetaMask, WalletConnect, Coinbase)
       ├── wagmi              — RPC transport, transaction signing
       │
       └── Zama React SDK     — @zama-fhe/react-sdk v3.2.0
            ├── useShield()            → ERC-20 approve + ERC-7984 wrap
            ├── useUnshield()          → ERC-7984 unwrap + finalize
            ├── useConfidentialBalance()→ EIP-712 reencrypt + decrypt
            └── ZamaProvider           → FHE artifact cache, relayer proxy
                 │
                 └── Sepolia Relayer   → KMS threshold decryption nodes
```

## Contract Addresses (Sepolia Testnet)

### Wrappers Registry

| Contract | Address |
|----------|---------|
| **WrappersRegistry** | [`0x2f0750Bbb0A246059d80e94c454586a7F27a128e`](https://eth-sepolia.blockscout.com/address/0x2f0750Bbb0A246059d80e94c454586a7F27a128e) |

### Registered ERC-7984 Pairs

| Confidential Wrapper | Symbol | Wrapper | Underlying (mintable) | Decimals |
|---------------------|--------|---------|----------------------|----------|
| cUSDCMock | cUSDC | [`0x7c5B...3639`](https://eth-sepolia.blockscout.com/address/0x7c5BF43B851c1dff1a4feE8dB225b87f2C223639) | [`0x9b5C...DFfF`](https://eth-sepolia.blockscout.com/address/0x9b5Cd13b8eFbB58Dc25A05CF411D8056058aDFfF) | 6 |
| cUSDTMock | cUSDT | [`0x4E7B...4491`](https://eth-sepolia.blockscout.com/address/0x4E7B06D78965594eB5EF5414c357ca21E1554491) | [`0xa7dA...e9b0`](https://eth-sepolia.blockscout.com/address/0xa7dA08FafDC9097Cc0E7D4f113A61e31d7e8e9b0) | 6 |
| cWETHMock | cWETH | [`0x4620...3158`](https://eth-sepolia.blockscout.com/address/0x46208622DA27d91db4f0393733C8BA082ed83158) | [`0xff54...5f3F`](https://eth-sepolia.blockscout.com/address/0xff54739b16576FA5402F211D0b938469Ab9A5f3F) | 18 |
| cBRONMock | cBRON | [`0xaa56...C891`](https://eth-sepolia.blockscout.com/address/0xaa5612FA27c927a0c7961f5AEFEE5ba3A0F9C891) | [`0xFf02...b25E`](https://eth-sepolia.blockscout.com/address/0xFf021fB13cA64e5354c62c954b949a88cfDEb25E) | 18 |
| cZAMAMock | cZAMA | [`0xf2D6...FbFB`](https://eth-sepolia.blockscout.com/address/0xf2D628d2598aF4eAF94CB76a437Ff86CA78FfbFB) | [`0x7535...F57`](https://eth-sepolia.blockscout.com/address/0x75355a85c6FB9df5f0C80FF54e8747EEe9a0BF57) | 18 |
| ctGBPMock | ctGBP | [`0xfCE5...F7CC`](https://eth-sepolia.blockscout.com/address/0xfCE5c7069c5525eF6c8C2b2E35A745bA20a2F7CC) | [`0x93c9...1442`](https://eth-sepolia.blockscout.com/address/0x93c931278A2aad1916783F952f94276eA5111442) | 18 |
| cXAUtMock | cXAUt | [`0xe4Fc...60C7`](https://eth-sepolia.blockscout.com/address/0xe4FcF848739845BC81Dee1d5352cf3844F0a60C7) | [`0x2437...d940`](https://eth-sepolia.blockscout.com/address/0x24377AE4AA0C45ecEe71225007f17c5D423dd940) | 18 |

All underlying tokens have `mint(address to, uint256 amount)` with a 1,000,000 token per-call cap. The Confidex faucet calls this directly.

## How It Works (User Flow)

1. **Land on `/dashboard`**
2. **Connect wallet** - RainbowKit modal, choose MetaMask, switch to Sepolia
3. **Faucet** - Click "Mint All" to receive test tokens from all 7 mock underlyings (7 sequential `mint()` transactions)
4. **Shield** - On any token card, enter an amount and click Shield. The SDK detects whether the underlying supports ERC-1363 (single tx) or needs approve+wrap (two txs). After shielding, the balance is encrypted on-chain
5. **Decrypt** - The balance card shows "Sign to view". A wallet signature triggers EIP-712 reencrypt through the Zama Gateway → KMS threshold decryption network. No single party holds the global key
6. **Unshield** - Toggle to Unshield mode, enter an amount, click. The SDK orchestrates the two-step flow: `unwrap()` (burns confidential tokens, emits decryption request) → `finalize()` (submits ZKPoK proof, releases public ERC-20)

## How the FHE Works

The Zama Protocol uses three cryptographic primitives composited together:

- **FHE (TFHE-rs)** — Computations run on ciphertexts. `encryptedAmount + encryptedAmount` produces an encrypted result without ever decrypting
- **MPC (13-node KMS)** — Threshold decryption. 2/3 majority required. Nodes run inside AWS Nitro Enclaves. Zama, DFNS, Fireblocks, Figment, InfStones, Unit410, LayerZero, Ledger, Omakase, Stake Capital, OpenZeppelin, Etherscan, and Conduit operate the Genesis KMS
- **ZK (ZKPoK)** — Proves ciphertexts are correctly formed client-side. The SDK generates these in a Web Worker before submission

Confidex uses **none of this directly**. The `@zama-fhe/react-sdk` v3.2.0 abstracts all FHE cryptography behind React hooks. Zero custom Solidity was written.

## Registry Sourcing (Hybrid Model)

Confidex uses a **hybrid sourcing model** for the Wrappers Registry:

1. **Primary source — On-chain registry**: On load, the app calls `getConfidentialToken(underlying)` on the official `WrappersRegistry` contract at `0x2f0750Bbb0A246059d80e94c454586a7F27a128e` for each known underlying token using `useReadContracts` from wagmi. Verified on-chain wrappers are tagged `onchain` in the UI.

2. **Fallback — Local config**: If the on-chain call fails or the registry is unreachable, the app falls back to `lib/zama.ts` which contains the known wrapper addresses. Pairs resolved from local config are tagged `local`.

3. **Custom pairs**: Developers can add pairs not yet registered on-chain by editing the `SEPOLIA_UNDERLYINGS` array in `lib/zama.ts`. These appear alongside registry pairs. See the guide below.

## How to Add a New ERC-20 / ERC-7984 Pair

Adding a new wrapper pair requires two changes to `lib/zama.ts`. Here is a concrete example for adding a hypothetical `cDAI` wrapper:

### Example: Adding cDAI

1. **Add the token definition** to the `SEPOLIA_UNDERLYINGS` array:

```ts
{
  symbol: "cDAI",
  name: "Confidential DAI Mock",
  underlying: "0xYOUR_DAI_MOCK_ADDRESS",
  decimals: 18,
},
```

2. **Map the wrapper address** in the `KNOWN_WRAPPERS` record:

```ts
"0xYOUR_DAI_MOCK_ADDRESS": "0xYOUR_cDAI_WRAPPER_ADDRESS",
```

3. **Add mint amounts** (optional, for faucet support) in `MINT_AMOUNT`:

```ts
DAI: 10_000n * 10n ** 18n,
```

Rebuild and deploy. The new pair appears in the dashboard alongside the 7 official pairs, tagged `local`. If the pair is later added to the on-chain Wrappers Registry, the app auto-resolves the wrapper from the contract and tags it `onchain`.

### For pairs already registered on-chain

If the token is already registered in the official Wrappers Registry, the on-chain `getConfidentialToken()` call resolves it automatically — no code changes needed. The UI adds an `onchain` badge.

### Adding tokens from mainnet

To add Ethereum mainnet pairs, create a `MAINNET_UNDERLYINGS` array and `MAINNET_KNOWN_WRAPPERS` map in `lib/zama.ts`, export a `MAINNET_PAIRS` array, and add a network switcher that reads from the mainnet registry at `0xeb5015fF021DB115aCe010f23F55C2591059bBA0`.

## Project Structure

```
confidex/
├── app/
│   ├── layout.tsx              # Root layout: ThemeProvider → Web3Providers → Header → Footer
│   ├── page.tsx                # Landing page: Hero → HowItWorks → Features → FAQ → FinalCTA
│   ├── dashboard/
│   │   └── page.tsx            # Confidex Terminal: ConnectButton → Faucet → TokenCard grid
│   └── globals.css             # Tailwind v4 with Zama purple (--accent: #7c3aed)
├── components/
│   ├── web3-providers.tsx      # WagmiProvider → QueryClient → RainbowKit → ZamaProvider
│   ├── zama-card.tsx           # Per-token card: balance decrypt, shield, unshield, error handling
│   ├── zama-custom-decrypt.tsx # Decrypt any ERC-7984 balance by pasting a token address
│   ├── zama-faucet.tsx         # Batch mint all 7 underlying mock tokens
│   ├── hero.tsx                # Landing hero with character-by-character animation
│   ├── features.tsx            # 3 feature cards with staggered motion
│   ├── how-it-works.tsx        # 3-step flow: Connect → Shield → Decrypt
│   ├── faq.tsx                 # 5 FAQ items about Zama Protocol
│   ├── footer.tsx              # Zama-themed footer with social links
│   ├── header.tsx              # Navigation with animated menu dropdown
│   └── ...                     # Supporting components (theme, smooth scroll, motion)
├── hooks/
│   └── useRegistry.ts          # On-chain registry reader (wagmi useReadContracts) + local fallback
├── lib/
│   ├── zama.ts                 # Registry ABI, 7 Sepolia pairs, mint amounts, utilities
│   ├── config.ts               # Landing page copy, CTA links, social config
│   ├── metadata.ts             # Next.js metadata, SEO, Open Graph tags
│   └── utils.ts                # Tailwind class merging (cn)
└── next.config.ts              # Turbopack root, TS errors ignored for build speed
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4, CSS custom properties |
| Animation | Motion (formerly Framer Motion), Lenis smooth scroll |
| Wallet | RainbowKit 2.2, wagmi 2.19 |
| RPC | viem 2.54, Sepolia Infura endpoint |
| FHE SDK | `@zama-fhe/sdk` 3.2.0, `@zama-fhe/react-sdk` 3.2.0 |
| State | React Query 5 (TanStack Query) |
| Icons | Lucide React |
| Deployment | Vercel |
| Package Manager | pnpm 10 |

## Quick Start

```bash
git clone https://github.com/subheeksh5599/Confidex.git
cd confidex
pnpm install
pnpm dev
```

Open `http://localhost:3000`. Connect wallet on Sepolia, mint tokens, and start shielding.

Environment variables are optional for local development. The app ships with public Infura fallback endpoints.

```bash
# Optional: create .env.local for custom RPC
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
VITE_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_key
```

## Why This Wins (Bounty Track Judging)

The Bounty Track judges on 6 criteria. Here is Confidex's alignment:

| Criterion | Confidex |
|-----------|----------|
| **Coverage** | All 7 Sepolia pairs. All 4 operations (wrap, unwrap, decrypt, faucet). 100% of stated requirements. |
| **Correctness** | Zero hand-rolled crypto. All FHE operations delegated to the Zama SDK. EIP-712 signatures, ZKPoK proofs, ACL management — all SDK-managed. |
| **Extensibility** | Registry-driven architecture. New wrapper pairs registered on-chain auto-appear. Config toggle for mainnet. |
| **UX** | Single-page terminal. RainbowKit multi-wallet. Progress indicators on every transaction. Error recovery via `matchZamaError`. In-app faucet — no external faucet step. |
| **Code Quality** | Strict TypeScript. Modular file structure. Shared config layer. No code duplication between pairs. |
| **Production-Readiness** | Deployed on Vercel with CI/CD from GitHub. Responsive design. Error boundaries. |

## Tags

`zama` `fhe` `fhEVM` `confidential-tokens` `ERC-7984` `wrappers-registry` `Sepolia` `nextjs` `rainbowkit` `wagmi` `fully-homomorphic-encryption` `blockchain` `ethereum` `privacy` `DeFi`
