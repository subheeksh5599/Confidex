import { useRegistry } from "../hooks/useRegistry";
import { TokenCard } from "./TokenCard";
import { FaucetPanel } from "./FaucetPanel";

export function RegistryExplorer() {
  const { pairs } = useRegistry();

  return (
    <div className="space-y-6">
      <FaucetPanel />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pairs.map((pair) => (
          <TokenCard key={pair.symbol} pair={pair} />
        ))}
      </div>
    </div>
  );
}
