import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { ZamaProvider } from "@zama-fhe/react-sdk";
import { createConfig as createZamaConfig } from "@zama-fhe/react-sdk/wagmi";
import { web } from "@zama-fhe/sdk/web";

import { wagmiConfig, confidexChain } from "./config";
import App from "./App";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

const zamaConfig = createZamaConfig({
  chains: [confidexChain],
  wagmiConfig,
  relayers: { [confidexChain.id]: web() },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#7c3aed",
            accentColorForeground: "#ffffff",
            borderRadius: "medium",
            fontStack: "system",
          })}
        >
          <ZamaProvider config={zamaConfig}>
            <App />
          </ZamaProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
);
