import { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/bootstrap.css";
import "styles/global.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import React, { useState } from "react";
import { StoreProvider, useHydrate } from "utils";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useHydrate(pageProps.initialState);

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <StoreProvider store={store}>
          <ToastContainer />
          <NextNprogress />
          <Component {...pageProps} />
        </StoreProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default MyApp;
