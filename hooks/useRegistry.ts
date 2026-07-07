"use client";

import { useReadContracts } from "wagmi";
import { sepolia } from "wagmi/chains";
import { ZAMA_REGISTRY, REGISTRY_ABI, buildLocalPairs, type TokenPair } from "@/lib/zama";

const UNDERLYINGS = buildLocalPairs().map((p) => p.underlying);

export function useRegistryPairs() {
  const { data, isLoading } = useReadContracts({
    contracts: UNDERLYINGS.map((underlying) => ({
      address: ZAMA_REGISTRY,
      abi: REGISTRY_ABI,
      functionName: "getConfidentialToken",
      args: [underlying],
      chainId: sepolia.id,
    })),
  });

  const localPairs = buildLocalPairs();
  if (!data) return { pairs: localPairs, isLoading, source: "local" as const };

  const merged: TokenPair[] = localPairs.map((lp, i) => {
    const onchainResult = data[i];
    const onchainWrapper = onchainResult?.result as string | undefined;
    const wrapper = onchainWrapper && onchainWrapper !== "0x0000000000000000000000000000000000000000" ? (onchainWrapper as `0x${string}`) : lp.wrapper;
    const source = onchainResult?.status === "success" ? ("onchain" as const) : ("local" as const);
    return { ...lp, wrapper, source };
  });

  return { pairs: merged, isLoading, source: "hybrid" as const };
}
