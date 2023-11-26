import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';

const Header = () => {
  return (
    <Box sx={{
      alignItems: 'center',
      // borderBottom: '1px solid #ffffff',
      display: 'flex',
      height: 70,
      justifyContent: 'space-between',
      left: 0,
      padding: { xs: '0 16px', sm: '0 32px', md: '0 50px' },
      position: 'fixed',
      top: 0,
      width: '100%'
    }}>
      <Typography component="h3" sx={{
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 700
      }}>DUPE DEFEND</Typography>
      <Button component={Link} to="/app" variant="contained" sx={{
        alignItems: 'center',
        display: 'flex',
        fontSize: 28,
        gap: 1,
        height: 40,
        width: 180
      }}>
        <RocketLaunchOutlinedIcon />
        <Typography component="span">Launch App</Typography>
      </Button>
    </Box>
  )
}
export default Header;