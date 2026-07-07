export interface TokenPair {
  symbol: string;
  name: string;
  wrapper: `0x${string}`;
  underlying: `0x${string}`;
  decimals: number;
  source: "onchain" | "local";
}

export const ZAMA_REGISTRY = "0x2f0750Bbb0A246059d80e94c454586a7F27a128e";

export const REGISTRY_ABI = [
  {
    type: "function",
    name: "getConfidentialToken",
    inputs: [{ name: "erc20", type: "address", internalType: "address" }],
    outputs: [{ name: "confidentialToken", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUnderlyingToken",
    inputs: [{ name: "wrapper", type: "address", internalType: "address" }],
    outputs: [{ name: "underlyingToken", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
] as const;

const SEPOLIA_UNDERLYINGS = [
  { symbol: "cUSDC", name: "Confidential USDC Mock", underlying: "0x9b5Cd13b8eFbB58Dc25A05CF411D8056058aDFfF", decimals: 6 },
  { symbol: "cUSDT", name: "Confidential USDT Mock", underlying: "0xa7dA08FafDC9097Cc0E7D4f113A61e31d7e8e9b0", decimals: 6 },
  { symbol: "cWETH", name: "Confidential WETH Mock", underlying: "0xff54739b16576FA5402F211D0b938469Ab9A5f3F", decimals: 18 },
  { symbol: "cBRON", name: "Confidential BRON Mock", underlying: "0xFf021fB13cA64e5354c62c954b949a88cfDEb25E", decimals: 18 },
  { symbol: "cZAMA", name: "Confidential ZAMA Mock", underlying: "0x75355a85c6FB9df5f0C80FF54e8747EEe9a0BF57", decimals: 18 },
  { symbol: "ctGBP", name: "Confidential tGBP Mock", underlying: "0x93c931278A2aad1916783F952f94276eA5111442", decimals: 18 },
  { symbol: "cXAUt", name: "Confidential XAUt Mock", underlying: "0x24377AE4AA0C45ecEe71225007f17c5D423dd940", decimals: 18 },
] as const;

const KNOWN_WRAPPERS: Record<string, `0x${string}`> = {
  "0x9b5Cd13b8eFbB58Dc25A05CF411D8056058aDFfF": "0x7c5BF43B851c1dff1a4feE8dB225b87f2C223639",
  "0xa7dA08FafDC9097Cc0E7D4f113A61e31d7e8e9b0": "0x4E7B06D78965594eB5EF5414c357ca21E1554491",
  "0xff54739b16576FA5402F211D0b938469Ab9A5f3F": "0x46208622DA27d91db4f0393733C8BA082ed83158",
  "0xFf021fB13cA64e5354c62c954b949a88cfDEb25E": "0xaa5612FA27c927a0c7961f5AEFEE5ba3A0F9C891",
  "0x75355a85c6FB9df5f0C80FF54e8747EEe9a0BF57": "0xf2D628d2598aF4eAF94CB76a437Ff86CA78FfbFB",
  "0x93c931278A2aad1916783F952f94276eA5111442": "0xfCE5c7069c5525eF6c8C2b2E35A745bA20a2F7CC",
  "0x24377AE4AA0C45ecEe71225007f17c5D423dd940": "0xe4FcF848739845BC81Dee1d5352cf3844F0a60C7",
};

export function buildLocalPairs(): TokenPair[] {
  return SEPOLIA_UNDERLYINGS.map((u) => {
    const wrapper = KNOWN_WRAPPERS[u.underlying.toLowerCase()];
    return { symbol: u.symbol, name: u.name, decimals: u.decimals, underlying: u.underlying as `0x${string}`, wrapper: wrapper ?? u.underlying as `0x${string}`, source: "local" as const };
  });
}

export const SEPOLIA_PAIRS: TokenPair[] = buildLocalPairs();

export const MINT_AMOUNT: Record<string, bigint> = {
  USDC: 1_000_000n * 10n ** 6n, USDT: 1_000_000n * 10n ** 6n, WETH: 1000n * 10n ** 18n,
  BRON: 10_000n * 10n ** 18n, ZAMA: 10_000n * 10n ** 18n, tGBP: 10_000n * 10n ** 18n, XAUt: 100n * 10n ** 18n,
};

export function truncateAddress(addr: string): string { return `${addr.slice(0, 6)}...${addr.slice(-4)}`; }
export function getBlockscoutUrl(addr: string): string { return `https://eth-sepolia.blockscout.com/address/${addr}`; }
