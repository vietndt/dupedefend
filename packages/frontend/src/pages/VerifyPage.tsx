import { Box } from "@mui/material";

import Verify from "../components/Verify";

const VerifyPage = () => {
  return (
    <Box sx={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      justifyContent: 'center',
      minHeight: 'calc(100vh - 35px)',
      padding: '150px 16px 70px',
      width: '100%'
    }}>
      <Verify />
    </Box>
  )
}
export default VerifyPage;
