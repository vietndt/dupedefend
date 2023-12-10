import { useState } from "react";
import { Box, FormControl, Button, Paper, Typography, OutlinedInput, InputLabel, InputAdornment, CircularProgress } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { ethers } from "ethers";

import VideoPreview from "./VideoPreview";
import { getABI } from "../helpers/Contract";
import { errorHandler } from "../helpers/Utilities";
import { ISnackbarConfig } from "../models/Snackbar";
import SnackbarMessage from "./Snackbar";

const Verify = () => {
  const [step, setStep] = useState<'fill_id' | 'verifying' | 'completed' | 'failed'>('fill_id');
  const [userIdControl, setUserIdControl] = useState<string>('');
  const [videoInputControl, setVideoInputControl] = useState<string>('');
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>();
  const [invalidVideo, setInvalidVideo] = useState<boolean>();
  const [videoOrChannelId, setVideoOrChannelId] = useState<string>('');
  const [snackbar, setSnackbar] = useState<ISnackbarConfig>({
    isOpen: false
  } as any);

  const pasteUrl = async () => {
    const value = await window.navigator.clipboard.readText();
    if (value) {
      setVideoPreviewUrl('');
      setVideoInputControl(value);
      let id = '';
      if (value.indexOf('?v=') !== -1) {
        id = value.slice(value.indexOf('?v=') + 3, value.indexOf('?v=') + 14);
      } else if (value.indexOf('youtu.be') !== -1) {
        id = value.slice(value.indexOf('youtu.be') + 9, value.indexOf('youtu.be') + 20);
      } else {
        id = value;
      }
      const check = await checkVideo(id);
      if (check) {
        setVideoPreviewUrl(`https://www.youtube.com/embed/${id}`);
        setVideoOrChannelId(id);
        setInvalidVideo(false);
      } else {
        setInvalidVideo(true);
      }
    }
  }

  const validateValue = async (value: string) => {
    if (value) {
      setVideoPreviewUrl('');
      setVideoInputControl(value);
      let id = '';
      if (value.indexOf('?v=') !== -1) {
        id = value.slice(value.indexOf('?v=') + 3, value.indexOf('?v=') + 14);
      } else if (value.indexOf('youtu.be') !== -1) {
        id = value.slice(value.indexOf('youtu.be') + 9, value.indexOf('youtu.be') + 20);
      } else {
        id = value;
      }
      const check = await checkVideo(id);
      if (check) {
        setVideoPreviewUrl(`https://www.youtube.com/embed/${id}`);
        setVideoOrChannelId(id);
        setInvalidVideo(false);
      } else {
        setInvalidVideo(true);
      }
    }
  }

  const checkVideo = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
      const data = await response.json();
      if (data.items && data.items[0] && data.items[0].snippet) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  const pasteUserId = async () => {
    const value = await window.navigator.clipboard.readText();
    setUserIdControl(value);
  }

  const verify = async () => {
    if (!videoPreviewUrl) {
      validateValue(videoInputControl);
      return;
    }
    try {
      setStep('verifying');
      const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_ID}`);
      const abi = getABI('IssuerSimple');
      const contract = new ethers.Contract('0x454e5108cee33c743d8de8ef92aeb749256abc3d', abi, provider);
      const response = await contract.getUserClaim(
        userIdControl,
        videoOrChannelId
      );
      console.log(response);
      if (response.claim[2].toString() !== '0') {
        setStep('completed');
      } else {
        setStep('failed');
      }
    } catch (err) {
      errorHandler(err, setSnackbar)
    }
  }

  return (
    <>
      <Box component={Paper} sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        maxWidth: 500,
        minHeight: 200,
        padding: 3,
        width: '100%'
      }}>
        {step === 'fill_id' ?
          <>
            <Typography component="h3" sx={{
              fontSize: 20,
              fontWeight: 600
            }}>Enter video</Typography>
            <Box component="form" sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              width: '100%'
            }}>
              <FormControl sx={{
                width: { xs: '100%' }
              }} variant="outlined">
                <InputLabel htmlFor="outlined-user-id">User ID *</InputLabel>
                <OutlinedInput
                  id="outlined-user-id"
                  label="User ID *"
                  endAdornment={
                    <InputAdornment position="end">
                      <Button onClick={pasteUserId}>paste</Button>
                    </InputAdornment>
                  }
                  value={userIdControl}
                  onChange={(event) => {
                    const value = event.target.value;
                    setUserIdControl(value);
                  }}
                  onPaste={pasteUserId}
                />
              </FormControl>
              <FormControl sx={{
                width: { xs: '100%' }
              }} variant="outlined">
                <InputLabel htmlFor="outlined-video-id">Video ID or Video URL *</InputLabel>
                <OutlinedInput
                  id="outlined-video-id"
                  label="Video ID or Video URL *"
                  endAdornment={
                    <InputAdornment position="end">
                      <Button onClick={pasteUrl}>paste</Button>
                    </InputAdornment>
                  }
                  value={videoInputControl}
                  onChange={(event) => {
                    const value = event.target.value;
                    setVideoInputControl(value);
                    setInvalidVideo(false);
                    setVideoPreviewUrl('');
                  }}
                  onPaste={pasteUrl}
                />
              </FormControl>
              {videoPreviewUrl ?
                <VideoPreview url={videoPreviewUrl} /> :
                <>
                  {invalidVideo ?
                    <Typography component="h3" sx={{
                      fontSize: 13,
                      color: 'error.main',
                      fontWeight: 600
                    }}>Invalid video</Typography> : <></>
                  }
                </>
              }
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 1
              }}>
                <Button variant="contained" disabled={!videoInputControl || invalidVideo || !userIdControl} onClick={verify} sx={{
                  height: 40,
                  width: 180
                }}>Verify this video</Button>
              </Box>
            </Box>
          </> : <></>
        }
        {step === 'verifying' ?
          <Box sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography component="h3" sx={{
              fontSize: 20,
              fontWeight: 600
            }}>Veryfying video...</Typography>
            <CircularProgress size={65} color="success" />
          </Box> : <></>
        }
        {step === 'completed' ?
          <Box sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <CheckCircleIcon color="success" sx={{
              fontSize: 48
            }} />
            <Typography component="h3" sx={{
              fontSize: 20,
              fontWeight: 600
            }}>Successfully</Typography>
            <Typography sx={{
              fontSize: 16,
              textAlign: 'center',
              wordBreak: 'break-all'
            }}>This video has been verified as claimed by userID - {userIdControl}</Typography>
            <Button variant="contained" onClick={() => setStep('fill_id')} sx={{
              height: 40,
              width: 180
            }}>OK</Button>
          </Box> : <></>
        }
        {step === 'failed' ?
          <Box sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <ErrorOutlineIcon color="error" sx={{
              fontSize: 48
            }} />
            <Typography component="h3" sx={{
              fontSize: 20,
              fontWeight: 600
            }}>Failed</Typography>
            <Button variant="contained" onClick={() => setStep('fill_id')} sx={{
              height: 40,
              width: 180
            }}>OK</Button>
          </Box> : <></>
        }
      </Box>

      <SnackbarMessage snackbar={snackbar} setSnackbar={setSnackbar} />
    </>
  )
}
export default Verify;
