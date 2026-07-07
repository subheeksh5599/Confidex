"use client";

import { useState, type FormEvent } from "react";
import { useAccount, useChainId } from "wagmi";
import { sepolia } from "wagmi/chains";
import { useConfidentialBalance } from "@zama-fhe/react-sdk";
import { getBlockscoutUrl, truncateAddress } from "@/lib/zama";

function DecryptResult({ tokenAddr }: { tokenAddr: `0x${string}` }) {
  const { address } = useAccount();
  const { data: balance, isLoading, error } = useConfidentialBalance({ address: tokenAddr, account: address });

  const errorMsg = error ? ((error as Error).message?.includes("user rejected") || (error as Error).message?.includes("User denied")
    ? "Signature rejected in wallet."
    : (error as Error).message.slice(0, 80)) : null;

  return (
    <div className="mt-4 rounded-xl bg-background/60 px-4 py-3">
      <div className="flex items-center justify-between">
        <a href={getBlockscoutUrl(tokenAddr)} target="_blank" rel="noopener noreferrer" className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors">
          {truncateAddress(tokenAddr)}
        </a>
        {isLoading && <span className="text-xs text-muted-foreground animate-pulse">decrypting...</span>}
      </div>
      <div className="mt-1 text-2xl font-bold tabular-nums text-accent">
        {errorMsg ? <span className="text-sm text-red-400">{errorMsg}</span> :
         isLoading ? "..." : (balance?.toString() ?? "--")}
      </div>
    </div>
  );
}

export function CustomDecrypt() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const [tokenAddr, setTokenAddr] = useState("");
  const [queryAddr, setQueryAddr] = useState<`0x${string}` | null>(null);
  const wrongNetwork = isConnected && chainId !== sepolia.id;
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const val = tokenAddr.trim();
    if (val.startsWith("0x") && val.length === 42) {
      setQueryAddr(val.toLowerCase() as `0x${string}`);
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-6 backdrop-blur-sm">
      <h3 className="mb-1 text-lg font-semibold">Custom Token Decrypt</h3>
      <p className="mb-4 text-xs text-muted-foreground">Decrypt the confidential balance of any ERC-7984 token — not just registered pairs.</p>

      {wrongNetwork && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          Wrong network. Switch to Sepolia testnet to decrypt balances.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={tokenAddr}
          onChange={(e) => setTokenAddr(e.target.value)}
          placeholder="Paste any ERC-7984 token address..."
          disabled={!isConnected || loading}
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none disabled:opacity-40"
        />
        <button
          type="submit"
          disabled={!isConnected || loading || !tokenAddr.trim() || wrongNetwork}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:brightness-110 disabled:opacity-40 transition-all"
        >
          {loading ? "Decrypting..." : "Decrypt"}
        </button>
      </form>

      {queryAddr && <DecryptResult tokenAddr={queryAddr} />}
    </div>
  );
}
