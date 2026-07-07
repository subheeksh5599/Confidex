"use client";

import { type FormEvent, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { sepolia } from "wagmi/chains";
import { useShield, useUnshield, useConfidentialBalance } from "@zama-fhe/react-sdk";
import { matchZamaError } from "@zama-fhe/sdk";
import type { TokenPair } from "@/lib/zama";
import { truncateAddress, getBlockscoutUrl } from "@/lib/zama";
import { AlertTriangle } from "lucide-react";

function formatZamaError(err: Error | null): string | null {
  if (!err) return null;
  return matchZamaError(err, {
    SIGNING_REJECTED: () => "Signature rejected — please confirm in your wallet.",
    ENCRYPTION_FAILED: () => "Encryption failed — try again or reconnect.",
    TRANSACTION_REVERTED: () => "Transaction reverted — check your balance.",
    KEYPAIR_EXPIRED: () => "Key expired — reconnect your wallet.",
    INSUFFICIENT_ERC20_BALANCE: () => "Insufficient balance to shield.",
    _: (e) => e.message.slice(0, 100),
  }) ?? err.message.slice(0, 100);
}

export function ZamaCard({ pair }: { pair: TokenPair }) {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const wrongNetwork = isConnected && chainId !== sepolia.id;
  const { data: balance, isLoading: balLoading, error: balError } = useConfidentialBalance({ address: pair.wrapper, account: address });
  const { mutateAsync: shield, isPending: shPending, error: shError } = useShield({ address: pair.wrapper });
  const { mutateAsync: unshield, isPending: unPending, error: unError } = useUnshield(pair.wrapper);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<"shield" | "unshield">("shield");
  const [txStatus, setTxStatus] = useState("");

  async function doShield(e: FormEvent) {
    e.preventDefault();
    if (!amount || wrongNetwork) return;
    setTxStatus("Shielding...");
    try {
      await shield({ amount: BigInt(Math.floor(parseFloat(amount) * 10 ** pair.decimals)) });
      setAmount("");
      setTxStatus("Shielded");
    } catch {
      setTxStatus("");
    }
    setTimeout(() => setTxStatus(""), 3000);
  }

  async function doUnshield(e: FormEvent) {
    e.preventDefault();
    if (!amount || wrongNetwork) return;
    setTxStatus("Unshielding...");
    try {
      await unshield({
        amount: BigInt(Math.floor(parseFloat(amount) * 10 ** pair.decimals)),
        onUnwrapSubmitted: () => setTxStatus("Unwrap submitted..."),
        onFinalizing: () => setTxStatus("Finalizing..."),
        onFinalizeSubmitted: () => setTxStatus("Complete"),
      });
      setAmount("");
    } catch {
      setTxStatus("");
    }
    setTimeout(() => setTxStatus(""), 4000);
  }

  const isLoading = shPending || unPending;
  const error = shError ?? unError;
  const displayError = formatZamaError(error);

  return (
    <div className="group rounded-2xl border border-border bg-muted/30 p-5 backdrop-blur-sm transition-all hover:border-accent/20">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <span className="text-xl font-bold">{pair.symbol}</span>
          <span className="ml-2 text-xs text-muted-foreground">{pair.name}</span>
        </div>
        <span className="rounded-md bg-background/60 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
          {pair.source}
        </span>
      </div>
      <div className="mb-1 flex gap-2 text-[10px] text-muted-foreground">
        <a href={getBlockscoutUrl(pair.wrapper)} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">W: {truncateAddress(pair.wrapper)}</a>
        <a href={getBlockscoutUrl(pair.underlying)} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">U: {truncateAddress(pair.underlying)}</a>
      </div>

      {wrongNetwork && (
        <div className="mb-4 flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          <AlertTriangle size={12} /> Switch to Sepolia
        </div>
      )}

      {isConnected && !wrongNetwork && (
        <div className="mb-4 rounded-xl bg-background/60 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Encrypted Balance</span>
            {balLoading && <span className="text-xs text-muted-foreground animate-pulse">decrypting...</span>}
          </div>
          <div className="mt-1 text-2xl font-bold tabular-nums text-accent">
            {balError ? <span className="text-sm text-muted-foreground">Sign to view</span> :
             balLoading ? "..." : (balance?.toString() ?? "--")}
          </div>
        </div>
      )}

      {isConnected && (
        <>
          <div className="mb-3 flex rounded-lg bg-background/60 p-0.5">
            {(["shield", "unshield"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all ${
                  mode === m ? "bg-accent text-black" : "text-muted-foreground hover:text-foreground"
                }`}>
                {m === "shield" ? "Shield (Wrap)" : "Unshield (Unwrap)"}
              </button>
            ))}
          </div>

          <form onSubmit={mode === "shield" ? doShield : doUnshield} className="flex gap-2">
            <input
              type="number" step="any" min="0" value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={mode === "shield" ? `${pair.symbol.replace("c", "")} amount` : `${pair.symbol} amount`}
              disabled={!isConnected || isLoading || wrongNetwork}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={!isConnected || isLoading || !amount || wrongNetwork}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:brightness-110 disabled:opacity-40 transition-all"
            >
              {isLoading ? "..." : mode === "shield" ? "Shield" : "Unshield"}
            </button>
          </form>
        </>
      )}

      {txStatus && !displayError && <p className="mt-2 text-xs text-muted-foreground">{txStatus}</p>}
      {displayError && <p className="mt-2 text-xs text-red-400">{displayError}</p>}
    </div>
  );
}
