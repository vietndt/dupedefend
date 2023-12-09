import { Box } from "@mui/material";

const VideoPreview = (props: {
  url: string | any
}) => {
  return (
    <Box sx={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    }}>
      <Box sx={{
        position: 'relative',
        paddingBottom: '56.25%',
        width: '100%'
      }}>
        <iframe style={{
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%'
        }} width="560" height="315"
          src={props.url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
      </Box>
    </Box>
  )
}
export default VideoPreview;
