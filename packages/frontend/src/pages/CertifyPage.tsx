import { Box } from "@mui/material";
import { useState } from "react";


import Certify from "../components/Certify";
import CertifyHistory from "../components/CertifyHistory";
const CertifyPage = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  return (
    <Box sx={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      justifyContent: 'center',
      minHeight: 'calc(100vh - 35px)',
      padding: '50px 16px',
      width: '100%'
    }}>
      <Certify setLoggedIn={setLoggedIn} />
      <CertifyHistory loggedIn={loggedIn} />
    </Box>
  )
}
export default CertifyPage;