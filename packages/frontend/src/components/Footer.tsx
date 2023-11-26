import { Box, Typography } from "@mui/material";
import moment from 'moment';

const Footer = () => {
  return (
    <Box sx={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      padding: 1,
      width: '100%'
    }}>
      <Typography component="span">© Dupe Defend {moment().year()}</Typography>
    </Box>
  )
}
export default Footer;