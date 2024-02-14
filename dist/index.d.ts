/// <reference types="node" />
import { waitFor } from './module/request';
declare const Parser: {
    purchase: (playerId: string, diamonds: number, paymentType: 'gift-card' | 'voucher', serial: string, pin: string) => Promise<void>;
    successScreenshot: (imagePath: string) => Promise<{
        base64: string;
        hash: string;
        binary: Buffer;
    }>;
};
export { waitFor };
export default Parser;
//# sourceMappingURL=index.d.ts.map