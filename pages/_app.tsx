import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/navbar/Layout";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../app";
import { Provider } from "react-redux";
import Head from "next/head";
import Script from "next/script";

config.autoAddCss = false;
const description =
  "A website clone of Facebook using Next.JS, Typescript as the core of this web design with the help of Redux/toolkit, Redux/persist and Next Redux Wrapper. For styling I use FontAwesome Icons and Tailwind CSS";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>AzriClone</title>
        <meta name="description" content={description} />

        <meta property="og:image" content="/images/azriclone.png" />

        <meta name="author" content="rizahariati" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        id="gtm-script-1"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-67SXRGBGG8`}
      />
      <Script id="gtm-script-2" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];`}
        {`function gtag(){dataLayer.push(arguments);}`}
        {`gtag('js', new Date());`}
        {`gtag('config','G-67SXRGBGG8');`}
      </Script>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
