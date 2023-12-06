import { Box, FormControl, TextField, Button, Paper, Typography, CircularProgress, InputAdornment, IconButton, OutlinedInput } from "@mui/material";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { useEffect, useState } from "react";
import RPC from "../helpers/EthereumRPC";
import { ADAPTER_STATUS_TYPE } from "@web3auth/base";
import GoogleIcon from '@mui/icons-material/Google';
import { WALLET_ADAPTERS } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { identityCreation } from "../helpers/PolygonId";

const Verify = () => {
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [provider, setProvider] = useState<any>();
  const [videoInputControl, setVideoInputControl] = useState<string>('');
  const [status, setStatus] = useState<ADAPTER_STATUS_TYPE>();
  const [step, setStep] = useState<'fill_id' | 'creating_identify' | 'copy_detail' | 'send_request' | 'completing' | 'completed'>();
  const [did, setDid] = useState<string>('');

  useEffect(() => {
    const privateKeyProvider = new EthereumPrivateKeyProvider({
      config: {
        chainConfig: {
          chainNamespace: "eip155",
          chainId: "0x13881",
          rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
          displayName: "Polygon Mumbai",
          blockExplorer: "https://mumbai.polygonscan.com",
          ticker: "MATIC",
          tickerName: "Polygon",
        } as any,
      },
    });
    const web3auth = new Web3AuthNoModal({
      clientId: "BFueA9j25I-t1tx4IBtMV1WE-nLztqNw_afIWyaziwcSrhmGg6sLSel-UanfJ0Mp-4WEpn5x0komU5iuzFi7U8U",
      web3AuthNetwork: "sapphire_devnet",
      chainConfig: {
        chainNamespace: "eip155",
        chainId: "0x13881",
        rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
        displayName: "Polygon Mumbai",
        blockExplorer: "https://mumbai.polygonscan.com",
        ticker: "MATIC",
        tickerName: "Polygon",
      },
    });
    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: {
        loginConfig: {
          google: {
            name: "Google Login",
            verifier: "dupedefend",
            typeOfLogin: "google",
            clientId: "842843862501-nru8r1o62e97lfj7ln70cl91h60blilg.apps.googleusercontent.com"
          },
        },
      },
      privateKeyProvider
    });
    web3auth.configureAdapter(openloginAdapter);
    setWeb3auth(web3auth);
    const init = async () => {
      await web3auth.init();
      if (web3auth.provider) {
        setProvider(web3auth.provider);
      };
      setStatus(web3auth.status);
    }
    init();
  }, []);

  useEffect(() => {
    if (status === 'connected') {
      setStep('fill_id');
    }
  }, [status])

  const login = async () => {
    const web3authProvider = await web3auth?.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: "google",
    });
    setProvider(web3authProvider);
    setStatus(web3auth?.status);
    setStep('fill_id');
  }

  const getInfo = async () => {
    const user = await web3auth?.getUserInfo();
    console.log(user);
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log('chainId:', chainId);
    const address = await rpc.getAccounts();
    console.log('address:', address);
    const balance = await rpc.getBalance();
    console.log('balance:', balance);
    // const signedMessage = await rpc.signMessage();
    // console.log(signedMessage);
    const privateKey = await rpc.getPrivateKey();
    console.log('privateKey:', privateKey);
  }

  const getDID = async () => {
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    const res = await identityCreation();
    setDid(`My wallet: ${address},\nMy Polygon DID: ${res.did.string()}`)
    setStep('copy_detail');
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
      {status !== 'connected' ?
        <>
          <Typography component="h3" sx={{
            fontSize: 20,
            fontWeight: 600
          }}>Welcome to Dupe Defend</Typography>
          <Typography component="h3" sx={{
            fontSize: 14,
            fontWeight: 600
          }}>Please login with your Google accout to continue</Typography>
          <Button variant="outlined" startIcon={<GoogleIcon />} disabled={status !== 'ready'} onClick={login}>Login with Google</Button>
        </> :
        <>
          {step === 'fill_id' ?
            <>
              <Typography component="h3" sx={{
                fontSize: 20,
                fontWeight: 600
              }}>Enter your video</Typography>
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
                    helperText="E.g. xyFa2amJJoY or https://www.youtube.com/watch?v=xyFa2amJJoY"
                    value={videoInputControl}
                    onChange={(event) => {
                      const value = event.target.value;
                      setVideoInputControl(value);
                    }}
                  />
                </FormControl>
                <Box>
                  <Button variant="contained" disabled={!videoInputControl} onClick={() => {
                    setStep('creating_identify')
                    getDID();
                  }}>Next</Button>
                </Box>
              </Box>
            </> : <></>
          }
          {step === 'creating_identify' ?
            <Box sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <Typography component="h3" sx={{
                fontSize: 20,
                fontWeight: 600
              }}>Creating your identify</Typography>
              <CircularProgress size={65} color="success" />
            </Box> : <></>
          }
          {step === 'copy_detail' ?
            <>
            <Typography component="h3" sx={{
              fontSize: 20,
              fontWeight: 600
            }}>Identify Created</Typography>
            <Typography component="h3" sx={{
              fontSize: 13,
              fontWeight: 600
            }}>Put this into your video description and then click next</Typography>
              <Box component="form" sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                width: '100%'
              }}>
                <FormControl sx={{
                  width: { xs: '100%' }
                }}>
                  <OutlinedInput
                    multiline
                    minRows={3}
                    disabled
                    value={did}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            window.navigator.clipboard.writeText(did);
                          }}
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Box>
                  <Button variant="contained" disabled={!videoInputControl} onClick={() => {
                      setStep('send_request');
                  }}>Next</Button>
                </Box>
              </Box>
            </> : <></>
          }
          {step === 'send_request' ?
            <>
              <Typography component="h3" sx={{
                fontSize: 20,
                fontWeight: 600
              }}>Complete verify</Typography>
              <Box>
                <Button variant="contained" disabled={!videoInputControl} onClick={() => {
                  setStep('completing');
                  setTimeout(() => {
                    setStep('completed');
                  }, 3000)
                }}>Complete</Button>
              </Box>
            </> : <></>
          }
          {step === 'completing' ?
            <Box sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <Typography component="h3" sx={{
                fontSize: 20,
                fontWeight: 600
              }}>Completing</Typography>
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
              <Typography component="h3" sx={{
                fontSize: 20,
                fontWeight: 600
              }}>Successfully</Typography>
              <CheckCircleIcon color="success" sx={{
                fontSize: 48
              }} />
            </Box> : <></>
          }
        </>
      }
    </Box>
  )
}
export default Verify;
