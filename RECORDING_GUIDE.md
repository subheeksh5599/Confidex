# Confidex — Video Recording Guide

**Format**: 3 minutes maximum. Real person. No AI voice. Screen recording with your face in a corner frame works best.
**Submit to**: Zama Developer Program S3 — Bounty Track

## Before Recording

1. Install MetaMask with Sepolia testnet configured
2. Get Sepolia ETH for gas at sepoliafaucet.com
3. Have `lib/zama.ts` open in VS Code for scene 6
4. Test the full flow once: connect → mint → shield → decrypt → custom decrypt → unshield

## Shot-by-shot

### Scene 1 — Landing page (0:00–0:20)

- Open `confidex-wheat.vercel.app`
- Scroll down through Hero, How It Works, Features
- Say: "Confidex is the Confidential Wrapper Registry Terminal for the Zama Protocol. Built for the Season 3 Bounty Track. Every wrapper address is resolved live from the on-chain registry — zero hardcoded data."

### Scene 2 — Dashboard + Wallet (0:20–0:45)

- Click "Launch App" to `/dashboard`
- Show the "Connect your wallet" prompt
- Click "Connect Wallet" → MetaMask → approve
- Point to the header showing "onchain" badge
- Say: "The dashboard calls getConfidentialToken on the official WrappersRegistry at 0x2f0750. Seven underlying tokens are seeded from Zama's documented registry entries, but every wrapper address is resolved live on-chain via viem readContract."

### Scene 3 — Custom Decrypt (0:45–1:10)

- In the "Custom Token Decrypt" box, paste the cUSDC wrapper address: `0x7c5BF43B851c1dff1a4feE8dB225b87f2C223639`
- Click "Decrypt"
- Show the EIP-712 signature prompt in MetaMask — click Sign
- Point to the decrypted balance appearing below the input
- Say: "The Custom Decrypt panel works on any ERC-7984 token address — not just registry pairs. It uses the EIP-712 user-decryption flow and renders in a separate sub-component so an empty address never reaches viem. This covers the requirement for decrypting any token, not only registered ones."

### Scene 4 — Faucet (1:10–1:30)

- Click "Mint All" at the top of the page
- Let one or two transactions confirm, then say: "The built-in faucet mints from all seven underlying mock contracts. Mint amounts are keyed by underlying address in MINT_AMOUNTS. No external faucet needed — it's all in-app."
- Click over to MetaMask to show one confirmation, then skip the rest

### Scene 5 — Shield / Wrap (1:30–2:00)

- Scroll to the cUSDC card
- Enter "500" in the input
- Click "Shield (Wrap)"
- Approve in MetaMask — show the first transaction confirming
- After confirm: point to the decrypted balance appearing in the card
- Say: "Shielding converts public ERC-20 to confidential ERC-7984. The Zama SDK auto-detects approve+wrap vs ERC-1363 single-tx. After shielding, the balance shows on-chain — encrypted. Only the wallet owner can decrypt it via EIP-712."

### Scene 6 — Unshield (2:00–2:20)

- Toggle the cUSDC card to "Unshield (Unwrap)"
- Enter "200", click "Unshield (Unwrap)"
- Show the two-step progress — "Unwrap submitted..." → "Finalizing..." → "Complete"
- Note the balance updates after completion
- Say: "Unshielding is a two-step flow — unwrap burns the confidential tokens, then finalize completes the decryption proof through the KMS network. The SDK orchestrates both steps including progress callbacks."

### Scene 7 — Adding a new pair (2:20–2:50)

- Switch to VS Code showing `lib/zama.ts`
- Point to `REGISTRY_SEEDS`
- Say: "Adding a new pair takes one entry in REGISTRY_SEEDS — symbol, name, the underlying ERC-20 address, and decimals. If the token is registered in the on-chain WrappersRegistry, the wrapper address resolves automatically via getConfidentialToken. For unregistered pairs, add them to CUSTOM_PAIRS. Fully documented in the README with a step-by-step cDAI example."
- Then point to the `REGISTRY_ABI`, the `ZAMA_REGISTRY` address, and the `readContract` call in `hooks/useRegistry.ts`
- Say: "The hook iterates all seeds, calls readContract on the registry for each one, skips zero-address results, and returns only verified pairs. Source code is clean and documented."

### Scene 8 — Outro (2:50–3:00)

- Show the GitHub repo page
- Say: "Confidex is open source under BSD-3-Clear. Zero custom Solidity — all FHE is handled by the Zama SDK. Deployed on Vercel, live on Sepolia. Confidex — the Wrappers Registry, productized."

## Key talking points to hit

These are what judges check against. Make sure you cover them:

1. "Wrapper addresses resolved live from on-chain registry — no hardcoded data"
2. "Custom Decrypt works on any ERC-7984 token, not just registry pairs"
3. "EIP-712 user-decryption flow handled by Zama SDK"
4. "Built-in faucet for cTokenMocks"
5. "How to add a new pair — one entry in REGISTRY_SEEDS"
6. "Error handling for network mismatch, insufficient balance, and signing rejections"
7. "Open source, deployed, live on Sepolia"

## After Recording

1. Upload to YouTube as unlisted
2. Submit in Zama Developer Program submission form
3. Post the thread from THREAD.md on X tagging @zama #ZamaDeveloperProgram
