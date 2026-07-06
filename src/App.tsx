import { useAccount } from "wagmi";
import { WalletButton } from "./components/WalletButton";
import { RegistryExplorer } from "./components/RegistryExplorer";

export function Dashboard() {
  const { isConnected } = useAccount();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      <header className="mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
              Confidex
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Confidential Wrapper Registry Terminal — Zama Protocol Sepolia
            </p>
          </div>
          <WalletButton />
        </div>
      </header>

      {!isConnected && (
        <div className="mb-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 px-6 py-16 text-center">
          <div className="mb-4 text-5xl">🔐</div>
          <h2 className="text-xl font-semibold text-zinc-200">Connect your wallet</h2>
          <p className="mt-2 max-w-md text-sm text-zinc-500">
            Connect to Sepolia testnet to explore the Zama Wrappers Registry,
            shield tokens, decrypt confidential balances, and use the faucet.
          </p>
        </div>
      )}

      {isConnected && <RegistryExplorer />}

      <footer className="mt-16 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
        <p>
          Confidex · Zama Developer Program Season 3 · Bounty Track · Sepolia Testnet
        </p>
        <p className="mt-1">
          Wrappers Registry:{" "}
          <a
            href="https://eth-sepolia.blockscout.com/address/0x2f0750Bbb0A246059d80e94c454586a7F27a128e"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            0x2f07...a128e
          </a>
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return <Dashboard />;
}
