import { useNavigate } from "react-router-dom";
import { Box, ButtonBase, Paper, Typography } from "@mui/material";
import AddModeratorOutlinedIcon from '@mui/icons-material/AddModeratorOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '50px 16px',
      width: '100%'
    }}>
      <Box sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minHeight: '100vh',
        justifyContent: 'center',
        padding: { xs: '0 16px', sm: '0 32px', md: '0 50px' },
        width: '100%'
      }}>
        <Typography component="h1" sx={{
          color: '#293862',
          fontSize: 36,
          fontWeight: 400,
          textAlign: 'center',
          maxWidth: 500
        }}>Protect Your Original Content with Dupe Defend</Typography>
        <Typography component="p" sx={{
          color: '#293862',
          fontSize: 20,
          fontWeight: 500,
          textAlign: 'center',
          maxWidth: 980
        }}>Use Dupe Defend today and take the first step towards protecting your original content. With our advanced technology and commitment to security, you can focus on creating, while we focus on protecting.</Typography>
        <Box sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          marginTop: 2
        }}>
          <ButtonBase component={Paper} sx={{
            alignItems: 'center',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: .5,
            padding: '16px 32px',
            width: 200
          }} onClick={() => {
            navigate('certify');
          }}>
            <AddModeratorOutlinedIcon sx={{
              fontSize: 50
            }} />
            <Typography component="h3" sx={{
              fontSize: 18,
              fontWeight: 600
            }}>Certify a video</Typography>
            <Typography component="p" sx={{
              fontSize: 14
            }}>(for video owner)</Typography>
          </ButtonBase>
          <ButtonBase component={Paper} sx={{
            alignItems: 'center',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: .5,
            padding: '16px 32px',
            width: 200
          }} onClick={() => {
            navigate('verify');
          }}>
            <OndemandVideoOutlinedIcon sx={{
              fontSize: 50
            }} />
            <Typography component="h3" sx={{
              fontSize: 18,
              fontWeight: 600
            }}>Verify a video</Typography>
            <Typography component="p" sx={{
              fontSize: 14
            }}>(for viewer)</Typography>
          </ButtonBase>
        </Box>
      </Box>

      <Box sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minHeight: 'calc(100vh - 35px)',
        justifyContent: 'center',
        padding: { xs: '0 16px', sm: '0 32px', md: '0 50px' },
        width: '100%'
      }}>
        <Box sx={{
          alignItems: 'center',
          background: '#ffffff',
          boxShadow: '0 4px 4px #00000040',
          color: '#293862',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 600,
          padding: 2,
          width: '100%'
        }}>
          <Typography component="h3" sx={{
            fontSize: 24,
            fontWeight: 600,
            textAlign: 'center'
          }}>Steps</Typography>
          <Typography component="p" sx={{
            fontSize: 18,
            fontWeight: 400,
            textAlign: 'center'
          }}>1. Upload your video <br/>
          2. Click Certify a Video <br/>
          3. Enter your video's URL and use the description to link it <br/>
          4. Click Certify <br/>
          5. Put a link to the verify in your video description <br/>
          </Typography>
        </Box>
        <Box sx={{
          alignItems: 'center',
          background: '#ffffff',
          boxShadow: '0 4px 4px #00000040',
          color: '#293862',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 600,
          padding: 2,
          width: '100%'
        }}>
          <Typography component="h3" sx={{
            fontSize: 24,
            fontWeight: 600,
            textAlign: 'center'
          }}>Chainlink Functions</Typography>
          <Typography component="p" sx={{
            fontSize: 18,
            fontWeight: 400,
            textAlign: 'center'
          }}>Our platform integrates Chainlink functions to connect your content authenticity with the blockchain. Chainlink's secure and reliable infrastructure ensures that your content is protected and its authenticity is verifiable.</Typography>
        </Box>
        <Box sx={{
          alignItems: 'center',
          background: '#ffffff',
          boxShadow: '0 4px 4px #00000040',
          color: '#293862',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 600,
          padding: 2,
          width: '100%'
        }}>
          <Typography component="h3" sx={{
            fontSize: 24,
            fontWeight: 600,
            textAlign: 'center'
          }}>Polygon DID & Social Media Issuer</Typography>
          <Typography component="p" sx={{
            fontSize: 18,
            fontWeight: 400,
            textAlign: 'center'
          }}>This platform uses polygon's iden3 framework to issue claims that you have created the video in your youtube description.
          Read more about iden3 <a href="https://docs.iden3.io/">here </a>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
export default HomePage;
