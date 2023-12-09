import { Box, FormControl, Button, Paper, Typography, OutlinedInput, InputLabel, InputAdornment } from "@mui/material";
import { useState } from "react";
import VideoPreview from "./VideoPreview";

const Verify = () => {
  const [videoInputControl, setVideoInputControl] = useState<string>('');
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>();
  const [invalidVideo, setInvalidVideo] = useState<boolean>();

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
        setInvalidVideo(false);
      } else {
        setInvalidVideo(true);
      }
    }
  }

  const checkVideo = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyA4dU5I5bVpwCHEXkxRFBR5v9Jt-EiVFJI`);
      const data = await response.json();
      if (data.items && data.items[0] && data.items[0].snippet) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  return (
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
          <InputLabel htmlFor="outlined-adornment-password">Video ID or Video URL *</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
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
          <Button variant="contained" disabled={!videoInputControl || invalidVideo} onClick={() => {
            if (!videoPreviewUrl) {
              validateValue(videoInputControl);
              return;
            }
          }} sx={{
            height: 40,
            width: 180
          }}>Verify this video</Button>
        </Box>
      </Box>
    </Box>
  )
}
export default Verify;
