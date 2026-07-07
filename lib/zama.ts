export interface TokenPair {
  symbol: string;
  name: string;
  wrapper: `0x${string}`;
  underlying: `0x${string}`;
  decimals: number;
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

const ZERO_ADDR = "0x0000000000000000000000000000000000000000";

const UNDERLYING_SEEDS = [
  { symbol: "cUSDC", name: "Confidential USDC Mock", underlying: "0x9b5Cd13b8eFbB58Dc25A05CF411D8056058aDFfF", decimals: 6 },
  { symbol: "cUSDT", name: "Confidential USDT Mock", underlying: "0xa7dA08FafDC9097Cc0E7D4f113A61e31d7e8e9b0", decimals: 6 },
  { symbol: "cWETH", name: "Confidential WETH Mock", underlying: "0xff54739b16576FA5402F211D0b938469Ab9A5f3F", decimals: 18 },
  { symbol: "cBRON", name: "Confidential BRON Mock", underlying: "0xFf021fB13cA64e5354c62c954b949a88cfDEb25E", decimals: 18 },
  { symbol: "cZAMA", name: "Confidential ZAMA Mock", underlying: "0x75355a85c6FB9df5f0C80FF54e8747EEe9a0BF57", decimals: 18 },
  { symbol: "ctGBP", name: "Confidential tGBP Mock", underlying: "0x93c931278A2aad1916783F952f94276eA5111442", decimals: 18 },
  { symbol: "cXAUt", name: "Confidential XAUt Mock", underlying: "0x24377AE4AA0C45ecEe71225007f17c5D423dd940", decimals: 18 },
] as const;

export const REGISTRY_SEEDS = UNDERLYING_SEEDS;
export const CUSTOM_PAIRS: { underlying: `0x${string}`; symbol: string; name: string; decimals: number }[] = [];
export const ZERO_ADDRESS = ZERO_ADDR;

export const MINT_AMOUNTS: Record<string, bigint> = {
  "0x9b5Cd13b8eFbB58Dc25A05CF411D8056058aDFfF": 1_000_000n * 10n ** 6n,
  "0xa7dA08FafDC9097Cc0E7D4f113A61e31d7e8e9b0": 1_000_000n * 10n ** 6n,
  "0xff54739b16576FA5402F211D0b938469Ab9A5f3F": 1000n * 10n ** 18n,
  "0xFf021fB13cA64e5354c62c954b949a88cfDEb25E": 10_000n * 10n ** 18n,
  "0x75355a85c6FB9df5f0C80FF54e8747EEe9a0BF57": 10_000n * 10n ** 18n,
  "0x93c931278A2aad1916783F952f94276eA5111442": 10_000n * 10n ** 18n,
  "0x24377AE4AA0C45ecEe71225007f17c5D423dd940": 100n * 10n ** 18n,
};

export function truncateAddress(addr: string): string { return `${addr.slice(0, 6)}...${addr.slice(-4)}`; }
export function getBlockscoutUrl(addr: string): string { return `https://eth-sepolia.blockscout.com/address/${addr}`; }
