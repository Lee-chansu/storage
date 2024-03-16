import "@/styles/global.css";
import Head from "next/head";

import { ThemeProvider } from "../lib/ThemeContext";
import Container from "@/components/Container";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider>
        <Header />
        <Container>
          <Head>
            <title>My Mall</title>
            {/* <link ref="icon" href="/favicon.ico"></link> */}
          </Head>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  );
}
