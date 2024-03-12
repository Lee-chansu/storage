import "@/styles/globals.css";

//컴포넌트
import Header from "@/components/Header";
import Container from "@/components/Container";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}
