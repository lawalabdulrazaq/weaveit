import express from 'express';
import cors from 'cors';
import { generateVideo } from './videoGenerator';
import { generateSpeech } from './textToSpeech';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/output', express.static(path.join(__dirname, 'output')));

// Video generation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { script, title, walletAddress, transactionSignature } = req.body;
    console.log('Received request:', { script, title, walletAddress, transactionSignature });

    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const audioPath = path.join(outputDir, `${transactionSignature}.mp3`);
    const videoPath = path.join(outputDir, `${transactionSignature}.mp4`);

    await generateSpeech(script, audioPath);
    await generateVideo(script, audioPath, videoPath);

    res.json({ 
      videoUrl: `/api/videos/${transactionSignature}`,
      message: 'Video generated successfully'
    });
  } catch (error) {
    console.error('Video generation error:', error);
    res.status(500).json({ error: 'Failed to generate video' });
  }
});

// Video serving endpoint
app.get('/api/videos/:transactionSignature', (req, res) => {
  const { transactionSignature } = req.params;
  const videoPath = path.join(__dirname, 'output', `${transactionSignature}.mp4`);
  
  if (!fs.existsSync(videoPath)) {
    res.status(404).json({ error: 'Video not found' });
    return;
  }
  
  res.sendFile(videoPath);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});