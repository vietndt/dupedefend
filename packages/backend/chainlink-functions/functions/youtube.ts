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
  throw new Error("Youtube error");
}

if (youtubeResponse.data && youtubeResponse.data.items && youtubeResponse.data.items[0]) {
  const channelDescription = youtubeResponse.data.items[0].snippet.description;
  const walletIndex = channelDescription.indexOf(channelOwnerWalletAddress);
  if (walletIndex === -1) {
    throw new Error("Youtube channel not found");
  }
  else{
    return Functions.encodeString(channelOwnerWalletAddress, walletIndex);//need to change walletIndex to the channelID, using int for now because contract is expecting int
  }
} else {
  throw new Error("Youtube channel not found");
}
// End Function

`;