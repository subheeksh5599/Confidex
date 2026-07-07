"use client";

import { useReadContracts } from "wagmi";
import { sepolia } from "wagmi/chains";
import { ZAMA_REGISTRY, REGISTRY_ABI, REGISTRY_SEEDS, CUSTOM_PAIRS, ZERO_ADDRESS, type TokenPair } from "@/lib/zama";

export function useRegistryPairs() {
  const { data, isLoading } = useReadContracts({
    contracts: [...REGISTRY_SEEDS, ...CUSTOM_PAIRS].map((s) => ({
      address: ZAMA_REGISTRY,
      abi: REGISTRY_ABI,
      functionName: "getConfidentialToken",
      args: [s.underlying],
      chainId: sepolia.id,
    })),
  });

  const allSeeds = [...REGISTRY_SEEDS, ...CUSTOM_PAIRS];
  const pairs: TokenPair[] = [];

  if (!data) return { pairs, isLoading, source: "loading" as const };

  allSeeds.forEach((seed, i) => {
    const result = data[i];
    const wrapper = (result?.result as string | undefined) ?? ZERO_ADDRESS;
    if (wrapper === ZERO_ADDRESS) return;
    pairs.push({ symbol: seed.symbol, name: seed.name, decimals: seed.decimals, underlying: seed.underlying, wrapper: wrapper as `0x${string}` });
  });

  return { pairs, isLoading, source: "onchain" as const };
}
