import { SEPOLIA_PAIRS, type TokenPair } from "../constants/tokens";

export function useRegistry() {
  return {
    pairs: SEPOLIA_PAIRS as readonly TokenPair[],
    getByWrapper: (addr: string) => SEPOLIA_PAIRS.find((p) => p.wrapper.toLowerCase() === addr.toLowerCase()),
    getByUnderlying: (addr: string) => SEPOLIA_PAIRS.find((p) => p.underlying.toLowerCase() === addr.toLowerCase()),
    getBySymbol: (sym: string) => SEPOLIA_PAIRS.find((p) => p.symbol.toLowerCase() === sym.toLowerCase()),
  };
}

export function useFaucet() {
  return { mintableUnderlyings: SEPOLIA_PAIRS.map((p) => ({ address: p.underlying, symbol: p.symbol.replace("c", "") })) };
}
