import type { FheChain } from "@zama-fhe/sdk/chains";
import { sepolia as sepoliaFhe } from "@zama-fhe/sdk/chains";
import { http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? "00000000000000000000000000000000";
const RPC_URL = import.meta.env.VITE_SEPOLIA_RPC_URL ?? "https://sepolia.infura.io/v3/00000000000000000000000000000000";

export const wagmiConfig = getDefaultConfig({
  appName: "Confidex",
  projectId: PROJECT_ID,
  chains: [sepolia],
  transports: { [sepolia.id]: http(RPC_URL) },
});

export const confidexChain = {
  ...sepoliaFhe,
  network: RPC_URL,
  relayerUrl: import.meta.env.VITE_RELAYER_URL ?? "https://confidex.vercel.app/api/relayer",
} as const satisfies FheChain;

export const ZAMA_REGISTRY_ADDRESS = "0x2f0750Bbb0A246059d80e94c454586a7F27a128e" as const;
