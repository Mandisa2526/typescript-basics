"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreetInManager = exports.Greeter = exports.greet = void 0;
//import Person from './person';
const Language_1 = require("./Language");
const greetInEnglish_1 = __importDefault(require("./greetInEnglish"));
const greetInXhosa_1 = __importDefault(require("./greetInXhosa"));
const greetInZulu_1 = __importDefault(require("./greetInZulu"));
function greet(name, chosenLanguage) {
    let greetIn = new greetInEnglish_1.default();
    if (chosenLanguage === Language_1.language.eng) {
        greetIn = new greetInEnglish_1.default();
    }
    if (chosenLanguage === Language_1.language.xhosa) {
        greetIn = new greetInXhosa_1.default();
    }
    if (chosenLanguage === Language_1.language.zulu) {
        greetIn = new greetInZulu_1.default();
    }
    return greetIn.greet(name);
}
exports.greet = greet;
// Create greetLanguages map
const greetLanguages = new Map();
const englishGreet = new greetInEnglish_1.default();
const xhosaGreet = new greetInXhosa_1.default();
const zuluGreet = new greetInZulu_1.default();
greetLanguages.set(Language_1.language.eng, englishGreet);
greetLanguages.set(Language_1.language.xhosa, xhosaGreet);
greetLanguages.set(Language_1.language.zulu, zuluGreet);
//// Instantiate MapUserGreetCounter
class Greeter {
    constructor(greetable, userGreetCounter) {
        this.greetable = greetable;
        this.userGreetCounter = userGreetCounter;
    }
    greet(name, chosenLanguage) {
        // get the greeting message
        let message = this.greetable.greet(name, chosenLanguage);
        // mange the user count
        this.userGreetCounter.countGreet(name);
        return message;
    }
    get greetCounter() {
        return this.userGreetCounter.greetCounter;
    }
    userGreetCount(firstName) {
        return this.userGreetCounter.userGreetCount(firstName);
    }
}
exports.Greeter = Greeter;
//responsible for managing different greetings for various languages. 
class GreetInManager {
    constructor(greetLanguages) {
        this.greetLanguages = greetLanguages;
        this.greetLanguages = greetLanguages;
    }
    greet(firstName, language) {
        let greetIn = this.greetLanguages.get(language);
        if (greetIn) {
            return greetIn.greet(firstName);
        }
        return "";
    }
}
exports.GreetInManager = GreetInManager;
