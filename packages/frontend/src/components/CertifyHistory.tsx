import { Box, Link, Paper, Typography } from "@mui/material";
import moment from 'moment';
import { shorterAddress } from "../helpers/Utilities";

const CertifyHistory = (props: {
  loggedIn: boolean
}) => {
  return (
    <>
      {props.loggedIn ?
        <Box component={Paper} sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          justifyContent: 'center',
          marginTop: 3,
          maxWidth: 1150,
          padding: 3,
          width: '100%'
        }}>
          <Typography component="h3" sx={{
            fontSize: 22,
            fontWeight: 600
          }}>Certify history</Typography>
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
            }}>{moment().format('DD-MM-yyyy')}</Typography>
            <Link href="https://youtu.be/xyFa2amJJoY?si=Nlimv_JXOKTUpsAD" target="_blank" underline="hover" sx={{
              fontSize: 16,
              width: '25%'
            }}>xyFa2amJJoY</Link>
            <Link href={`https://mumbai.polygonscan.com/address/0x3A0b03C185cef0BA567143CE21eE9d81Efcd31e5`} target="_blank" underline="hover" sx={{
              fontSize: 16,
              width: '25%'
            }}>{shorterAddress('0x3A0b03C185cef0BA567143CE21eE9d81Efcd31e5')}</Link>
            <Link href={`https://mumbai.polygonscan.com/tx/0x2eb2f6c9c10979eec2bf06002095a0da69e4aae425ff21ec77cbb11f09154bce`} target="_blank" underline="hover" sx={{
              fontSize: 16,
              width: '25%'
            }}>{shorterAddress('0x2eb2f6c9c10979eec2bf06002095a0da69e4aae425ff21ec77cbb11f09154bce')}</Link>
          </Box>
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
            }}>{moment().format('DD-MM-yyyy')}</Typography>
            <Link href="https://youtu.be/xyFa2amJJoY?si=Nlimv_JXOKTUpsAD" target="_blank" underline="hover" sx={{
              fontSize: 16,
              width: '25%'
            }}>xyFa2amJJoY</Link>
            <Link href={`https://mumbai.polygonscan.com/address/0x3A0b03C185cef0BA567143CE21eE9d81Efcd31e5`} target="_blank" underline="hover" sx={{
              fontSize: 16,
              width: '25%'
            }}>{shorterAddress('0x3A0b03C185cef0BA567143CE21eE9d81Efcd31e5')}</Link>
            <Link href={`https://mumbai.polygonscan.com/tx/0x2eb2f6c9c10979eec2bf06002095a0da69e4aae425ff21ec77cbb11f09154bce`} target="_blank" underline="hover" sx={{
              fontSize: 16,
              width: '25%'
            }}>{shorterAddress('0x2eb2f6c9c10979eec2bf06002095a0da69e4aae425ff21ec77cbb11f09154bce')}</Link>
          </Box>
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
            }}>{moment().format('DD-MM-yyyy')}</Typography>
            <Link href="https://youtu.be/xyFa2amJJoY?si=Nlimv_JXOKTUpsAD" target="_blank" underline="hover" sx={{
              fontSize: 16,
              width: '25%'
            }}>xyFa2amJJoY</Link>
            <Link href={`https://mumbai.polygonscan.com/address/0x3A0b03C185cef0BA567143CE21eE9d81Efcd31e5`} target="_blank" underline="hover" sx={{
              fontSize: 16,
              width: '25%'
            }}>{shorterAddress('0x3A0b03C185cef0BA567143CE21eE9d81Efcd31e5')}</Link>
            <Link href={`https://mumbai.polygonscan.com/tx/0x2eb2f6c9c10979eec2bf06002095a0da69e4aae425ff21ec77cbb11f09154bce`} target="_blank" underline="hover" sx={{
              fontSize: 16,
              width: '25%'
            }}>{shorterAddress('0x2eb2f6c9c10979eec2bf06002095a0da69e4aae425ff21ec77cbb11f09154bce')}</Link>
          </Box>
        </Box> : <></>
      }
    </>
  )
}
export default CertifyHistory;