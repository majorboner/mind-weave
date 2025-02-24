import { Header } from '@/widgets/header';
import { AppProps } from 'next/app';
import { StoreProvider } from './providers/StoreProvider/ui/StoreProvider';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider>
      <Header />
      <Component {...pageProps} />
    </StoreProvider>
  );
};

export default App;
