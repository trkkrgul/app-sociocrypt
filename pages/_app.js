import "@/styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "@/store/store";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import {
  configureChains,
  createClient,
  useAccount,
  useBalance,
  WagmiConfig,
} from "wagmi";

import { bsc } from "wagmi/chains";
import { setUserBalance } from "@/store/slices/authSlice";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ConfigProvider } from "antd";
import { theme } from "antd";

const { provider } = configureChains(
  [bsc],
  [walletConnectProvider({ projectId: "4ee9df2680b840773d696161db87d94b" })]
);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: "4ee9df2680b840773d696161db87d94b",
    version: "1", // or "2"
    appName: "web3Modal",
    chains: [bsc],
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, [bsc]);

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ffab44",
              colorBgBase: "#000000",
              fontFamily: "Space Grotesk",
            },
            algorithm: theme.darkAlgorithm,
          }}
        >
          <WagmiConfig client={wagmiClient}>
            <Component {...pageProps} />
          </WagmiConfig>
        </ConfigProvider>
        <Web3Modal
          projectId="4ee9df2680b840773d696161db87d94b"
          ethereumClient={ethereumClient}
        />
      </PersistGate>
    </Provider>
  );
}
