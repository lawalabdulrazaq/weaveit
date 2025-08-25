import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { transactionSignature } = req.query;
    const videoPath = path.join(process.cwd(), 'src', 'output', `${transactionSignature}.mp4`);
    if (!fs.existsSync(videoPath)) {
      res.status(404).json({ error: 'Video not found' });
      return;
    }
    res.setHeader('Content-Type', 'video/mp4');
    const fileStream = fs.createReadStream(videoPath);
    fileStream.pipe(res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
