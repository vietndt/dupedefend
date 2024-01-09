import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { ISnackbarConfig } from "../models/Snackbar";
import SnackbarMessage from "./Snackbar";

const Header = (props: {
  loggedIn: boolean,
  userInfo: any
}) => {
  const location = useLocation();
  const [dialog, setDialog] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<ISnackbarConfig>({
    isOpen: false
  } as any);

  return (
    <>
      <Box sx={{
        alignItems: 'center',
        display: 'flex',
        height: { xs: 60, md: 100 },
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
          height: 90,
          justifyContent: 'center',
          overflow: 'hidden',
          width: 90
        }}>
          <Box component={'img'} src="/logo.png" alt="" sx={{
            width: { xs: 80, md: 140 }
          }} />
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
          <Box sx={{
            alignItems: 'center',
            display: 'flex',
            marginBottom: 1
          }}>
            <Typography sx={{
              color: '#929292',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              width: 200
            }}>Web3Auth address:</Typography>
            <Typography sx={{
              color: '#000000',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              width: '100%',
              wordBreak: 'break-all'
            }}>{props.userInfo?.address}</Typography>
            <IconButton
              onClick={() => {
                window.navigator.clipboard.writeText(props.userInfo?.address);
                setSnackbar({
                  isOpen: true,
                  timeOut: 5000,
                  type: 'success',
                  message: 'Copied to clipboard'
                });
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
          <Box sx={{
            alignItems: 'center',
            display: 'flex',
            marginBottom: 1
          }}>
            <Typography sx={{
              color: '#929292',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              width: 200
            }}>Credential address:</Typography>
            <Typography sx={{
              color: '#000000',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              width: '100%',
              wordBreak: 'break-all'
            }}>{props.userInfo?.AAAddress}</Typography>
            <IconButton
              onClick={() => {
                window.navigator.clipboard.writeText(props.userInfo?.AAAddress);
                setSnackbar({
                  isOpen: true,
                  timeOut: 5000,
                  type: 'success',
                  message: 'Copied to clipboard'
                });
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
          <Box sx={{
            alignItems: 'center',
            display: 'flex',
            marginBottom: 1
          }}>
            <Typography sx={{
              color: '#929292',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              width: 200
            }}>User Id:</Typography>
            <Typography sx={{
              color: '#000000',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              width: '100%',
              wordBreak: 'break-all'
            }}>{props.userInfo?.userId}</Typography>
            <IconButton
              onClick={() => {
                window.navigator.clipboard.writeText(props.userInfo?.userId);
                setSnackbar({
                  isOpen: true,
                  timeOut: 5000,
                  type: 'success',
                  message: 'Copied to clipboard'
                });
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
          <Box sx={{
            alignItems: 'center',
            display: 'flex'
          }}>
            <Typography sx={{
              color: '#929292',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              width: 200
            }}>DID:</Typography>
            <Typography sx={{
              color: '#000000',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              width: '100%',
              wordBreak: 'break-all'
            }}>{props.userInfo?.did}</Typography>
            <IconButton
              onClick={() => {
                window.navigator.clipboard.writeText(props.userInfo?.did);
                setSnackbar({
                  isOpen: true,
                  timeOut: 5000,
                  type: 'success',
                  message: 'Copied to clipboard'
                });
              }}
            >
              <ContentCopyIcon />
            </IconButton>
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

      <SnackbarMessage snackbar={snackbar} setSnackbar={setSnackbar} />
    </>
  )
}
export default Header;
