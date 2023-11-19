
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { issueCredential } from './lib/service';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/requestcredential', (req, res) => {
  const { credential } = req.body;
  
  // Process the credential string here
  
  res.send('Credential issued successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
