"use client";

import { useEffect, useState } from "react";
import { createPublicClient, http, type PublicClient } from "viem";
import { sepolia } from "wagmi/chains";
import { ZAMA_REGISTRY, REGISTRY_ABI, REGISTRY_SEEDS, CUSTOM_PAIRS, ZERO_ADDRESS, type TokenPair } from "@/lib/zama";

let cachedClient: PublicClient | null = null;

function getClient(): PublicClient {
  if (!cachedClient) {
    cachedClient = createPublicClient({ chain: sepolia, transport: http("https://sepolia.infura.io/v3/00000000000000000000000000000000") });
  }
  return cachedClient;
}

export function useRegistryPairs() {
  const [pairs, setPairs] = useState<TokenPair[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const client = getClient();
    const seeds = [...REGISTRY_SEEDS, ...CUSTOM_PAIRS];

    async function resolve() {
      const results: TokenPair[] = [];
      for (const seed of seeds) {
        try {
          const wrapper = await client.readContract({
            address: ZAMA_REGISTRY,
            abi: REGISTRY_ABI as any,
            functionName: "getConfidentialToken",
            args: [seed.underlying],
          }) as string;
          if (wrapper && wrapper !== ZERO_ADDRESS) {
            results.push({ symbol: seed.symbol, name: seed.name, decimals: seed.decimals, underlying: seed.underlying, wrapper: wrapper as `0x${string}` });
          }
        } catch { /* skip failed reads */ }
      }
      if (!cancelled) { setPairs(results); setIsLoading(false); }
    }

    resolve();
    return () => { cancelled = true; };
  }, []);

  return { pairs, isLoading, source: "onchain" as const };
}
