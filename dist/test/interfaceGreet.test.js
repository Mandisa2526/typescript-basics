"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import your implementations:
const assert_1 = __importDefault(require("assert"));
const greet_1 = require("../greet");
const language_1 = require("../language");
const greetInZulu_1 = __importDefault(require("../greetInZulu"));
const greetInEnglish_1 = __importDefault(require("../greetInEnglish"));
const greetInXhosa_1 = __importDefault(require("../greetInXhosa"));
const userCounter_1 = __importDefault(require("../userCounter"));
//import { Pool } from 'pg';
const posgresqlusergreet_1 = require("../posgresqlusergreet");
const posgresqlusergreet_2 = __importDefault(require("../posgresqlusergreet"));
const pg_promise_1 = __importDefault(require("pg-promise"));
const pg_1 = require("pg");
const pgp = (0, pg_promise_1.default)();
const connectionString = "postgres://ayszwgje:LWKoBXeAlPDOy7qs6TarjxhBak0WS4w3@bubble.db.elephantsql.com:5432/ayszwgje?ssl=true";
const db = pgp(connectionString);
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
//tests for greeter using greetable
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
// database tests
describe('PostgreSQLUserGreetCounter', () => {
    let UserGreetCounter;
    beforeEach(async function () {
        try {
            this.timeout(5000); // Set timeout to 5 seconds
            UserGreetCounter = new posgresqlusergreet_2.default();
            // clean the tables before each test run
            await db.none("TRUNCATE TABLE GreetingCount RESTART IDENTITY CASCADE;");
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
    it('increments greeting count correctly', async function () {
        // Arrange
        const userId = 1;
        const userName = 'John';
        // Act
        await UserGreetCounter.incrementGreetingCount(userId, userName);
        // Assert
        const count = await UserGreetCounter.getGreetingCount(userId, userName);
        assert_1.default.equal(1, count);
    });
    it('returns correct greeting count', async function () {
        this.timeout(10000);
        await UserGreetCounter.incrementGreetingCount(2, 'Alice');
        await UserGreetCounter.incrementGreetingCount(2, 'Alice');
        const count = await UserGreetCounter.getGreetingCount(2, 'Alice');
        assert_1.default.equal(2, count);
    });
});
describe('PostgreSQLGreetable', () => {
    //let greetable: PostgreSQLGreetable;
    const pool = new pg_1.Pool(); // Create a Pool instance
    const greetable = new posgresqlusergreet_1.PostgreSQLGreetable(pool);
    // Initialize the greetable instance
    beforeEach(async function () {
        try {
            this.timeout(10000);
            // clean the tables before each test run
            await db.none("TRUNCATE TABLE language_greetings RESTART IDENTITY CASCADE;");
            await db.none("INSERT INTO language_greetings(language, greeting) VALUES('en', 'Hello')");
            await db.none("INSERT INTO language_greetings(language, greeting) VALUES('fr', 'Bonjour')");
            await db.none("INSERT INTO language_greetings(language, greeting) VALUES('es', 'Hola')");
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
    it('should add and retrieve language greeting', async () => {
        // Add a language greeting
        await greetable.addLanguageGreeting('en', 'Hello');
        // Retrieve the language greeting
        const greeting = await greetable.getGreeting('en');
        // Assert that the retrieved greeting matches the expected value
        assert_1.default.equal(greeting, 'Hello');
    });
});
