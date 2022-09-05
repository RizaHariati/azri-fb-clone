import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/navbar/Layout";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store, wrapper } from "../app";
import { Provider } from "react-redux";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
