import '../styles/globals.css';
import Layout from '../components/Layout';
import { supabase } from '../lib/supabase';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;