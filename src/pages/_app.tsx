import type { AppProps } from 'next/app';
import { AuthProvider } from '@/application/hooks/use-auth';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Instituto Vitaliza</title>
        </Head>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
