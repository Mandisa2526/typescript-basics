"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreetInManager = exports.Greeter = exports.greet = void 0;
//import Person from './person';
const language_1 = require("./language");
const greetInEnglish_1 = __importDefault(require("./greetInEnglish"));
const greetInXhosa_1 = __importDefault(require("./greetInXhosa"));
const greetInZulu_1 = __importDefault(require("./greetInZulu"));
const userCounter_1 = __importDefault(require("./userCounter"));
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
// Create greetLanguages map
const greetLanguages = new Map();
const englishGreet = new greetInEnglish_1.default();
const xhosaGreet = new greetInXhosa_1.default();
const zuluGreet = new greetInZulu_1.default();
greetLanguages.set(language_1.language.eng, englishGreet);
greetLanguages.set(language_1.language.xhosa, xhosaGreet);
greetLanguages.set(language_1.language.zulu, zuluGreet);
//// Instantiate MapUserGreetCounter
const userGreetCounter = new userCounter_1.default();
// export class Greetable {
//   // create a Map that has a languages enum as a key and a GreetIn interface instance as a value
//   private greetLanguages: Map<language, GreetIn>//This map is intended to store mappings between languages (keys) and instances of objects implementing the GreetIn interface (values).
//   private userGreetCounter: UserGreetCounter;//ntended to keep track of the count of greetings and users' greet counts.
//   constructor(greetLanguages: Map<language, GreetIn>) {
//     this.greetLanguages = greetLanguages;
//     this.userGreetCounter = userGreetCounter;
//   }
//   greet(name: string, chosenLanguage: language): string {
//     let greetIn = this.greetLanguages.get(chosenLanguage);
//     this.userGreetCounter.countGreet(name);
//     if (greetIn) {
//       return greetIn.greet(name);
//     }
//     return "";
//   }
//   // call the greetCounter on the userGreetCounter
//   //a getter method for retrieving the greet counter from the userGreetCounter property.
//   public get greetCounter(): number {
//     return this.userGreetCounter.greetCounter;
//   }
//   // call the userGreetCount on the userGreetCounter
//   userGreetCount(firstName: string): number {
//     return this.userGreetCounter.userGreetCount(firstName);
//   }
//}
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
