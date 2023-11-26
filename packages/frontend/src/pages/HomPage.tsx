import { Box, Button, Typography } from "@mui/material";
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Box sx={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%'
    }}>
      <Box sx={{
        alignItems: 'center',
        backgroundImage: 'url("images/headline-bg.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100vh',
        justifyContent: 'center',
        padding: { xs: '0 16px', sm: '0 32px', md: '0 50px' },
        width: '100%'
      }}>
        <Typography component="h1" sx={{
          background: 'rgba(41, 60, 103, .85)',
          color: '#ffffff',
          fontSize: 36,
          fontWeight: 400,
          textAlign: 'center',
          maxWidth: 500
        }}>Protect Your Original Content with Dupe Defend</Typography>
        <Typography component="p" sx={{
          background: 'rgba(255, 255, 255, .75)',
          color: '#293862',
          fontSize: 24,
          fontWeight: 600,
          textAlign: 'center',
          maxWidth: 735
        }}>Using Chainlink, Zero-Knowledge Proofs, and Ethereum Attestation to Secure Your Creative Work</Typography>
        <Typography component="p" sx={{
          background: 'rgba(255, 255, 255, .75)',
          color: '#293862',
          fontSize: 20,
          fontWeight: 500,
          textAlign: 'center',
          maxWidth: 980
        }}>Join Dupe Defend today and take the first step towards protecting your original content. With our advanced technology and commitment to security, you can focus on creating, while we focus on protecting.</Typography>
        <Box sx={{
          alignItems: 'center',
          display: 'flex',
          gap: 2
        }}>
          <Button component={Link} to="https://github.com/vietndt/dupedefend.git" variant="contained" sx={{
            alignItems: 'center',
            display: 'flex',
            fontSize: 28,
            gap: 1,
            height: 40,
            width: 180
          }}>
            <CodeOutlinedIcon fontSize="inherit" />
            <Typography component="span">Github</Typography>
          </Button>
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
      </Box>
    </Box>
  )
}
export default HomePage;