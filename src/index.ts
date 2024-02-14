import path from 'path';
import requestHandler, { waitFor } from './module/request';
import { processImage } from './processImage';
import { unlinkSync } from 'fs';

const Parser = {
  purchase: async (
    playerId: string,
    diamonds: number,
    paymentType: 'gift-card' | 'voucher',
    serial: string,
    pin: string
  ) => await requestHandler(playerId, diamonds, paymentType, serial, pin),
  successScreenshot: async (imagePath: string) => {
    const processedImage = await processImage(imagePath);

    unlinkSync('success.png');

    return processedImage;
  },
};

export { waitFor };
export default Parser;
