"use client";

import { type FormEvent, useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { REGISTRY_SEEDS, MINT_AMOUNTS } from "@/lib/zama";

export function ZamaFaucet() {
  const { isConnected, address } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  async function mint(underlying: `0x${string}`, symbol: string) {
    if (!address) return;
    const amt = MINT_AMOUNTS[underlying.toLowerCase()] ?? 1_000_000n * 10n ** 18n;
    const data = `0x40c10f19${address.slice(2).padStart(64, "0")}${amt.toString(16).padStart(64, "0")}` as `0x${string}`;
    setPending(true);
    setStatus(`Minting ${symbol}...`);
    try {
      await sendTransactionAsync({ to: underlying, data });
      setStatus(`${symbol} minted`);
    } catch (e) {
      setStatus(`Failed: ${(e as Error).message.slice(0, 60)}`);
    }
    setPending(false);
    setTimeout(() => setStatus(""), 4000);
  }

  async function mintAll(e: FormEvent) {
    e.preventDefault(); if (!address || pending) return;
    setPending(true); setStatus("Minting all...");
    for (const s of REGISTRY_SEEDS) {
      const amt = MINT_AMOUNTS[s.underlying.toLowerCase()] ?? 1_000_000n * 10n ** 18n;
      const data = `0x40c10f19${address.slice(2).padStart(64, "0")}${amt.toString(16).padStart(64, "0")}` as `0x${string}`;
      try { await sendTransactionAsync({ to: s.underlying, data }); } catch { /* skip */ }
    }
    setPending(false); setStatus("All minted"); setTimeout(() => setStatus(""), 4000);
  }

  if (!isConnected) return null;
  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Testnet Faucet</h3>
        <button onClick={mintAll} disabled={pending}
          className="rounded-xl bg-accent px-5 py-2 text-sm font-semibold text-black hover:brightness-110 disabled:opacity-40 transition-all">
          {pending ? "Minting..." : "Mint All"}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {REGISTRY_SEEDS.map((s) => (
          <button key={s.symbol} onClick={() => mint(s.underlying, s.symbol.replace("c", ""))} disabled={pending}
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-center text-sm font-medium hover:border-accent/40 disabled:opacity-40 transition-all">
            {s.symbol.replace("c", "")}
          </button>
        ))}
      </div>
      {status && <p className="mt-3 text-center text-sm text-muted-foreground">{status}</p>}
    </div>
  );
}
