// import {Nanum_Pen_Script, Nanum_Gothic} from 'next/font/google'
// const nanumGothic = Nanum_Gothic({
//   weight : ['400', '700'],
//   subsets : []
// }) => 구글 폰트 적용 시키는 방법

// const nanumPenScript = Nanum_Pen_Script({
//   weight : ['400'],
//   subsets : []
// })

import Container from "@/components/Container";
import Header from "@/components/Header";
import { ThemeProvider } from "@/lib/ThemeContext";
import "@/styles/global.css";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider>
        <Header />
        <Container>
          <Head>
            <title>My Mall</title>
            <link href="/favicon.ico"></link>
            {/* <style>
              {
                `html{font-family : ${nanumGothic.style.fontFamily};}`
              }
            </style> */}
          </Head>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
      ;
    </>
  );
}
