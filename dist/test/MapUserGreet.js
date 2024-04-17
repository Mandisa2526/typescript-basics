"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const userCounter_1 = __importDefault(require("../userCounter"));
describe('MapUserGreetCounter', () => {
    let userGreetCounter;
    beforeEach(async function () {
        userGreetCounter = new userCounter_1.default();
    });
    it('should count the greet for a user', () => {
        const firstName = 'Abongile';
        userGreetCounter.countGreet(firstName);
        userGreetCounter.countGreet(firstName);
        userGreetCounter.countGreet(firstName);
        const greetCount = userGreetCounter.userGreetCount(firstName);
        assert_1.default.equal(3, greetCount);
    });
    it('should calculate the total greet count', () => {
        userGreetCounter.countGreet('Alice');
        userGreetCounter.countGreet('Bongane');
        userGreetCounter.countGreet('Cebelihle');
        const greetCounter = userGreetCounter.greetCounter;
        assert_1.default.equal(3, greetCounter);
    });
    it('should return 0 if user has not been greeted', () => {
        const greetCount = userGreetCounter.userGreetCount('Alwande');
        assert_1.default.equal(0, greetCount);
    });
    it('should increment greet count for a new user', () => {
        userGreetCounter.countGreet('Alice');
        userGreetCounter.countGreet('Bongani');
        userGreetCounter.countGreet('Cebelihle');
        userGreetCounter.countGreet('David');
        const greetCount = userGreetCounter.userGreetCount('David');
        assert_1.default.equal(1, greetCount);
    });
    it('should increment greet count for an existing user', () => {
        const firstName = 'Alice';
        userGreetCounter.countGreet(firstName);
        userGreetCounter.countGreet(firstName);
        userGreetCounter.countGreet(firstName);
        userGreetCounter.countGreet(firstName);
        const greetCount = userGreetCounter.userGreetCount(firstName);
        assert_1.default.equal(4, greetCount);
    });
});
