"use client";

import { ZamaCard } from "@/components/zama-card";
import { ZamaFaucet } from "@/components/zama-faucet";
import { CustomDecrypt } from "@/components/zama-custom-decrypt";
import { useRegistryPairs } from "@/hooks/useRegistry";
import { ZAMA_REGISTRY, truncateAddress, getBlockscoutUrl } from "@/lib/zama";
import { useAccount, useChainId } from "wagmi";
import { sepolia } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowUpRight, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { pairs, isLoading, source } = useRegistryPairs();
  const wrongNetwork = isConnected && chainId !== sepolia.id;

  return (
    <main id="main-content" className="flex-1">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <Link href="/" className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors">
          <ArrowLeft size={16} /> Back
        </Link>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Confidex Terminal</h1>
            <div className="mt-1 flex items-center gap-2 text-muted-foreground">
              <span className="text-sm">Zama Protocol Wrappers Registry — Sepolia Testnet</span>
              <span className="rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent uppercase tracking-wider">
                {source} data
              </span>
            </div>
            <a href={getBlockscoutUrl(ZAMA_REGISTRY)} target="_blank" rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors">
              Registry: {truncateAddress(ZAMA_REGISTRY)} <ArrowUpRight size={12} />
            </a>
          </div>
          <ConnectButton showBalance={false} chainStatus="full" />
        </div>

        {wrongNetwork && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertTriangle size={16} />
            Connected to wrong network. Switch to Sepolia testnet in your wallet to use this app.
          </div>
        )}

        {!isConnected && (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border px-6 py-20 text-center">
            <h2 className="text-xl font-semibold">Connect your wallet</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Connect to Sepolia testnet to explore the Zama Wrappers Registry,
              shield tokens, decrypt confidential balances, and use the faucet.
            </p>
          </div>
        )}

        {isConnected && (
          <div className="space-y-8">
            <CustomDecrypt />
            <ZamaFaucet />
            {isLoading && !pairs.length && (
              <p className="text-center text-sm text-muted-foreground animate-pulse">Reading registry on-chain...</p>
            )}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pairs.map((pair) => (
                <ZamaCard key={pair.symbol} pair={pair} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
