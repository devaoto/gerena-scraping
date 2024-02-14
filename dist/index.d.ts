/// <reference types="node" />
declare const Parser: {
    purchase: (playerId: string, diamonds: number, paymentType: 'gift-card' | 'voucher', serial: string, pin: string) => Promise<void>;
    successScreenshot: () => Promise<{
        base64: string;
        hash: string;
        binary: Buffer;
    }>;
};
export default Parser;
//# sourceMappingURL=index.d.ts.map