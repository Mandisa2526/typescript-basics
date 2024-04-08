"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.greet = void 0;
const greetInEnglish_1 = __importDefault(require("./greetInEnglish"));
const greetInXhosa_1 = __importDefault(require("./greetInXhosa"));
const greetInZulu_1 = __importDefault(require("./greetInZulu"));
const language_1 = require("./language");
function greet(name, chosenLanguage) {
    let greetIn = new greetInEnglish_1.default();
    if (chosenLanguage === language_1.language.eng) {
        greetIn = new greetInEnglish_1.default();
    }
    if (chosenLanguage === language_1.language.xhosa) {
        greetIn = new greetInXhosa_1.default();
    }
    if (chosenLanguage === language_1.language.zulu) {
        greetIn = new greetInZulu_1.default();
    }
    return greetIn.greet(name);
}
exports.greet = greet;
