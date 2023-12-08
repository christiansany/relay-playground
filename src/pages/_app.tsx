import { RelayEnvironmentProvider } from "react-relay";
import { initRelayEnvironment } from "../RelayEnvironment";
import { useMemo } from "react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const environment = useMemo(initRelayEnvironment, []);

  return (
    <>
      <Head>
        <title>Relay Playground</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RelayEnvironmentProvider environment={environment}>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </RelayEnvironmentProvider>
    </>
  );
}
