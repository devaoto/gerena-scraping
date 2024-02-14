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
const path_1 = __importDefault(require("path"));
const request_1 = __importDefault(require("./module/request"));
const processImage_1 = require("./processImage");
const fs_1 = require("fs");
const rootDirectory = __dirname;
const imageName = 'success.png';
const imagePath = path_1.default.join(rootDirectory, imageName);
const Parser = {
    purchase: (playerId, diamonds, paymentType, serial, pin) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, request_1.default)(playerId, diamonds, paymentType, serial, pin); }),
    successScreenshot: () => __awaiter(void 0, void 0, void 0, function* () {
        const processedImage = yield (0, processImage_1.processImage)(imagePath);
        (0, fs_1.unlinkSync)(imageName);
        return processedImage;
    }),
};
exports.default = Parser;
//# sourceMappingURL=index.js.map