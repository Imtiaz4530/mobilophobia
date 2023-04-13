import { StoreProvider } from 'easy-peasy';
import CssBaseline from '@mui/material/CssBaseline';

import store from '../store'
import '@/styles/globals.css'
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return(
      <StoreProvider store={store}>
            <CssBaseline />
            <Navbar />
            <Component {...pageProps} />
            <Footer />
      </StoreProvider>
    )
}
