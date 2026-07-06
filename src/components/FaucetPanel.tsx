import { type FormEvent, useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { useFaucet } from "../hooks/useRegistry";
import { truncateAddress } from "../lib/utils";

const MINT_AMOUNT: Record<string, bigint> = {
  USDC: 1_000_000_000000n,
  USDT: 1_000_000_000000n,
  WETH: 1000n * 10n ** 18n,
  BRON: 10_000n * 10n ** 18n,
  ZAMA: 10_000n * 10n ** 18n,
  tGBP: 10_000n * 10n ** 18n,
  XAUt: 100n * 10n ** 18n,
};

export function FaucetPanel() {
  const { isConnected, address } = useAccount();
  const { mintableUnderlyings } = useFaucet();
  const { sendTransactionAsync } = useSendTransaction();
  const [status, setStatus] = useState<string>("");
  const [pending, setPending] = useState(false);
  const [lastMint, setLastMint] = useState<string>("");

  async function handleMint(symbol: string, tokenAddress: `0x${string}`) {
    if (!address) return;
    const amount = MINT_AMOUNT[symbol] ?? 1_000_000n * 10n ** 18n;
    const mintData = `0x40c10f19${address.slice(2).padStart(64, "0")}${amount.toString(16).padStart(64, "0")}`;

    setPending(true);
    setLastMint(symbol);
    setStatus(`Minting ${symbol}...`);
    try {
      await sendTransactionAsync({ to: tokenAddress, data: mintData as `0x${string}` });
      setStatus(`${symbol} minted!`);
    } catch (err) {
      setStatus(`Failed: ${(err as Error).message.slice(0, 50)}`);
    }
    setPending(false);
    setTimeout(() => { setStatus(""); setLastMint(""); }, 4000);
  }

  async function handleMintAll(e: FormEvent) {
    e.preventDefault();
    if (!address || pending) return;
    setPending(true);
    setStatus(`Minting all tokens...`);
    for (const t of mintableUnderlyings) {
      const amount = MINT_AMOUNT[t.symbol] ?? 1_000_000n * 10n ** 18n;
      const data = `0x40c10f19${address.slice(2).padStart(64, "0")}${amount.toString(16).padStart(64, "0")}`;
      try {
        await sendTransactionAsync({ to: t.address as `0x${string}`, data: data as `0x${string}` });
      } catch {
        // continue
      }
    }
    setPending(false);
    setStatus("All tokens minted!");
    setTimeout(() => setStatus(""), 4000);
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-100">Faucet</h2>
        <button
          onClick={handleMintAll}
          disabled={!isConnected || pending}
          className="rounded-lg bg-purple-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-purple-500 disabled:opacity-40 transition-colors"
        >
          {pending && lastMint === "" ? "Minting..." : "Mint All"}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {mintableUnderlyings.map((t) => (
          <button
            key={t.symbol}
            onClick={() => handleMint(t.symbol, t.address as `0x${string}`)}
            disabled={!isConnected || pending}
            className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-center text-xs font-medium text-zinc-300 hover:bg-zinc-700 disabled:opacity-40 transition-colors"
          >
            <div>{t.symbol}</div>
            <div className="mt-0.5 text-zinc-500">{truncateAddress(t.address)}</div>
          </button>
        ))}
      </div>
      {status && <p className="mt-3 text-center text-xs text-zinc-400">{status}</p>}
    </div>
  );
}
