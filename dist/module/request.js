"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitFor = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const promises_1 = __importDefault(require("fs/promises"));
const jimp_1 = __importDefault(require("jimp"));
const pixelmatch_1 = __importDefault(require("pixelmatch"));
const opencv_wasm_1 = require("opencv-wasm");
const pinParser_1 = require("./pinParser");
const parseCode_1 = require("./parseCode");
function findPuzzlePosition(page) {
    return __awaiter(this, void 0, void 0, function* () {
        let images = yield page.$$eval('#captcha__puzzle canvas', (canvases) => canvases.map((canvas) => canvas.toDataURL().replace(/^data:image\/png;base64,/, '')));
        yield promises_1.default.writeFile(`./puzzle.png`, images[1], 'base64');
        let srcPuzzleImage = yield jimp_1.default.read('./puzzle.png');
        let srcPuzzle = opencv_wasm_1.cv.matFromImageData(srcPuzzleImage.bitmap);
        let dstPuzzle = new opencv_wasm_1.cv.Mat();
        opencv_wasm_1.cv.cvtColor(srcPuzzle, srcPuzzle, opencv_wasm_1.cv.COLOR_BGR2GRAY);
        opencv_wasm_1.cv.threshold(srcPuzzle, dstPuzzle, 127, 255, opencv_wasm_1.cv.THRESH_BINARY);
        let kernel = opencv_wasm_1.cv.Mat.ones(5, 5, opencv_wasm_1.cv.CV_8UC1);
        let anchor = new opencv_wasm_1.cv.Point(-1, -1);
        opencv_wasm_1.cv.dilate(dstPuzzle, dstPuzzle, kernel, anchor, 1);
        opencv_wasm_1.cv.erode(dstPuzzle, dstPuzzle, kernel, anchor, 1);
        let contours = new opencv_wasm_1.cv.MatVector();
        let hierarchy = new opencv_wasm_1.cv.Mat();
        opencv_wasm_1.cv.findContours(dstPuzzle, contours, hierarchy, opencv_wasm_1.cv.RETR_EXTERNAL, opencv_wasm_1.cv.CHAIN_APPROX_SIMPLE);
        let contour = contours.get(0);
        let moment = opencv_wasm_1.cv.moments(contour);
        return [
            Math.floor(moment.m10 / moment.m00),
            Math.floor(moment.m01 / moment.m00),
        ];
    });
}
function findDiffPosition(page) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, exports.waitFor)(100);
        let srcImage = yield jimp_1.default.read('./diff.png');
        let src = opencv_wasm_1.cv.matFromImageData(srcImage.bitmap);
        let dst = new opencv_wasm_1.cv.Mat();
        let kernel = opencv_wasm_1.cv.Mat.ones(5, 5, opencv_wasm_1.cv.CV_8UC1);
        let anchor = new opencv_wasm_1.cv.Point(-1, -1);
        opencv_wasm_1.cv.threshold(src, dst, 127, 255, opencv_wasm_1.cv.THRESH_BINARY);
        opencv_wasm_1.cv.erode(dst, dst, kernel, anchor, 1);
        opencv_wasm_1.cv.dilate(dst, dst, kernel, anchor, 1);
        opencv_wasm_1.cv.erode(dst, dst, kernel, anchor, 1);
        opencv_wasm_1.cv.dilate(dst, dst, kernel, anchor, 1);
        opencv_wasm_1.cv.cvtColor(dst, dst, opencv_wasm_1.cv.COLOR_BGR2GRAY);
        opencv_wasm_1.cv.threshold(dst, dst, 150, 255, opencv_wasm_1.cv.THRESH_BINARY_INV);
        let contours = new opencv_wasm_1.cv.MatVector();
        let hierarchy = new opencv_wasm_1.cv.Mat();
        opencv_wasm_1.cv.findContours(dst, contours, hierarchy, opencv_wasm_1.cv.RETR_EXTERNAL, opencv_wasm_1.cv.CHAIN_APPROX_SIMPLE);
        let contour = contours.get(0);
        let moment = opencv_wasm_1.cv.moments(contour);
        return [
            Math.floor(moment.m10 / moment.m00),
            Math.floor(moment.m01 / moment.m00),
        ];
    });
}
function saveDiffImage() {
    return __awaiter(this, void 0, void 0, function* () {
        const originalImage = yield jimp_1.default.read('./original.png');
        const captchaImage = yield jimp_1.default.read('./captcha.png');
        const { width, height } = originalImage.bitmap;
        const diffImage = new jimp_1.default(width, height);
        const diffOptions = { includeAA: true, threshold: 0.1 };
        (0, pixelmatch_1.default)(originalImage.bitmap.data, captchaImage.bitmap.data, diffImage.bitmap.data, width, height, diffOptions);
        diffImage.write('./diff.png');
    });
}
/**
 *
 * @param milliseconds - The milliseconds of waiting time
 * @returns timeout
 */
const waitFor = (milliseconds) => new Promise((r) => setTimeout(r, milliseconds));
exports.waitFor = waitFor;
const requestHandler = (playerId, diamonds, paymentType, serial, pin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield puppeteer_1.default.launch({ headless: 'shell' });
        const page = yield browser.newPage();
        yield page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0');
        yield page.goto('https://shop.garena.my/app');
        yield (0, exports.waitFor)(2000);
        yield page.waitForSelector('#react-root > div > div > div > ul > li:nth-child(4)');
        yield page.click('#react-root > div > div > div > ul > li:nth-child(4)', {
            delay: 100,
        });
        yield (0, exports.waitFor)(1000);
        yield (0, exports.waitFor)(2000);
        yield page.click('#react-root > div > div > div > div._2jUfI-rShEmbiWShOS-Vsp > div._398I0fs2EPlZotPmbmuUDk > div:nth-child(2) > div.IYkDBLcPrLrtdeIei9Dyd > div:nth-child(5) > img', { delay: 100 });
        yield (0, exports.waitFor)(1000);
        yield (0, exports.waitFor)(2000);
        yield page.type('input[name="playerId"]', playerId, { delay: 200 });
        yield (0, exports.waitFor)(1000);
        yield page.click('input[type="submit"]', { delay: 100 });
        try {
            yield page.waitForSelector('iframe[src^="https://geo.captcha-delivery.com"]');
            const iframeHandle = yield page.$('iframe[src^="https://geo.captcha-delivery.com"]');
            const frame = yield (iframeHandle === null || iframeHandle === void 0 ? void 0 : iframeHandle.contentFrame());
            yield (0, exports.waitFor)(5000);
            try {
                yield (0, exports.waitFor)(5000);
            }
            catch (err) {
                console.error('Error', err);
            }
        }
        finally {
            yield (0, exports.waitFor)(1000);
            yield page.click('#react-root > div > div > div > div:nth-child(5) > div._3aMiNQIi-Ol3ox43Etq58E > div._2zCeRVXW_DQULAKpjApXek > div > div > div._3UAY7fkI8vOaPlb5Z3Y7I6 > div > div > input', { delay: 100 });
            yield (0, exports.waitFor)(10000);
            let divNth = '1';
            let buttonNth = '1';
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
                    console.error(new RangeError('Diamond range should be between 25 to 2530'));
            }
            switch (paymentType) {
                case 'gift-card':
                    buttonNth = '2';
                    break;
                case 'voucher':
                    buttonNth = '1';
                    break;
            }
            yield (0, exports.waitFor)(1000);
            yield page.waitForSelector(`.payment-denom-button:nth-child(${divNth})`);
            yield page.click(`.payment-denom-button:nth-child(${divNth})`, {
                delay: 100,
            });
            yield (0, exports.waitFor)(3000);
            yield page.waitForSelector('#accordionPayment > div:nth-child(1) > div.payment-panel-heading > div > button');
            yield page.click('#accordionPayment > div:nth-child(1) > div.payment-panel-heading > div > button', { delay: 100 });
            yield (0, exports.waitFor)(1000);
            yield page.waitForSelector(`.payment-button-sizer:nth-child(${buttonNth})`);
            yield page.click(`.payment-button-sizer:nth-child(${buttonNth})`, {
                delay: 100,
            });
            yield (0, exports.waitFor)(2000);
            let { pinOne, pinTwo, pinThree, pinFour } = (0, pinParser_1.parsePin)(pin);
            let { one, two } = (0, parseCode_1.parseCode)(serial);
            yield (0, exports.waitFor)(2000);
            yield page.type('#serial_1', String(one), { delay: 200 });
            yield page.type('#serial_2', String(two), { delay: 200 });
            yield page.type('input[name="pin_1"]', pinOne, { delay: 200 });
            yield page.type('input[name="pin_2"]', pinTwo, { delay: 200 });
            yield page.type('input[name="pin_3"]', pinThree, { delay: 200 });
            yield page.type('input[name="pin_4"]', pinFour, { delay: 200 });
            yield (0, exports.waitFor)(1000);
            yield page.click('input[value="Confirm"]', { delay: 100 });
            yield (0, exports.waitFor)(10000);
            yield page.screenshot({ path: 'success.png' });
            yield (0, exports.waitFor)(1000);
            yield browser.close();
        }
    }
    catch (error) {
        console.error('Error', error);
    }
});
exports.default = requestHandler;
//# sourceMappingURL=request.js.map