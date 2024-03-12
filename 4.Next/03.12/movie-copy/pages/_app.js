import "@/styles/globals.css";
import Header from '@/components/Header'
import Container from '@/components/Container'
import { ThemeProvider } from '@/lib/ThemeContext';

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider>
        <Header/>
        <Container>
          <Component {...pageProps}/>
        </Container>
      </ThemeProvider>
    </>
  )
}
