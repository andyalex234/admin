import "../styles/globals.css";
import "antd/dist/antd.css";
import AppLayout from "../components/layouts/AppLayout";
import "../styles/Applayout.css";

function App({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default App;
