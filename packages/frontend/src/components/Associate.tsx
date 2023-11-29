import { useState } from "react";
import { Box, FormControl, TextField, Button, Paper, Typography } from "@mui/material";
import { ConnectButton } from '@rainbow-me/rainbowkit';

import {
  SubscriptionManager,
  simulateScript,
  ResponseListener,
  ReturnType,
  decodeResult,
  FulfillmentCode,
  SecretsManager,
} from "@chainlink/functions-toolkit";
import { ethers } from 'ethers';
// import envvar from "@chainlink/env-enc";
// envvar.config();

const Associate = () => {
  const [videoInputControl, setVideoInputControl] = useState<string>('');
  const [channelHandleString, setChannelHandleString] = useState<string>('');
  const [snippet, setSnippet] = useState<any>();

  const getVideoDetail = (id: string) => {
    fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,)
      .then(response => {
        if (response.ok) return response.json();
      }).then(json => {
        if (json.items && json.items[0] && json.items[0].snippet) {
          setSnippet(json.items[0].snippet)
          getChannelHandleString(json.items[0].snippet.channelId);
        }
      });
  }

  const getChannelHandleString = (channelId: string) => {
    fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,)
      .then(response => {
        if (response.ok) return response.json();
      }).then(json => {
        if (json.items && json.items[0] && json.items[0].snippet) {
          setChannelHandleString(json.items[0].snippet.customUrl)
        }
      });
  }

  const makeRequest = async () => {

    const functionsConsumerAbi = require("../abis/functionsClient.json");
    const consumerAddress = "0x9C6d9F8a10Af92EFf70DBF8EdA0dB2929D7f0c06"; // REPLACE this with your Functions consumer address
    const subscriptionId = 846; // REPLACE this with your subscription ID
    const routerAddress = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C";
    const linkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
    const donId = "fun-polygon-mumbai-1";
    const explorerUrl = "https://mumbai.polygonscan.com";
    const gatewayUrls = [
      "https://01.functions-gateway.testnet.chain.link/",
      "https://02.functions-gateway.testnet.chain.link/",
    ];

    const source = `
      const coinMarketCapCoinId = args[0];
      const currencyCode = args[1];

      if (!secrets.apiKey) {
        throw Error(
          "COINMARKETCAP_API_KEY environment variable not set for CoinMarketCap API.  Get a free key from https://coinmarketcap.com/api/"
        );
      }

      const coinMarketCapRequest = Functions.makeHttpRequest({
        url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
        headers: {
          "Content-Type": "application/json",
          "X-CMC_PRO_API_KEY": secrets.apiKey,
        },
        params: {
          convert: currencyCode,
          id: coinMarketCapCoinId,
        },
      });

      const coinMarketCapResponse = await coinMarketCapRequest;

      if (coinMarketCapResponse.error) {
        throw new Error("CoinMarketCap Error");
      }

      const price = coinMarketCapResponse.data.data[coinMarketCapCoinId]["quote"][currencyCode]["price"];
      return Functions.encodeUint256(Math.round(price * 100));
    `;

    const args = ["1", "USD"];
    const secrets = { apiKey: '1a9dbce7-db85-4e89-8900-32d7afe1a484' };
    const slotIdNumber = 0; // slot ID where to upload the secrets
    const expirationTimeMinutes = 15; // expiration time in minutes of the secrets
    const gasLimit = 300000;

    const response: any = await simulateScript({
      source: source,
      args: args,
      bytesArgs: [], // bytesArgs - arguments can be encoded off-chain to bytes.
      secrets: secrets, // no secrets in this example
    });

    console.log("Simulation result", response);
    const errorString = response.errorString;
    if (errorString) {
      console.log(`❌ Error during simulation: `, errorString);
    } else {
      const returnType = ReturnType.uint256;
      const responseBytesHexstring = response.responseBytesHexstring;
      if (ethers.utils.arrayify(responseBytesHexstring as string).length > 0) {
        const decodedResponse = decodeResult(
          response.responseBytesHexstring,
          returnType
        );
        console.log(`✅ Decoded response to ${returnType}: `, decodedResponse);
      }
    }





    
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
            let id = '';
            if (videoInputControl.indexOf('?v=') !== -1) {
              id = videoInputControl.slice(videoInputControl.indexOf('?v=') + 3, videoInputControl.length);
            } else {
              id = videoInputControl;
            }
            getVideoDetail(id);
          }}>Associate</Button>
          <Button onClick={makeRequest}>Make request</Button>
        </Box>
        {snippet ?
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}>
            <Typography>ChannelId: {snippet.channelId}</Typography>
            {channelHandleString ? <Typography>Username: {channelHandleString}</Typography> : <></>}
            <Typography>Title: {snippet.title}</Typography>
            <Typography>Description: {snippet.description}</Typography>
          </Box> : <></>}
      </Box>
    </Box>
  )
}
export default Associate;
