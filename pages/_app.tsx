import "@/styles/global.css";
import StoreProvider from "app/StoreProvider";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  // TODO: clarify is it wrong place? 
  return  <StoreProvider {...pageProps}>
            <Component {...pageProps} />;
          </StoreProvider>
}
