import { useState } from "react";
import { Box, FormControl, TextField, Button, Paper, Typography } from "@mui/material";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Associate = () => {
  const [videoInputControl, setVideoInputControl] = useState<string>('');
  const [snippet, setSnippet] = useState<any>();

  const getVideoDetail = (id: string) => {
    fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,)
      .then(response => {
        if (response.ok) return response.json();
      }).then(json => {
        if (json.items && json.items[0] && json.items[0].snippet) {
          setSnippet(json.items[0].snippet)
        }
      });
  }

  return (
    <Box component={Paper} sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      maxWidth: 450,
      padding: 3,
      width: '100%'
    }}>
      <ConnectButton />
      <Typography component="h3" sx={{
        fontSize: 20,
        fontWeight: 600
      }}>Associate your video</Typography>
      <Box component="form" sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        width: '100%'
      }}>
        <FormControl sx={{
          width: { xs: '100%' }
        }}>
          <TextField
            label="Video ID or Video URL *"
            helperText="E.g. jNQXAC9IVRw  or  https://www.youtube.com/watch?v=jNQXAC9IVRw"
            value={videoInputControl}
            onChange={(event) => {
              const value = event.target.value;
              setVideoInputControl(value);
            }}
          />
        </FormControl>
        <Box>
          <Button variant="contained" disabled={!videoInputControl} onClick={() => {
            let id = '';
            if (videoInputControl.indexOf('?v=') !== -1) {
              id = videoInputControl.slice(videoInputControl.indexOf('?v=') + 3, videoInputControl.length);
            } else {
              id = videoInputControl;
            }
            getVideoDetail(id);
          }}>Associate</Button>
        </Box>
        {snippet ?
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}>
            <Typography>ChannelId: {snippet.channelId}</Typography>
            <Typography>Title: {snippet.title}</Typography>
            <Typography>Description: {snippet.description}</Typography>
          </Box> : <></>}
      </Box>
    </Box>
  )
}
export default Associate;
