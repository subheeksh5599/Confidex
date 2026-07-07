# Confidex — Video Recording Guide

**Format**: 3 minutes maximum. Real person on camera. No AI voice.
**Submit to**: Zama Developer Program S3 — Bounty Track

## What You Must Show (6 scenes)

### Scene 1: Landing page (0:00–0:15)
- Open `confidex-wheat.vercel.app`
- Scroll down to show the sections
- Say: "Confidex — the Confidential Wrapper Registry Terminal for the Zama Protocol. Built for the Season 3 Bounty Track."

### Scene 2: Dashboard + Wallet connect (0:15–0:35)
- Click "Launch App" to go to `/dashboard`
- Click "Connect Wallet" → MetaMask → switch to Sepolia
- Say: "The dashboard reads wrapper pairs directly from the on-chain registry at 0x2f0750. Every pair is resolved via getConfidentialToken() — no hardcoded data."

### Scene 3: Faucet (0:35–1:00)
- Click "Mint All"
- Wait for 7 transactions to confirm
- Say: "The built-in faucet mints tokens from all 7 underlying mock contracts. These are the official cTokenMocks from the Zama Wrappers Registry."

### Scene 4: Shield (Wrap) (1:00–1:35)
- Find the cUSDC card
- Enter "500" in the input
- Click "Shield (Wrap)"
- Confirm the MetaMask transaction(s)
- After confirm: point to the decrypted balance showing up
- Say: "Shielding converts public ERC-20 tokens into confidential ERC-7984. The Zama SDK auto-detects the path — ERC-1363 vs approve+wrap — no manual config needed. After shielding, the balance is encrypted on-chain."

### Scene 5: Custom Decrypt + Unshield (1:35–2:10)
- Show the Custom Decrypt panel at the top
- Paste the cUSDC wrapper address into the input
- Click "Decrypt" — sign the EIP-712 permit
- Show the decrypted balance appearing
- Say: "The Custom Decrypt panel works on ANY ERC-7984 token — not just registry pairs. It uses the EIP-712 user-decryption flow through the Zama Gateway and KMS threshold network."
- Now go to the cUSDC card, toggle to Unshield
- Enter "200", click "Unshield (Unwrap)"
- Show the two-step progress (unwrap → finalize)
- Say: "Unshielding is a two-step flow. The SDK orchestrates the unwrap call, waits for the decryption proof, then finalizes."

### Scene 6: How to add a new pair (2:10–2:40)
- Show `lib/zama.ts` in the editor
- Point to `REGISTRY_SEEDS` array
- Say: "Adding a new pair takes one entry in REGISTRY_SEEDS — symbol, name, underlying address, and decimals. If the token is registered in the on-chain registry, the wrapper address resolves automatically. For custom pairs not yet registered, add them to CUSTOM_PAIRS. Fully documented in the README with a cDAI example."

### Scene 7: Outro (2:40–3:00)
- Show the GitHub repo quickly
- Say: "Confidex is open source under BSD-3-Clear. Built with the Zama React SDK — zero custom Solidity, zero hand-rolled crypto. Live at confidex-wheat.vercel.app. Thank you."

## Before Recording

1. Have MetaMask installed with Sepolia testnet configured
2. Have some Sepolia ETH for gas (get from a faucet like sepoliafaucet.com)
3. Clear your wallet of any existing token approvals on Sepolia to show the full flow
4. Have VS Code open with `lib/zama.ts` ready for Scene 6
5. Test the full flow once before recording: connect → mint → shield 500 cUSDC → decrypt → unshield → custom decrypt

## After Recording

1. Upload to YouTube as unlisted
2. Submit the link in the Zama Developer Program submission form
3. Post the thread from THREAD.md on X tagging @zama with #ZamaDeveloperProgram
