import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = (props: {
  loggedIn: boolean,
  userInfo: any
}) => {
  const location = useLocation();
  const [dialog, setDialog] = useState<boolean>(false);

  return (
    <>
      <Box sx={{
        alignItems: 'center',
        display: 'flex',
        height: 70,
        justifyContent: 'space-between',
        left: 0,
        padding: { xs: '0 16px', sm: '0 32px', md: '0 50px' },
        position: 'fixed',
        top: 0,
        width: '100%'
      }}>
        <Box component={Link} to="/" sx={{
          alignItems: 'center',
          display: 'flex',
          height: 65,
          justifyContent: 'center',
          overflow: 'hidden',
          width: 65
        }}>
          <img src="/logo.png" alt="" width={110} />
        </Box>
        {location.pathname.indexOf('certify') !== -1 ?
          <>
            {!props.loggedIn ?
              <Tooltip title={'Login'}>
                <IconButton size="large">
                  <LoginIcon fontSize="large" />
                </IconButton>
              </Tooltip> :
              <Tooltip title={'User Info'}>
                <IconButton size="large" onClick={() => {
                  setDialog(true);
                }}>
                  <AdminPanelSettingsOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            }
          </> : <></>
        }
      </Box>

      <Dialog onClose={() => {
        setDialog(false);
      }} open={dialog}>
        <DialogTitle>User info</DialogTitle>
        <DialogContent>
          <Box>
            <Typography sx={{
              color: '#929292',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none'
            }}>Wallet:</Typography>
            <Typography sx={{
              color: '#000000',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              wordBreak: 'break-all'
            }}>{props.userInfo?.address}</Typography>
          </Box>
          <Box>
            <Typography sx={{
              color: '#929292',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none'
            }}>User Id:</Typography>
            <Typography sx={{
              color: '#000000',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              wordBreak: 'break-all'
            }}>{props.userInfo?.userId}</Typography>
          </Box>
          <Box>
            <Typography sx={{
              color: '#929292',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none'
            }}>DID:</Typography>
            <Typography sx={{
              color: '#000000',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              wordBreak: 'break-all'
            }}>{props.userInfo?.did}</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '12px 24px'
        }}>
          <Button variant="contained" color="error" onClick={() => {
            setDialog(false);
          }}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default Header;