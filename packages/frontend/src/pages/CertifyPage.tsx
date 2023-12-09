import { Box } from "@mui/material";

import Certify from "../components/Certify";
import CertifyHistory from "../components/CertifyHistory";

const CertifyPage = (props: {
  loggedIn: boolean,
  setLoggedIn: Function,
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
      padding: '150px 16px 70px',
      width: '100%'
    }}>
      <Certify setLoggedIn={props.setLoggedIn} setUserInfo={props.setUserInfo} />
      {/* <CertifyHistory loggedIn={props.loggedIn} /> */}
    </Box>
  )
}
export default CertifyPage;
