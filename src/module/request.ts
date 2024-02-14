import puppeteer from 'puppeteer';
import { parsePin } from './pinParser';
import { parseCode } from './parseCode';

/**
 *
 * @param milliseconds - The milliseconds of waiting time
 * @returns timeout
 */

export const waitFor = (milliseconds: number) =>
  new Promise((r) => setTimeout(r, milliseconds));

const requestHandler = async (
  playerId: string,
  diamonds: number,
  paymentType: 'gift-card' | 'voucher',
  serial: string,
  pin: string
) => {
  try {
    const browser = await puppeteer.launch({ headless: 'shell' });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0'
    );

    await page.goto('https://shop.garena.my/app');
    await waitFor(2000);

    await page.waitForSelector(
      '#react-root > div > div > div > ul > li:nth-child(4)'
    );

    await page.click('#react-root > div > div > div > ul > li:nth-child(4)', {
      delay: 100,
    });
    await waitFor(1000);

    await waitFor(2000);

    await page.click(
      '#react-root > div > div > div > div._2jUfI-rShEmbiWShOS-Vsp > div._398I0fs2EPlZotPmbmuUDk > div:nth-child(2) > div.IYkDBLcPrLrtdeIei9Dyd > div:nth-child(5) > img',
      { delay: 100 }
    );

    await waitFor(1000);

    await waitFor(2000);

    await page.type('input[name="playerId"]', playerId, { delay: 200 });
    await waitFor(1000);

    await page.click('input[type="submit"]', { delay: 100 });

    try {
      await page.waitForSelector(
        'iframe[src^="https://geo.captcha-delivery.com"]'
      );

      const iframeHandle = await page.$(
        'iframe[src^="https://geo.captcha-delivery.com"]'
      );
      const frame = await iframeHandle?.contentFrame();

      await waitFor(5000);

      try {
        await waitFor(5000);
      } catch (err) {
        console.error('Error', err);
      }
    } finally {
      await waitFor(1000);

      await page.click(
        '#react-root > div > div > div > div:nth-child(5) > div._3aMiNQIi-Ol3ox43Etq58E > div._2zCeRVXW_DQULAKpjApXek > div > div > div._3UAY7fkI8vOaPlb5Z3Y7I6 > div > div > input',
        { delay: 100 }
      );

      await waitFor(10000);

      let divNth: string = '1';
      let buttonNth: '1' | '2' = '1';

      switch (diamonds) {
        case 25:
          divNth = '1';
          break;
        case 50:
          divNth = '2';
          break;
        case 115:
          divNth = '3';
          break;
        case 240:
          divNth = '4';
          break;
        case 610:
          divNth = '5';
          break;
        case 1240:
          divNth = '6';
          break;
        case 2530:
          divNth = '7';
          break;
        default:
          console.error(
            new RangeError('Diamond range should be between 25 to 2530')
          );
      }

      switch (paymentType) {
        case 'gift-card':
          buttonNth = '2';
          break;
        case 'voucher':
          buttonNth = '1';
          break;
      }

      await waitFor(1000);

      await page.waitForSelector(`.payment-denom-button:nth-child(${divNth})`);

      await page.click(`.payment-denom-button:nth-child(${divNth})`, {
        delay: 100,
      });

      await waitFor(3000);

      await page.waitForSelector(
        '#accordionPayment > div:nth-child(1) > div.payment-panel-heading > div > button'
      );

      await page.click(
        '#accordionPayment > div:nth-child(1) > div.payment-panel-heading > div > button',
        { delay: 100 }
      );

      await waitFor(1000);

      await page.waitForSelector(
        `.payment-button-sizer:nth-child(${buttonNth})`
      );

      await page.click(`.payment-button-sizer:nth-child(${buttonNth})`, {
        delay: 100,
      });

      await waitFor(2000);

      let { pinOne, pinTwo, pinThree, pinFour } = parsePin(pin);
      let { one, two } = parseCode(serial);

      await waitFor(2000);

      await page.type('#serial_1', String(one), { delay: 200 });
      await page.type('#serial_2', String(two), { delay: 200 });

      await page.type('input[name="pin_1"]', pinOne, { delay: 200 });
      await page.type('input[name="pin_2"]', pinTwo, { delay: 200 });
      await page.type('input[name="pin_3"]', pinThree, { delay: 200 });
      await page.type('input[name="pin_4"]', pinFour, { delay: 200 });

      await waitFor(1000);

      await page.click('input[value="Confirm"]', { delay: 100 });

      await waitFor(10000);

      await page.screenshot({ path: 'success.png' });

      await waitFor(1000);

      await browser.close();
    }
  } catch (error) {
    console.error('Error', error);
  }
};

export default requestHandler;
