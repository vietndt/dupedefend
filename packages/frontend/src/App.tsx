import { Container } from "@mui/material";
import { HashRouter, Routes, Route } from 'react-router-dom';

import HomePage from "./pages/HomPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CertifyPage from "./pages/CertifyPage";
import VerifyPage from "./pages/VerifyPage";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>();

  return (
    <HashRouter>
      <Container sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%'
      }} disableGutters maxWidth={false}>
        <Header loggedIn={loggedIn} userInfo={userInfo} />
        <Routes>
          <Route path="/" element={
            <HomePage />
          } />
          <Route path="/certify" element={
            <CertifyPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} userInfo={userInfo} setUserInfo={setUserInfo} />
          } />
          <Route path="/verify" element={
            <VerifyPage />
          } />
        </Routes>
        <Footer />
      </Container>
    </HashRouter>
  );
}

export default App;
