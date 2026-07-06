import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export function WalletButton() {
  const { isConnected, address, chain } = useAccount();

  return (
    <div className="flex items-center gap-3">
      {isConnected && chain && (
        <div className="hidden sm:flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          {chain.name}
          {address && <span className="text-zinc-500">· {address.slice(0, 6)}...{address.slice(-4)}</span>}
        </div>
      )}
      <ConnectButton
        showBalance={false}
        chainStatus="none"
        accountStatus="address"
      />
    </div>
  );
}
