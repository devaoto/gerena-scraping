"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCode = void 0;
function parseCode(input) {
    const string = input.split('-');
    const result = {
        one: string[1],
        two: string[3],
    };
    return result;
}
exports.parseCode = parseCode;
//# sourceMappingURL=parseCode.js.map