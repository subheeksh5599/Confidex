"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { ZamaProvider } from "@zama-fhe/react-sdk";
import { createConfig as createZamaConfig } from "@zama-fhe/react-sdk/wagmi";
import { web } from "@zama-fhe/sdk/web";
import { sepolia as sepoliaFhe, type FheChain } from "@zama-fhe/sdk/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 30_000 } } });

const wagmiConfig = getDefaultConfig({
  appName: "Confidex",
  projectId: "00000000000000000000000000000000",
  chains: [sepolia],
  transports: { [sepolia.id]: http("https://sepolia.infura.io/v3/00000000000000000000000000000000") },
});

const chain = {
  ...sepoliaFhe,
  network: "https://sepolia.infura.io/v3/00000000000000000000000000000000",
  relayerUrl: "https://confidex.vercel.app/api/relayer",
} as const satisfies FheChain;

const zamaCfg = createZamaConfig({ chains: [chain], wagmiConfig, relayers: { [chain.id]: web() } });

const rkTheme = darkTheme({ accentColor: "#7c3aed", accentColorForeground: "#ffffff", borderRadius: "medium", fontStack: "system" });

export function Web3Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={rkTheme}>
          <ZamaProvider config={zamaCfg}>
            {children}
          </ZamaProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
