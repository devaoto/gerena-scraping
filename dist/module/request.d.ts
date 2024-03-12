import { Browser } from 'puppeteer';
/**
 *
 * @param milliseconds - The milliseconds of waiting time
 * @returns timeout
 */
export declare const waitFor: (milliseconds: number) => Promise<unknown>;
declare const requestHandler: (headless: boolean | 'shell') => Promise<Browser | undefined>;
export default requestHandler;
//# sourceMappingURL=request.d.ts.map