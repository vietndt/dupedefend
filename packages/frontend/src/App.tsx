import { Container } from "@mui/material";
import { HashRouter, Routes, Route } from 'react-router-dom';

import '@rainbow-me/rainbowkit/styles.css';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import Associate from "./components/Associate";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygonMumbai } from "viem/chains";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import HomePage from "./pages/HomPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'DupeDefend App',
  projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID as string,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <HashRouter>
          <Container sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '100vh',
            width: '100%'
          }} disableGutters maxWidth={false}>
            <Header />
            <Routes>
              <Route path="/" element={
                <HomePage />
              } />
              <Route path="/app" element={
                <Associate />
              } />
            </Routes>
            {/* <Footer /> */}
          </Container>
        </HashRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
