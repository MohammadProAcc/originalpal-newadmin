import Cookies from 'js-cookie';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import NextNprogress from 'nextjs-progressbar';
import 'react-toastify/dist/ReactToastify.css';
import { StoreProvider, useHydrate } from 'utils';
import 'styles/global.css';
import 'styles/bootstrap.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useLayoutEffect(() => {
    !router.route.includes('/auth') && !Cookies.get('token') && router.push('/auth/login');
  }, [router]);

  const store = useHydrate(pageProps.initialState);

  return (
    <StoreProvider store={store}>
      <ToastContainer />
      <NextNprogress />
      <Component {...pageProps} />
    </StoreProvider>
  );
};

export default MyApp;
