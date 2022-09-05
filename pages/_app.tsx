import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/navbar/Layout";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store, wrapper } from "../app";
import { Provider } from "react-redux";
import Head from "next/head";

config.autoAddCss = false;
const description =
  "A clone of Facebook using Next.JS, Typescript as the core of this web design with the help of Redux/toolkit, Redux/persist and Next Redux Wrapper. For styling I use FontAwesome Icons and Tailwind CSS";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>AzriClone</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={process.env.NEXT_PUBLIC_GOOGLE_KEY} />
        <meta property="og:image" content="/images/azriclone.png" />
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default MyApp;
