export const youtubeFunctionString = `

// Begin Function
const videoOrChannelId = args[0];
const ownerWalletAddress = args[1];
const type = args[2]; // "video" | "channel"

if (!secrets.apiKey) {
  throw Error(
    "YOUTUBE_API_KEY required"
  );
}

let youtubeRequest;

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

if (youtubeResponse.data && youtubeResponse.data.items && youtubeResponse.data.items[0]) {
  const description = youtubeResponse.data.items[0].snippet.description;
  const walletIndex = description.indexOf(ownerWalletAddress);
  return Functions.encodeInt256(walletIndex);
} else {
  throw new Error("Youtube video or channel not found");
}
// End Function

`;