"use client";

import { useState, type FormEvent } from "react";
import { useAccount, useChainId } from "wagmi";
import { sepolia } from "wagmi/chains";
import { useConfidentialBalance } from "@zama-fhe/react-sdk";
import { matchZamaError } from "@zama-fhe/sdk";
import { getBlockscoutUrl, truncateAddress } from "@/lib/zama";

export function CustomDecrypt() {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const [tokenAddr, setTokenAddr] = useState("");
  const [queryAddr, setQueryAddr] = useState("");
  const { data: balance, isLoading, error } = useConfidentialBalance({ address: queryAddr as `0x${string}`, account: queryAddr ? address : undefined });
  const wrongNetwork = isConnected && chainId !== sepolia.id;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const val = tokenAddr.trim();
    if (val.startsWith("0x") && val.length === 42) setQueryAddr(val.toLowerCase());
  }

  const errorMsg = error ? matchZamaError(error, {
    SIGNING_REJECTED: () => "Signature rejected in wallet.",
    ENCRYPTION_FAILED: () => "Decryption failed — try again.",
    TRANSACTION_REVERTED: () => "Chain error — check your connection.",
    KEYPAIR_EXPIRED: () => "Key expired — reconnect wallet.",
    _: (e) => e.message.slice(0, 80),
  }) : null;

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
          disabled={!isConnected || isLoading}
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none disabled:opacity-40"
        />
        <button
          type="submit"
          disabled={!isConnected || isLoading || !tokenAddr.trim() || wrongNetwork}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:brightness-110 disabled:opacity-40 transition-all"
        >
          {isLoading ? "Decrypting..." : "Decrypt"}
        </button>
      </form>

      {queryAddr && (
        <div className="mt-4 rounded-xl bg-background/60 px-4 py-3">
          <div className="flex items-center justify-between">
            <a href={getBlockscoutUrl(queryAddr)} target="_blank" rel="noopener noreferrer" className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors">
              {truncateAddress(queryAddr)}
            </a>
            {isLoading && <span className="text-xs text-muted-foreground animate-pulse">decrypting...</span>}
          </div>
          <div className="mt-1 text-2xl font-bold tabular-nums text-accent">
            {errorMsg ? <span className="text-sm text-red-400">{errorMsg}</span> :
             isLoading ? "..." : (balance?.toString() ?? "--")}
          </div>
        </div>
      )}
    </div>
  );
}
