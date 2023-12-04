export const youtubeFunctionString = `

// Begin Function
const channelId = args[0];
const channelOwnerWalletAddress = args[1];

if (!secrets.apiKey) {
  throw Error(
    "YOUTUBE_API_KEY required"
  );
}

const youtubeRequest = Functions.makeHttpRequest({
  url: "https://youtube.googleapis.com/youtube/v3/channels",
  method: "GET",
  params: {
    part: "snippet",
    id: channelId,
    key: secrets.apiKey
  },
});

const youtubeResponse = await youtubeRequest;

if (youtubeResponse.error) {
  throw new Error("Youtube Error");
}

if (youtubeResponse.data && youtubeResponse.data.items[0]) {
  const channelDescription = youtubeResponse.data.items[0].snippet.description;
  const walletIndex = channelDescription.indexOf(channelOwnerWalletAddress);
  return Functions.encodeString(walletIndex);
} else {
  throw new Error("Youtube Error");
}
// End Function

`;