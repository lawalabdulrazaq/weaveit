import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { generateScrollingScriptVideo } from '../../../src/videoGenerator';
import { generateSpeech } from '../../../src/textToSpeech';
import { enhanceScript } from '../../../src/codeAnalyzer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { script, title, walletAddress, transactionSignature } = req.body;
    console.log('Processing tutorial request:', { title, transactionSignature, walletAddress });
    if (!transactionSignature) {
      console.error('Missing transactionSignature');
      res.status(400).json({ error: 'Missing transactionSignature' });
      return;
    }
    if (!script || typeof script !== 'string' || script.trim().length === 0) {
      console.error('Missing or empty script');
      res.status(400).json({ error: 'Missing or empty script' });
      return;
    }
    // Get the AI explanation for narration (not for display)
    const explanation = await enhanceScript(script);
    console.log('AI explanation for narration generated:', explanation?.slice(0, 100));
    const outputDir = path.join(process.cwd(), 'src', 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log('Created output directory:', outputDir);
    }
    const audioPath = path.join(outputDir, `${transactionSignature}.mp3`);
    const videoPath = path.join(outputDir, `${transactionSignature}.mp4`);
    // Generate speech from the explanation (for audio)
    await generateSpeech(explanation, audioPath);
    console.log('Speech generation completed, audio file:', audioPath, 'Exists:', fs.existsSync(audioPath));
    // Generate video: display the original script, use the explanation audio
    await generateScrollingScriptVideo(script, audioPath, videoPath);
    console.log('Video generation completed, video file:', videoPath, 'Exists:', fs.existsSync(videoPath));
    // Check if video file was actually created and is not empty
    let videoStats = null;
    try {
      videoStats = fs.statSync(videoPath);
    } catch (err) {
      console.error('Video file not found after generation:', videoPath);
      res.status(500).json({ error: 'Video file not found after generation' });
      return;
    }
    if (!videoStats || videoStats.size < 1000) { // Arbitrary small size threshold
      console.error('Generated video file is empty or too small:', videoPath, 'Size:', videoStats?.size);
      res.status(500).json({ error: 'Generated video file is empty or too small' });
      return;
    }
    res.status(200).json({
      videoUrl: `/api/videos/${transactionSignature}`,
      message: 'Educational tutorial video generated successfully',
      videoStats
    });
  } catch (error: any) {
    console.error('Video generation error:', error);
    res.status(500).json({ error: 'Failed to generate video', details: error?.message || error });
  }
}
