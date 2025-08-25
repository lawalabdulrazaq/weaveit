import { NextApiRequest, NextApiResponse } from 'next';
import { generateVideo, generateScrollingScriptVideo } from '../../src/videoGenerator';
import { generateSpeech } from '../../src/textToSpeech';
import { enhanceScript } from '../../src/codeAnalyzer';
import path from 'path';
import fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { script, title, walletAddress, transactionSignature } = req.body;
      // Get the AI explanation for narration (not for display)
      const explanation = await enhanceScript(script);
      const outputDir = path.join(process.cwd(), 'src', 'output');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      const audioPath = path.join(outputDir, `${transactionSignature}.mp3`);
      const videoPath = path.join(outputDir, `${transactionSignature}.mp4`);
      await generateSpeech(explanation, audioPath);
      await generateScrollingScriptVideo(script, audioPath, videoPath);
      res.status(200).json({ 
        videoUrl: `/api/videos/${transactionSignature}`,
        message: 'Educational tutorial video generated successfully'
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate video' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
