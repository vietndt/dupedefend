import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import makeRequestMumbai from './chainlink-functions/request';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running!');
});

app.get('/chainlink-functions/youtube', async (req: Request, res: Response) => {
  await makeRequestMumbai()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});