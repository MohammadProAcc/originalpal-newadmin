import { AppProps } from 'next/app'
import NextNprogress from 'nextjs-progressbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'styles/bootstrap.css'
import 'styles/global.css'
import { StoreProvider, useHydrate } from 'utils'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useHydrate(pageProps.initialState)

  return (
    <StoreProvider store={store}>
      <ToastContainer />
      <NextNprogress />
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
