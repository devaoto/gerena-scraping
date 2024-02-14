import path from 'path';
import requestHandler from './module/request';
import { processImage } from './processImage';
import { unlinkSync } from 'fs';

const rootDirectory: string = __dirname;
const imageName: string = 'success.png';
const imagePath: string = path.join(rootDirectory, imageName);

const Parser = {
  purchase: async (
    playerId: string,
    diamonds: number,
    paymentType: 'gift-card' | 'voucher',
    serial: string,
    pin: string
  ) => await requestHandler(playerId, diamonds, paymentType, serial, pin),
  successScreenshot: async () => {
    const processedImage = await processImage(imagePath);

    unlinkSync(imageName);

    return processedImage;
  },
};

export default Parser;
