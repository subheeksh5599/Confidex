"use client";

import { useEffect, useState } from "react";
import { usePublicClient } from "wagmi";
import { sepolia } from "wagmi/chains";
import { ZAMA_REGISTRY, REGISTRY_ABI, REGISTRY_SEEDS, CUSTOM_PAIRS, ZERO_ADDRESS, type TokenPair } from "@/lib/zama";

export function useRegistryPairs() {
  const [pairs, setPairs] = useState<TokenPair[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const publicClient = usePublicClient({ chainId: sepolia.id });

  useEffect(() => {
    if (!publicClient) return;
    let cancelled = false;
    const seeds = [...REGISTRY_SEEDS, ...CUSTOM_PAIRS];

    async function resolve() {
      const results: TokenPair[] = [];
      for (const seed of seeds) {
        try {
          const wrapper = await publicClient!.readContract({
            address: ZAMA_REGISTRY,
            abi: REGISTRY_ABI as any,
            functionName: "getConfidentialToken",
            args: [seed.underlying],
          }) as string;
          if (wrapper && wrapper !== ZERO_ADDRESS) {
            results.push({ symbol: seed.symbol, name: seed.name, decimals: seed.decimals, underlying: seed.underlying, wrapper: wrapper as `0x${string}` });
          }
        } catch (e) {
          console.error("Registry read failed for", seed.symbol, e);
        }
      }
      if (!cancelled) { setPairs(results); setIsLoading(false); }
    }

    resolve();
    return () => { cancelled = true; };
  }, [publicClient]);

  return { pairs, isLoading, source: "onchain" as const };
}
