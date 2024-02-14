import * as crypto from 'crypto';
import sharp = require('sharp');

export async function processImage(
  imagePath: string
): Promise<{ base64: string; hash: string; binary: Buffer }> {
  try {
    const processedImageBuffer = await sharp(imagePath).resize(300).toBuffer();
    const hash = crypto.createHash('sha256');
    hash.update(processedImageBuffer);
    const imageHash = hash.digest('hex');
    const base64Data = processedImageBuffer.toString('base64');

    return {
      base64: base64Data,
      hash: imageHash,
      binary: processedImageBuffer,
    };
  } catch (error) {
    console.error('Error processing image:', (error as Error).message);
    throw error;
  }
}
