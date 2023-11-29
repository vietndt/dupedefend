import { Box } from "@mui/material";
import Associate from "../components/Associate";

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
      <Associate />
    </Box>
  )
}
export default AppPage;