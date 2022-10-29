import "../styles/globals.css";
import "antd/dist/antd.css";
import AppLayout from "../components/layouts/AppLayout";
import "../styles/Applayout.css";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

// The chain Id for goerli testnet is 5
const supportedChainIds = [5];
const connectors = {
  injected: {},
};

function App({ Component, pageProps }) {
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThirdwebWeb3Provider>
  );
}

export default App;
