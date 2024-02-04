import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';

import '@styles/globals.scss';
import '@styles/variables.scss';
import { ToastContainer } from '@components/Toast/Toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
