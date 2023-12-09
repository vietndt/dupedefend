import { Box, Typography } from "@mui/material";

import moment from 'moment';

const Footer = () => {
  return (
    <Box sx={{
      alignItems: 'center',
      background: '#ffffff',
      boxShadow: '0 0 3px #00000040',
      display: 'flex',
      height: 35,
      justifyContent: 'center',
      padding: 1,
      width: '100%'
    }}>
      <Typography component="span">© Dupe Defend {moment().year()}</Typography>
    </Box>
  )
}
export default Footer;
