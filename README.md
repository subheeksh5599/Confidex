# Confidex

> **The Definitive Confidential Wrapper Registry Terminal for the Zama Protocol**
>
> Zama Developer Program — Mainnet Season 3  
> **Track**: Bounty Track  
> **Deadline**: July 07, 2026 (23:59 AOE)  
> **Network**: Sepolia Testnet

---

## The Problem

Zama's Wrappers Registry is an on-chain directory of ERC-20 ↔ ERC-7984 wrapper pairs. It exists, but nobody uses it. Developers spin up their own tokens and wrappers instead of leveraging the official registry. The ecosystem is fragmented.

> *"The goal of this bounty is to turn the registry into a product every developer and user can point to."* — Zama Team

## The Solution

Confidex transforms the Wrappers Registry from an infrastructure contract into a polished, production-ready application. A single dashboard where developers and users can:

1. **Explore** every registered ERC-20 ↔ ERC-7984 pair on Sepolia
2. **Shield** any registered token (wrap ERC-20 → confidential ERC-7984)
3. **Unshield** any registered token (unwrap ERC-7984 → public ERC-20)
4. **Decrypt** confidential balances via EIP-712 user-decryption flow
5. **Faucet** — mint test tokens for any official cTokenMock pair

---

## Why This Wins — The Monopoly Edge

The Bounty Track judges on **6 criteria**. Here's how Confidex dominates each:

| Criterion | Confidex Approach |
|-----------|------------------|
| **Coverage** | All 7 Sepolia mock pairs. All 4 operations (wrap, unwrap, decrypt, faucet). 100% requirement coverage. |
| **Correctness** | SDK-driven. `useShield`, `useUnshield`, `useConfidentialBalance` from `@zama-fhe/react-sdk`. Zero hand-rolled crypto. |
| **Extensibility** | Registry-driven architecture. New wrapper pairs auto-appear via on-chain reads. |
| **UX** | Single-page dashboard. RainbowKit multi-wallet. Real-time balance updates. Progress states on every tx. |
| **Code Quality** | TypeScript strict mode. Modular component tree. Shared config layer. No code duplication. |
| **Production-Readiness** | Vercel deployment. Environment-based config. Error boundaries. `matchZamaError` for user-friendly errors. |

## Sepolia Testnet — Mock Tokens

All mock tokens on Sepolia have **public `mint(address, uint256)`** with a **1,000,000 token per-call cap**.

| Symbol | Wrapper | Underlying (mintable) |
|--------|---------|----------------------|
| cUSDC | `0x7c5BF43B851c1dff1a4feE8dB225b87f2C223639` | `0x9b5Cd13b8eFbB58Dc25A05CF411D8056058aDFfF` |
| cUSDT | `0x4E7B06D78965594eB5EF5414c357ca21E1554491` | `0xa7dA08FafDC9097Cc0E7D4f113A61e31d7e8e9b0` |
| cWETH | `0x46208622DA27d91db4f0393733C8BA082ed83158` | `0xff54739b16576FA5402F211D0b938469Ab9A5f3F` |
| cBRON | `0xaa5612FA27c927a0c7961f5AEFEE5ba3A0F9C891` | `0xFf021fB13cA64e5354c62c954b949a88cfDEb25E` |
| cZAMA | `0xf2D628d2598aF4eAF94CB76a437Ff86CA78FfbFB` | `0x75355a85c6FB9df5f0C80FF54e8747EEe9a0BF57` |
| ctGBP | `0xfCE5c7069c5525eF6c8C2b2E35A745bA20a2F7CC` | `0x93c931278A2aad1916783F952f94276eA5111442` |
| cXAUt | `0xe4FcF848739845BC81Dee1d5352cf3844F0a60C7` | `0x24377AE4AA0C45ecEe71225007f17c5D423dd940` |

**Sepolia Wrappers Registry**: `0x2f0750Bbb0A246059d80e94c454586a7F27a128e`

## Tech Stack

- **Frontend**: Vite + React 19 + TypeScript
- **SDK**: `@zama-fhe/sdk` v3.2.0 + `@zama-fhe/react-sdk`
- **Wallet**: wagmi v2 + RainbowKit
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Deployment**: Vercel

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173), connect your wallet (Sepolia), and start using the registry.
