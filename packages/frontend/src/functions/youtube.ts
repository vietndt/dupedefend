export const youtubeFunctionString = `

// Begin Function
// args = [videoOrChannelId, ownerWalletAddress, type]
const videoOrChannelId = args[0]; // video or channel id get from youtube eg. xyFa2amJJoY
const ownerWalletAddress = args[1]; // owner wallet address eg. 0x1282401445452436b4094E86619B2Fd2fAD464d8
const type = args[2]; // "video" | "channel"

// Youtube API key get from https://console.cloud.google.com/apis/dashboard
if (!secrets.apiKey) {
  throw Error(
    "YOUTUBE_API_KEY required"
  );
}

// Youtube API request
if (type === "channel") {
  youtubeRequest = Functions.makeHttpRequest({
    url: "https://youtube.googleapis.com/youtube/v3/channels",
    method: "GET",
    params: {
      part: "snippet",
      id: videoOrChannelId,
      key: secrets.apiKey
    },
  });
} else {
  youtubeRequest = Functions.makeHttpRequest({
    url: "https://youtube.googleapis.com/youtube/v3/videos",
    method: "GET",
    params: {
      part: "snippet",
      id: videoOrChannelId,
      key: secrets.apiKey
    },
  });
}

const youtubeResponse = await youtubeRequest;

if (youtubeResponse.error) {
  throw new Error("Youtube error");
}

// Checking youtube response if !youtubeResponse.data.items[0] -> Youtube video or channel not found
if (youtubeResponse.data && youtubeResponse.data.items && youtubeResponse.data.items[0]) {
  const description = youtubeResponse.data.items[0].snippet.description.toLowerCase();
  const walletIndex = description.indexOf(ownerWalletAddress.toLowerCase());
  // If it found owner wallet address return 1, otherwise 0
  const resultInt = walletIndex !== -1 ? 1 : 0;
  return Functions.encodeUint256(resultInt);
} else {
  throw new Error("Youtube video or channel not found");
}
// End Function

`;