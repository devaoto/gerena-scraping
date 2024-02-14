"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePin = void 0;
function parsePin(pin) {
    const splittedPin = pin.split('-');
    return {
        pinOne: splittedPin[0],
        pinTwo: splittedPin[1],
        pinThree: splittedPin[2],
        pinFour: splittedPin[3],
    };
}
exports.parsePin = parsePin;
//# sourceMappingURL=pinParser.js.map