"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostgreSQLGreetable_1 = require("../PostgreSQLGreetable");
const assert_1 = __importDefault(require("assert"));
require("dotenv/config");
const database_1 = __importDefault(require("../model/database"));
describe('PostgreSQLGreetable', () => {
    //let greetable: PostgreSQLGreetable;
    const greetable = new PostgreSQLGreetable_1.PostgreSQLGreetable(database_1.default);
    // Initialize the greetable instance
    beforeEach(async function () {
        try {
            this.timeout(10000);
            // clean the tables before each test run
            await database_1.default.query("TRUNCATE TABLE language_greetings RESTART IDENTITY CASCADE");
            await database_1.default.query("INSERT INTO language_greetings(language, greeting) VALUES('en', 'Hello')");
            await database_1.default.query("INSERT INTO language_greetings(language, greeting) VALUES('fr', 'Bonjour')");
            await database_1.default.query("INSERT INTO language_greetings(language, greeting) VALUES('es', 'Hola')");
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
    it('should add language greeting', async function () {
        this.timeout(10000);
        // Act
        await greetable.addLanguageGreeting('en', 'Hello');
    });
    it('should get greeting for language', async function () {
        this.timeout(10000);
        // Act
        const greeting = await greetable.getGreeting('en');
        // Assert
        assert_1.default.equal('Hello', greeting);
    });
});
