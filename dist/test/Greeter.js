"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// Import your implementations:
const assert_1 = __importDefault(require("assert"));
const greet_1 = require("../greet");
const language_1 = require("../language");
const greetInZulu_1 = __importDefault(require("../greetInZulu"));
const greetInEnglish_1 = __importDefault(require("../greetInEnglish"));
const greetInXhosa_1 = __importDefault(require("../greetInXhosa"));
const userCounter_1 = __importDefault(require("../userCounter"));
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgp = (0, pg_promise_1.default)();
const connectionString = "postgres://ayszwgje:LWKoBXeAlPDOy7qs6TarjxhBak0WS4w3@bubble.db.elephantsql.com:5432/ayszwgje?ssl=true";
exports.db = pgp(connectionString);
const greetMap = new Map();
greetMap.set(language_1.language.zulu, new greetInZulu_1.default());
greetMap.set(language_1.language.eng, new greetInEnglish_1.default());
greetMap.set(language_1.language.xhosa, new greetInXhosa_1.default());
const greetMapAdapter = new greet_1.GreetInManager(greetMap);
const mapUserGreetCounter = new userCounter_1.default();
const greeter = new greet_1.Greeter(greetMapAdapter, mapUserGreetCounter);
describe('Greeter', () => {
    it('should greet with the provided name in Xhosa', () => {
        const result = (0, greet_1.greet)('John', language_1.language.xhosa);
        const expectedGreeting = 'Molo, John';
        assert_1.default.equal(expectedGreeting, result);
    });
    it('should greet with the provided name in English', () => {
        const result = (0, greet_1.greet)('John', language_1.language.eng);
        const expectedGreeting = 'Hello, John';
        assert_1.default.equal(expectedGreeting, result);
    });
    it('should greet with the provided name in Zulu', () => {
        const result = (0, greet_1.greet)('John', language_1.language.zulu);
        const expectedGreeting = 'Sawubona, John';
        assert_1.default.equal(expectedGreeting, result);
    });
    it('should greet with the provided name in three languages', () => {
        let greetMap = new Map();
        greetMap.set(language_1.language.zulu, new greetInZulu_1.default());
        greetMap.set(language_1.language.eng, new greetInEnglish_1.default());
        greetMap.set(language_1.language.xhosa, new greetInXhosa_1.default());
        let greeter = new greet_1.GreetInManager(greetMap);
        assert_1.default.equal("Sawubona, Andre", greeter.greet("Andre", language_1.language.zulu));
        assert_1.default.equal("Hello, Andrew", greeter.greet("Andrew", language_1.language.eng));
        assert_1.default.equal("Molo, Andrew", greeter.greet("Andrew", language_1.language.xhosa));
    });
    it('should count greetings for a user greeted and 0 if the user has not been greeted', function () {
        let userCounter = new userCounter_1.default();
        userCounter.countGreet('Ayanda');
        userCounter.countGreet('Ayanda');
        userCounter.countGreet('Anele');
        userCounter.countGreet('Cebo');
        assert_1.default.equal(2, userCounter.userGreetCount('Ayanda'));
        assert_1.default.equal(1, userCounter.userGreetCount('Anele'));
        assert_1.default.equal(0, userCounter.userGreetCount('Zenande'));
    });
    it('should calculate the total count of greetings', function () {
        let userCounter = new userCounter_1.default();
        userCounter.countGreet('Alice');
        userCounter.countGreet('Bob');
        userCounter.countGreet('Alice');
        assert_1.default.equal(3, userCounter.greetCounter);
    });
});
//Test your new version of Greeter that is using Greetable
it('should greet the user correctly in English', () => {
    const name = 'John';
    const chosenLanguage = language_1.language.eng;
    const expectedGreeting = `Hello, John`;
    const greeting = greeter.greet(name, chosenLanguage);
    assert_1.default.equal(expectedGreeting, greeting);
});
it('should greet the user correctly in Xhosa', () => {
    const name = 'Ayanda';
    const chosenLanguage = language_1.language.xhosa;
    const expectedGreeting = `Molo, Ayanda`;
    const greeting = greeter.greet(name, chosenLanguage);
    assert_1.default.equal(expectedGreeting, greeting);
});
it('should greet the user correctly in Zulu', () => {
    const name = 'John';
    const chosenLanguage = language_1.language.zulu;
    const expectedGreeting = `Sawubona, John`;
    const greeting = greeter.greet(name, chosenLanguage);
    assert_1.default.equal(expectedGreeting, greeting);
});
it('should return a blank greeting if language is not available', () => {
    const name = 'John';
    const chosenLanguage = language_1.language.frnc; // Assuming French is not available
    const expectedGreeting = '';
    const greeting = greeter.greet(name, chosenLanguage);
    assert_1.default.equal(expectedGreeting, greeting);
});
it('should increment greet counter when greeting a user', () => {
    const name = 'John';
    const chosenLanguage = language_1.language.eng;
    greeter.greet(name, chosenLanguage);
    // Check if the greet counter has been incremented
    assert_1.default.equal(5, greeter.greetCounter);
});
it('should increment greet counter for each user', () => {
    const names = ['Alice', 'Bob', 'Charlie'];
    const chosenLanguage = language_1.language.eng;
    // Greet multiple users
    names.forEach((name) => greeter.greet(name, chosenLanguage));
    // Check if the greet counter has been incremented for each user
    assert_1.default.equal(8, greeter.greetCounter);
});
