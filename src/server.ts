import express from 'express';
import cors from 'cors';
import { generateVideo, generateScrollingScriptVideo } from './videoGenerator';
import { generateSpeech } from './textToSpeech';
import { enhanceScript } from './codeAnalyzer';
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
    console.log('Processing tutorial request:', title);

    // Get the AI explanation for narration (not for display)
    const explanation = await enhanceScript(script);
    console.log('AI explanation for narration generated');

    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const audioPath = path.join(outputDir, `${transactionSignature}.mp3`);
    const videoPath = path.join(outputDir, `${transactionSignature}.mp4`);

    // Generate speech from the explanation (for audio)
    await generateSpeech(explanation, audioPath);
    console.log('Speech generation completed');

    // Generate video: display the original script, use the explanation audio
    await generateScrollingScriptVideo(script, audioPath, videoPath);
    console.log('Video generation completed');

    res.json({ 
      videoUrl: `/api/videos/${transactionSignature}`,
      message: 'Educational tutorial video generated successfully'
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