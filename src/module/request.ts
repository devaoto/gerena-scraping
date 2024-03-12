import puppeteer, { Page } from 'puppeteer';

/**
 *
 * @param milliseconds - The milliseconds of waiting time
 * @returns timeout
 */

export const waitFor = (milliseconds: number) =>
  new Promise((r) => setTimeout(r, milliseconds));

const requestHandler = async (
  headless: boolean | 'shell'
): Promise<Page | undefined> => {
  try {
    const browser = await puppeteer.launch({ headless: headless });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0'
    );

    return page;
  } catch (error) {
    console.error('Error', error);
  }
};

export default requestHandler;
