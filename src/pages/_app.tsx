import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/bootstrap.css";
import "styles/global.css";
import { useState } from "react";
import { StoreProvider, useHydrate } from "utils";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import rtlPlugin from "stylis-plugin-rtl";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useHydrate((pageProps as any).initialState);

  const [queryClient] = useState(() => new QueryClient());

  const rtlCache = createEmotionCache({
    key: "mantine-rtl",
    stylisPlugins: [rtlPlugin],
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={(pageProps as any).dehydratedState}>
        <StoreProvider store={store}>
          <MantineProvider withGlobalStyles emotionCache={rtlCache} theme={{ dir: "rtl" }}>
            <ToastContainer />
            <NextNprogress />
            <Component {...pageProps} />
          </MantineProvider>
        </StoreProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default MyApp;
