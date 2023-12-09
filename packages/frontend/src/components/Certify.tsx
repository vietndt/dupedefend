import { Box, FormControl, Button, Paper, Typography, CircularProgress, InputAdornment, IconButton, OutlinedInput, InputLabel, Checkbox, FormControlLabel, Link } from "@mui/material";
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
import VideoPreview from "./VideoPreview";
import { DID } from '@iden3/js-iden3-core'
import { ethers } from "ethers";
import { getABI } from "../helpers/Contract";
import { youtubeFunctionString } from "../functions/youtube";
import { TransactionResponse } from "@ethersproject/providers";
import { pollingTransaction } from "../helpers/Utilities";

const Certify = (props: {
  setLoggedIn: Function
}) => {
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [provider, setProvider] = useState<any>();
  const [videoInputControl, setVideoInputControl] = useState<string>('');
  const [videoOrChannelId, setVideoOrChannelId] = useState<string>('');
  const [status, setStatus] = useState<ADAPTER_STATUS_TYPE>();
  const [step, setStep] = useState<'fill_id' | 'creating_identify' | 'copy_detail' | 'send_request' | 'completing' | 'completed'>();
  const [did, setDid] = useState<string>('');
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>();
  const [invalidVideo, setInvalidVideo] = useState<boolean>();
  const [putDetailCheck, setPutDetailCheck] = useState<boolean>(false);

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
      props.setLoggedIn(web3auth.status === 'connected');
    }
    init();
    // eslint-disable-next-line
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
    props.setLoggedIn(web3auth?.status === 'connected');
    setStep('fill_id');
  }

  const getDID = async () => {
    const rpc = new RPC(provider);
    const address = await rpc.getAddress();
    const privateKey = await rpc.getPrivateKey();
    const res = await identityCreation(privateKey);

      // step2 : donHostedSecretsVersion get from API (because youtube secret api key)
      // step3 : make smart contract as below
      //not sure where this contract call goes, but we need to add this
      // await functionsConsumer.methods.sendRequest(
      //   source, // source
      //   "0x", // user hosted secrets - encryptedSecretsUrls - empty in this example
      //   slotIdNumber, // slot ID of the encrypted secrets
      //   donHostedSecretsVersion, // version of the encrypted secrets -> this we need to create api to call from request.ts, will do 
      // uint256 userId,
      // string memory channelId,
      //   [], // bytesArgs - arguments can be encoded off-chain to bytes.
      //   subscriptionId,
      //   gasLimit,
      //   ethers.utils.formatBytes32String(donId) // jobId is bytes32 representation of donId
      // ).send({from: account});
    

    setDid(`My wallet: ${address}, My Polygon DID: ${res.did.string()}`)
    setStep('copy_detail');
  }

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
        setVideoOrChannelId(id);
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

  const sendRequest = async () => {
    const rpc = new RPC(provider);
    const address = await rpc.getAddress();
    const privateKey = await rpc.getPrivateKey();
    const res = await identityCreation(privateKey);
    const userId = await DID.idFromDID(res.did);
    const pvd = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/skcObGFfdsDGaGOWAmN7O1aNKyJkjXW1');
    const wallet = new ethers.Wallet(privateKey, pvd);
    const abi = getABI('SocialMediaVerifier');
    const contract = new ethers.Contract('0xE54C1690Ee523c827C97376d42cd35BeA01de226', abi, wallet);
    const response: TransactionResponse = await contract.sendRequest(
      youtubeFunctionString, // source
      '0x', // encryptedSecretsUrls
      0, // donHostedSecretsSlotID
      1702112931, // donHostedSecretsVersion
      userId.bigInt(), // userId
      [videoOrChannelId, address, 'video'], // args
      [], // bytesArgs
      '846', // subscriptionId
      300000, // gasLimit
      '0x66756e2d706f6c79676f6e2d6d756d6261692d31000000000000000000000000', // donID
    );
    pollingTransaction(response.hash, sendRequestCompleted, pvd);
  }

  const sendRequestCompleted = (status: number) => {
    if (status === 1) {
      setStep('completed');
    } else if (status === 0) {

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
      {status !== 'connected' ?
        <>
          <Typography component="h3" sx={{
            fontSize: 20,
            fontWeight: 600,
            textAlign: 'center'
          }}>Welcome to Dupe Defend</Typography>
          <Typography component="h3" sx={{
            fontSize: 16,
            textAlign: 'center'
          }}>Please login with your Google accout to continue</Typography>
          <Button variant="outlined" startIcon={<GoogleIcon />} disabled={status !== 'ready'} onClick={login} sx={{
            fontSize: 16,
            height: 50
          }}>Login with Google</Button>
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
                    setStep('creating_identify');
                    getDID();
                  }} sx={{
                    height: 40,
                    width: 180
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
              }}>Creating your credentials...</Typography>
              <CircularProgress size={65} color="success" />
            </Box> : <></>
          }
          {step === 'copy_detail' ?
            <>
              <Typography component="h3" sx={{
                fontSize: 20,
                fontWeight: 600
              }}>Identify credentials</Typography>
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
                <FormControlLabel
                  control={
                    <Checkbox checked={putDetailCheck} onChange={(e) => {
                      setPutDetailCheck(e.target.checked)
                    }} name="gilad" />
                  }
                  label="I have put information above in my video description"
                />
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 1
                }}>
                  <Button variant="contained" disabled={!videoInputControl || !putDetailCheck} onClick={() => {
                    setStep('send_request');
                  }} sx={{
                    height: 40,
                    width: 180
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
              }}>Start certify your video</Typography>
              <VideoPreview url={videoPreviewUrl} />
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 1
              }}>
                <Button variant="contained" disabled={!videoInputControl} onClick={() => {
                  sendRequest();
                  setStep('completing');
                }} sx={{
                  height: 40,
                  width: 180
                }}>Start Certify</Button>
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
              }}>Certifying your video...</Typography>
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
              <Typography sx={{
                fontSize: 16,
                textAlign: 'center'
              }}>Your video has been attested with your credentials and click <Link href={`https://mumbai.polygonscan.com/tx/0x2eb2f6c9c10979eec2bf06002095a0da69e4aae425ff21ec77cbb11f09154bce`} underline="hover">here</Link> to view your verified credentials</Typography>
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
export default Certify;
