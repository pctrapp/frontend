import type { AppProps } from 'next/app';
import React from 'react';

import GlobalStyles from '../atoms/global';
import Notifications from '../components/Notifications';
import { AuthProvider } from '../context/auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <GlobalStyles />
      <Component {...pageProps} />
      <Notifications />
    </AuthProvider>
  )
}

export default MyApp;
