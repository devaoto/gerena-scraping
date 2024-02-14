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
Object.defineProperty(exports, "__esModule", { value: true });
exports.recognizeNumbers = void 0;
const speech_1 = require("@google-cloud/speech");
const client = new speech_1.SpeechClient();
function recognizeNumbers(audioURL) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const audio = {
            uri: audioURL,
        };
        const config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        };
        const request = {
            audio: audio,
            config: config,
        };
        try {
            const [response] = yield client.recognize(request);
            const transcription = (_b = (_a = response.results) === null || _a === void 0 ? void 0 : _a.map((result) => { var _a; return (_a = result.alternatives) === null || _a === void 0 ? void 0 : _a[0].transcript; })) === null || _b === void 0 ? void 0 : _b.join('\n');
            const numbers = transcription !== undefined
                ? (_c = transcription
                    .match(/\b(?:zero|one|two|three|four|five|six|seven|eight|nine)\b/gi)) === null || _c === void 0 ? void 0 : _c.map((word) => {
                    switch (word.toLowerCase()) {
                        case 'zero':
                            return 0;
                        case 'one':
                            return 1;
                        case 'two':
                            return 2;
                        case 'three':
                            return 3;
                        case 'four':
                            return 4;
                        case 'five':
                            return 5;
                        case 'six':
                            return 6;
                        case 'seven':
                            return 7;
                        case 'eight':
                            return 8;
                        case 'nine':
                            return 9;
                        default:
                            return null;
                    }
                }).filter((number) => number !== null)
                : [];
            return { numbers };
        }
        catch (err) {
            console.error('Error:', err);
            return { numbers: [] };
        }
    });
}
exports.recognizeNumbers = recognizeNumbers;
//# sourceMappingURL=recognizer.js.map