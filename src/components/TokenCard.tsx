import { useAccount } from "wagmi";
import { useConfidentialBalance } from "@zama-fhe/react-sdk";
import type { TokenPair } from "../constants/tokens";
import { ShieldPanel } from "./ShieldPanel";
import { UnshieldPanel } from "./UnshieldPanel";
import { truncateAddress, getBlockscoutUrl } from "../lib/utils";
import { useState } from "react";

export function TokenCard({ pair }: { pair: TokenPair }) {
  const { isConnected, address } = useAccount();
  const { data: balance, isLoading: balanceLoading, error: balanceError } = useConfidentialBalance({
    address: pair.wrapper,
    account: address,
  });
  const [mode, setMode] = useState<"wrap" | "unwrap" | "balance">("balance");

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm transition-all hover:border-zinc-700">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-zinc-100">{pair.symbol}</span>
            <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">{pair.name}</span>
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
            <a
              href={getBlockscoutUrl(pair.wrapper)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              Wrapper: {truncateAddress(pair.wrapper)}
            </a>
            <a
              href={getBlockscoutUrl(pair.underlying)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              Underlying: {truncateAddress(pair.underlying)}
            </a>
          </div>
        </div>
      </div>

      {isConnected && (
        <div className="mb-4 rounded-lg bg-zinc-800/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">CONFIDENTIAL BALANCE</span>
            {balanceLoading && <span className="text-xs text-zinc-500 animate-pulse">decrypting...</span>}
          </div>
          <div className="mt-1 text-2xl font-bold text-purple-300 tabular-nums">
            {balanceError ? (
              <span className="text-sm text-zinc-500">Sign to decrypt</span>
            ) : balanceLoading ? (
              <span className="text-sm text-zinc-500">...</span>
            ) : (
              balance?.toString() ?? <span className="text-sm text-zinc-500">Sign to decrypt</span>
            )}
          </div>
        </div>
      )}

      <div className="mb-4 flex rounded-lg bg-zinc-800/50 p-0.5">
        {(["wrap", "balance", "unwrap"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
              mode === m ? "bg-purple-600 text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {m === "wrap" ? "Shield" : m === "unwrap" ? "Unshield" : "Balance"}
          </button>
        ))}
      </div>

      {mode === "wrap" && <ShieldPanel pair={pair} />}
      {mode === "unwrap" && <UnshieldPanel pair={pair} />}
      {mode === "balance" && (
        <div className="rounded-lg bg-zinc-800/50 px-4 py-6 text-center">
          <div className="text-sm text-zinc-500">
            {balance ? `Decrypted: ${balance.toString()}` : "Connect wallet and sign to decrypt balance"}
          </div>
        </div>
      )}
    </div>
  );
}
