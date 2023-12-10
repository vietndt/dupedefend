import { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton, Link, Paper, Tooltip, Typography } from "@mui/material";
import CachedIcon from '@mui/icons-material/Cached';

import { ethers } from "ethers";

import { errorHandler, shorterAddress } from "../helpers/Utilities";
import { getABI } from "../helpers/Contract";
import Date from "./Date";
import SnackbarMessage from "./Snackbar";
import { ISnackbarConfig } from "../models/Snackbar";

const CertifyHistory = (props: {
  loggedIn: boolean,
  userInfo: any
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<Array<{
    requestor: string;
    videoOrChannelId: string;
    date: number;
    txHash: string;
  }>>([]);
  const [snackbar, setSnackbar] = useState<ISnackbarConfig>({
    isOpen: false
  } as any);

  useEffect(() => {
    if (props.userInfo) {
      getContractEvents();
    }
    // eslint-disable-next-line
  }, [props.userInfo]);

  const getContractEvents = async () => {
    setLoading(true);
    try {
      const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`);
      const abi = getABI('IssuerSimple');
      const contract = new ethers.Contract(process.env.REACT_APP_ISSUER_SIMPLE_CONTRACT as string, abi, provider);
      const txs = await contract.queryFilter({ topics: ['0x71bf0dbcca3a81d6ac3e071134aded0f8e9c7a855bd4ef79e20184ac4471fc56'] }, 0, 'latest');
      txs.sort((a, b) => a.blockNumber < b.blockNumber ? 1 : -1);
      const txsFiltered = txs.filter(tx => (tx.args?.requestor)?.toLowerCase() === (props.userInfo?.AAAddress).toLowerCase())
      const historyItems: Array<{
        requestor: string;
        videoOrChannelId: string;
        date: number;
        txHash: string;
      }> = [];

      txsFiltered.forEach((tx) => {
        historyItems.push({
          requestor: tx.args?.requestor,
          videoOrChannelId: tx.args?.videoOrChannelId,
          date: tx.blockNumber,
          txHash: tx.transactionHash
        });
      });
      setHistory(historyItems);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      errorHandler(err, setSnackbar);
    }
  }

  return (
    <>
      {props.loggedIn ?
        <Box component={Paper} sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 3,
          maxWidth: 1150,
          padding: 3,
          paddingTop: 1.5,
          width: '100%'
        }}>
          <Box sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Typography component="h3" sx={{
              fontSize: 22,
              fontWeight: 600
            }}>Certify history</Typography>
            <Tooltip title="Reload">
              <IconButton size="medium" onClick={getContractEvents}>
                <CachedIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{
            display: 'flex',
            overflowX: 'auto',
            width: '100%'
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              minHeight: 150,
              minWidth: 800,
              width: '100%'
            }}>
              <Box sx={{
                alignItems: 'center',
                borderBottom: '1px solid #c3c3c3',
                display: 'flex',
                padding: '8px 0',
                width: '100%'
              }}>
                <Typography component="h3" sx={{
                  fontSize: 16,
                  width: '25%'
                }}>Claim Date</Typography>
                <Typography component="h3" sx={{
                  fontSize: 16,
                  width: '25%'
                }}>Video ID</Typography>
                <Typography component="h3" sx={{
                  fontSize: 16,
                  width: '25%'
                }}>Requestor</Typography>
                <Typography component="h3" sx={{
                  fontSize: 16,
                  width: '25%'
                }}>Tx Hash</Typography>
              </Box>
              {loading ?
                <>
                  <CircularProgress size={65} color="success" />
                  <Typography>Loading transaction history...</Typography>
                </> :
                <>
                  {history.length === 0 ?
                    <Typography>No transaction history found</Typography> :
                    <>
                      {history.map(item =>
                        <Box key={item.txHash} sx={{
                          alignItems: 'center',
                          borderBottom: '1px solid #c3c3c3',
                          display: 'flex',
                          padding: '8px 0',
                          width: '100%'
                        }}>
                          <Typography component="h3" sx={{
                            fontSize: 16,
                            width: '25%'
                          }}>
                            <Date blockNumber={item.date} />
                          </Typography>
                          <Link href={`https://youtu.be/${item.videoOrChannelId}`} target="_blank" underline="hover" sx={{
                            fontSize: 16,
                            width: '25%'
                          }}>{item.videoOrChannelId}</Link>
                          <Link href={`https://mumbai.polygonscan.com/address/${item.requestor}`} target="_blank" underline="hover" sx={{
                            fontSize: 16,
                            width: '25%'
                          }}>{shorterAddress(item.requestor)}</Link>
                          <Link href={`https://mumbai.polygonscan.com/tx/${item.txHash}`} target="_blank" underline="hover" sx={{
                            fontSize: 16,
                            width: '25%'
                          }}>{shorterAddress(item.txHash)}</Link>
                        </Box>
                      )}
                    </>
                  }
                </>
              }
            </Box>
          </Box>
        </Box> : <></>
      }

      <SnackbarMessage snackbar={snackbar} setSnackbar={setSnackbar} />
    </>
  )
}
export default CertifyHistory;