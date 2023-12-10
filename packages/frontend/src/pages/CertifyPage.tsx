import { Box } from "@mui/material";

import Certify from "../components/Certify";
import CertifyHistory from "../components/CertifyHistory";

const CertifyPage = (props: {
  loggedIn: boolean,
  setLoggedIn: Function,
  userInfo: any,
  setUserInfo: Function
}) => {
  return (
    <Box sx={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      justifyContent: 'center',
      minHeight: 'calc(100vh - 35px)',
      padding: { xs: '100px 16px 30px', md: '150px 16px 30px' },
      width: '100%'
    }}>
      <Certify setLoggedIn={props.setLoggedIn} setUserInfo={props.setUserInfo} />
      <Box sx={{
        display: 'flex',
        overflow: 'auto',
        width: '100%'
      }}>
        <CertifyHistory loggedIn={props.loggedIn} userInfo={props.userInfo} />
      </Box>
    </Box>
  )
}
export default CertifyPage;
