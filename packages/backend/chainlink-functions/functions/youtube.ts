export const youtubeFunctionString = `

// Begin Function
const channelId = args[0];
const channelOwnerWalletAddress = args[1];

if (!secrets.apiKey) {
  throw Error(
    "YOUTUBE_API_KEY required"
  );
}

let requestUrl = "https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id="
requestUrl += channelId;
requestUrl += "&key=";
requestUrl += secrets.apiKey;

const youtubeRequest = Functions.makeHttpRequest({
  url: requestUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

const youtubeResponse = await youtubeRequest;

if (youtubeResponse.error) {
  throw new Error("Youtube Error");
}

const channelDescription = youtubeResponse.items[0].snippet.channelId;

return Functions.encodeUint256(channelDescription.indexOf(channelOwnerWalletAddress));
// End Function

`;