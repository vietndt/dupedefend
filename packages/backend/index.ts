import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors middleware
import makeRequestMumbai from './chainlink-functions/request';
dotenv.config();

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors()); // Use the cors middleware

app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running!');
});

app.post('/chainlink-functions/youtube', async (req: Request, res: Response) => {
  const { videoOrChannelId, ownerWalletAddress, type } = req.body;
  if (!videoOrChannelId || !ownerWalletAddress || !type) {
    return res.status(400).json({ message: 'videoOrChannelId and ownerWalletAddress and type are required' });
  }
  try {
    const result = await makeRequestMumbai(videoOrChannelId, ownerWalletAddress, type);
    return res.json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});