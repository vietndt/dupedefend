import { Box } from "@mui/material";

import Verify from "../components/Verify";

const AppPage = () => {
  return (
    <Box sx={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 35px)',
      width: '100%'
    }}>
      <Verify />
    </Box>
  )
}
export default AppPage;