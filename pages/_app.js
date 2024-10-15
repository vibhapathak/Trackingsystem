import "@/styles/globals.css";
import { TrackingProvider } from '../Context/Tracking';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

import { Box } from '@mui/material';

export default function App({ Component, pageProps }) {
  return (
    <TrackingProvider>
      <Navbar />
      <Box
        component="main"
        sx={{
          minHeight: 'calc(100vh - 64px - 64px)', // Adjust these values based on Navbar and Footer heights
          bgcolor: 'white',
          color: 'black',
        }}
      >
        <Component {...pageProps} />
      </Box>
      <Footer />
    </TrackingProvider>
  );
}
