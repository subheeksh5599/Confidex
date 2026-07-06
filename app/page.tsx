"use client";

import { ZamaCard } from "@/components/zama-card";
import { ZamaFaucet } from "@/components/zama-faucet";
import { SEPOLIA_PAIRS, ZAMA_REGISTRY, truncateAddress, getBlockscoutUrl } from "@/lib/zama";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  const { isConnected } = useAccount();

  return (
    <main id="main-content" className="flex-1">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Confidex</h1>
            <p className="mt-2 text-muted-foreground">
              Confidential Wrapper Registry Terminal — Zama Protocol Sepolia
            </p>
            <a
              href={getBlockscoutUrl(ZAMA_REGISTRY)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors"
            >
              Registry: {truncateAddress(ZAMA_REGISTRY)} <ArrowUpRight size={12} />
            </a>
          </div>
          <ConnectButton showBalance={false} chainStatus="icon" />
        </div>

        {!isConnected && (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border px-6 py-20 text-center">
            <div className="mb-4 text-5xl">🔐</div>
            <h2 className="text-xl font-semibold">Connect your wallet</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Connect to Sepolia testnet to explore the Zama Wrappers Registry, shield tokens,
              decrypt confidential balances, and use the faucet.
            </p>
          </div>
        )}

        {isConnected && (
          <div className="space-y-8">
            <ZamaFaucet />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {SEPOLIA_PAIRS.map((pair) => (
                <ZamaCard key={pair.symbol} pair={pair} />
              ))}
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>Confidex · Zama Developer Program Season 3 · Bounty Track · Sepolia Testnet</p>
          <p className="mt-1">
            <a href="https://github.com/subheeksh5599/Confidex" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a>
            {" · "}
            <a href="https://docs.zama.org/protocol" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Zama Docs</a>
          </p>
        </footer>
      </section>
    </main>
  );
}
