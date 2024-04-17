"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const posgresqlusergreet_1 = require("../posgresqlusergreet");
const assert_1 = __importDefault(require("assert"));
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgp = (0, pg_promise_1.default)();
const connectionString = "postgres://ayszwgje:LWKoBXeAlPDOy7qs6TarjxhBak0WS4w3@bubble.db.elephantsql.com:5432/ayszwgje?ssl=true";
const db = pgp(connectionString);
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
