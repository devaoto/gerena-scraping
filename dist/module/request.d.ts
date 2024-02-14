/**
 *
 * @param milliseconds - The milliseconds of waiting time
 * @returns timeout
 */
export declare const waitFor: (milliseconds: number) => Promise<unknown>;
declare const requestHandler: (playerId: string, diamonds: number, paymentType: 'gift-card' | 'voucher', serial: string, pin: string) => Promise<void>;
export default requestHandler;
//# sourceMappingURL=request.d.ts.map