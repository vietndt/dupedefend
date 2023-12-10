import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, ButtonBase, Link, Paper, Step, StepIconProps, StepLabel, Stepper, Typography, styled } from "@mui/material";
import AddModeratorOutlinedIcon from '@mui/icons-material/AddModeratorOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VideoSettingsOutlinedIcon from '@mui/icons-material/VideoSettingsOutlined';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LaunchIcon from '@mui/icons-material/Launch';

import VideoPreview from "../components/VideoPreview";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 37,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 6,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 80,
  height: 80,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

const ColorlibStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <YouTubeIcon fontSize="large" />,
    2: <AddModeratorOutlinedIcon fontSize="large" />,
    3: <VideoSettingsOutlinedIcon fontSize="large" />,
    4: <AdsClickIcon fontSize="large" />,
    5: <VerifiedUserIcon fontSize="large" />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  {
    label: 'Upload your video',
    url: 'https://www.youtube.com'
  },
  {
    label: 'Go to certify page',
    url: '/certify'
  },
  {
    label: 'Enter your video\'s URL and use the description to link it',
    url: ''
  },
  {
    label: 'Click Certify',
    url: ''
  },
  {
    label: 'Put a link to the verify in your video description',
    url: ''
  },
]

const HomePage = () => {
  const navigate = useNavigate();
  const stepsRef = useRef(null)

  return (
    <Box sx={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '50px 0',
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
        position: 'relative',
        width: '100%'
      }}>
        <Typography component="h1" sx={{
          color: '#293862',
          fontSize: 36,
          fontWeight: 600,
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
            }}>(for owner)</Typography>
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
        <div className="spinner scroll-down">
          <button className="animate" onClick={() => {
            (stepsRef.current as any)?.scrollIntoView({ behavior: 'smooth' })
          }}>steps</button>
        </div>
      </Box>

      <Box component="div" ref={stepsRef} sx={{
        marginBottom: '70px'
      }}></Box>
      <Box sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
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
          gap: 3,
          maxWidth: 1150,
          padding: 2,
          width: '100%'
        }}>
          <Typography component="h3" sx={{
            fontSize: 24,
            fontWeight: 600,
            textAlign: 'center'
          }}>Steps</Typography>
          <Box sx={{
            display: 'flex',
            overflow: 'auto',
            width: '100%'
          }}>
            <Stepper alternativeLabel activeStep={4} connector={<ColorlibConnector />} sx={{

              minWidth: '900px',
            }}>
              {steps.map((step) => (
                <Step key={step.label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon} sx={{
                    cursor: step.url ? 'pointer' : '',
                    display: 'flex'
                  }} onClick={() => {
                    if (step.url && step.url.indexOf('https') === -1) {
                      navigate(step.url);
                    } else if (step.url) {
                      window.open(step.url, '_blank');
                    }
                  }}>
                    <Box sx={{
                      alignItems: 'center',
                      display: 'flex',
                      gap: 1,
                      justifyContent: 'center'
                    }}>
                      <Typography component="h3" sx={{
                        fontSize: 16,
                        fontWeight: 400,
                        textAlign: 'center'
                      }}>{step.label}</Typography>
                      {step.url ?
                        <LaunchIcon sx={{
                          fontSize: 18
                        }} /> : <></>
                      }
                    </Box>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
        <Box sx={{
          alignItems: 'center',
          background: '#ffffff',
          boxShadow: '0 4px 4px #00000040',
          color: '#293862',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 0 },
          maxWidth: 1150,
          padding: 2,
          width: '100%'
        }}>
          <Box component="img" src="https://docs.chain.link/images/chainlink-functions/functions-playground.png" sx={{
            width: { xs: '100%', md: '50%' }
          }}></Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            paddingLeft: { xs: 0, md: 3 },
            width: { xs: '100%', md: '50%' }
          }}>
            <Typography component="h3" sx={{
              color: '#375bd2',
              fontSize: 24,
              fontWeight: 600,
            }}>Chainlink Functions</Typography>
            <Typography component="p" sx={{
              fontSize: 18,
              fontWeight: 400,
            }}>Our platform integrates Chainlink functions to connect your content authenticity with the blockchain. Chainlink's secure and reliable infrastructure ensures that your content is protected and its authenticity is verifiable.</Typography>
          </Box>
        </Box>
        <Box sx={{
          alignItems: 'center',
          background: '#ffffff',
          boxShadow: '0 4px 4px #00000040',
          color: '#293862',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 0 },
          maxWidth: 1150,
          padding: 2,
          width: '100%'
        }}>
          <Box sx={{
            width: { xs: '100%', md: '50%' }
          }}>
            <VideoPreview url={'https://www.youtube.com/embed/i3exuUa65sE'} />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            paddingLeft: { xs: 0, md: 3 },
            width: { xs: '100%', md: '50%' }
          }}>
            <Typography component="h3" sx={{
              color: '#9a60ff',
              fontSize: 24,
              fontWeight: 600
            }}>Polygon DID & Social Media Issuer</Typography>
            <Typography component="p" sx={{
              fontSize: 18,
              fontWeight: 400
            }}>This platform uses polygon's iden3 framework to issue claims that you have created the video in your youtube description.
              Read more about iden3 <Link href="https://docs.iden3.io/" target="_blank">here </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default HomePage;
