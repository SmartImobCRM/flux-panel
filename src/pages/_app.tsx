// page/_app.tsx
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { api } from "~/utils/api"; 
import "~/styles/globals.css";
import { ReactNode } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout: (page: ReactNode) => ReactNode = (Component as unknown as { getLayout: () => ReactNode }).getLayout || ((page: ReactNode) => page);
  
  return (
    <ClerkProvider {...pageProps}>
      {getLayout(<Component {...pageProps} />)}
    </ClerkProvider>
  );
}
 
export default api.withTRPC(MyApp);