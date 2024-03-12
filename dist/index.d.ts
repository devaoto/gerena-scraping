import { waitFor } from './module/request';
declare const Parser: {
    purchase: (playerId: string, diamonds: number, paymentType: 'gift-card' | 'voucher', serial: string, pin: string, headless: boolean | 'shell') => Promise<string | undefined>;
};
export { waitFor };
export default Parser;
//# sourceMappingURL=index.d.ts.map