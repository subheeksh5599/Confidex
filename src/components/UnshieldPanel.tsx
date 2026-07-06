import { type FormEvent, useState } from "react";
import { useAccount } from "wagmi";
import { useUnshield } from "@zama-fhe/react-sdk";
import type { TokenPair } from "../constants/tokens";

export function UnshieldPanel({ pair }: { pair: TokenPair }) {
  const { isConnected } = useAccount();
  const { mutateAsync: unshield, isPending, error } = useUnshield(pair.wrapper);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!amount) return;
    const decimals = pair.decimals;
    const parsed = parseFloat(amount) * 10 ** decimals;
    setStatus("Submitting unwrap...");
    try {
      await unshield({
        amount: BigInt(Math.floor(parsed)),
        onUnwrapSubmitted: () => setStatus("Unwrap confirmed. Decrypting..."),
        onFinalizing: () => setStatus("Finalizing..."),
        onFinalizeSubmitted: () => setStatus("Complete!"),
      });
      setAmount("");
      setTimeout(() => setStatus(""), 3000);
    } catch {
      setStatus("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <input
          type="number"
          step="any"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`${pair.symbol} amount`}
          disabled={!isConnected || isPending}
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-purple-500 focus:outline-none disabled:opacity-40"
        />
        <button
          type="submit"
          disabled={!isConnected || isPending || !amount}
          className="rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-600 disabled:opacity-40 transition-colors"
        >
          {isPending ? "Unshielding..." : "Unshield"}
        </button>
      </div>
      {status && <p className="text-xs text-zinc-400">{status}</p>}
      {error && <p className="text-xs text-red-400">{(error as Error).message}</p>}
    </form>
  );
}
