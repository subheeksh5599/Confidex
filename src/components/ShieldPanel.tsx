import { type FormEvent, useState } from "react";
import { useAccount } from "wagmi";
import { useShield } from "@zama-fhe/react-sdk";
import type { TokenPair } from "../constants/tokens";

export function ShieldPanel({ pair }: { pair: TokenPair }) {
  const { isConnected } = useAccount();
  const { mutateAsync: shield, isPending, error } = useShield({ address: pair.wrapper });
  const [amount, setAmount] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!amount) return;
    const decimals = pair.decimals;
    const parsed = parseFloat(amount) * 10 ** decimals;
    await shield({ amount: BigInt(Math.floor(parsed)) });
    setAmount("");
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
          placeholder={`${pair.symbol.replace("c", "")} amount`}
          disabled={!isConnected || isPending}
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-purple-500 focus:outline-none disabled:opacity-40"
        />
        <button
          type="submit"
          disabled={!isConnected || isPending || !amount}
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500 disabled:opacity-40 transition-colors"
        >
          {isPending ? "Shielding..." : "Shield"}
        </button>
      </div>
      {error && <p className="text-xs text-red-400">{(error as Error).message}</p>}
    </form>
  );
}
