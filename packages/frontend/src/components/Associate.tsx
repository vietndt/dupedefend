import { Box, FormControl, TextField, Button, Paper, Typography } from "@mui/material";

const Associate = () => {
  return (
    <Box component={Paper} sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      maxWidth: 450,
      padding: 3,
      width: '100%'
    }}>
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
            label="Ethereum Address *"
            helperText=""
          />
        </FormControl>
        <FormControl sx={{
          width: { xs: '100%' }
        }}>
          <TextField
            label="Video URL *"
            helperText=""
          />
        </FormControl>
        <Box>
          <Button variant="contained">Associate</Button>
        </Box>
      </Box>
    </Box>
  )
}
export default Associate;
