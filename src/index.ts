import path from 'path';
import requestHandler, { waitFor } from './module/request';
import { processImage } from './processImage';
import { unlinkSync } from 'fs';
import { pPurchase } from './module/purchase';
import { Browser } from 'puppeteer';

const Parser = {
  purchase: async (
    playerId: string,
    diamonds: number,
    paymentType: 'gift-card' | 'voucher',
    serial: string,
    pin: string,
    headless: boolean | 'shell'
  ) => {
    const browser = await requestHandler(headless);
    return await pPurchase(
      browser as Browser,
      playerId,
      diamonds,
      paymentType,
      serial,
      pin
    );
  },
};

export { waitFor };
export default Parser;
