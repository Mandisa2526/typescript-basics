"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQLGreetable = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const pg_1 = require("pg");
require('dotenv').config();
class PostgreSQLUserGreetCounter {
    constructor() {
        const pgp = (0, pg_promise_1.default)();
        this.db = pgp({
            connectionString: 'postgres://ayszwgje:LWKoBXeAlPDOy7qs6TarjxhBak0WS4w3@bubble.db.elephantsql.com:5432/ayszwgje'
        });
    }
    async incrementGreetingCount(userId, user_name) {
        try {
            await this.db.none(`
                INSERT INTO GreetingCount (id, user_name, user_count) 
                VALUES ($1, $2, 1) 
                ON CONFLICT (id) 
                DO UPDATE 
                SET user_count = GreetingCount.user_count + 1
            `, [userId, user_name]);
        }
        catch (error) {
            throw new Error('Error incrementing greeting count: ' + error.message);
        }
    }
    async getGreetingCount(userId, user_name) {
        try {
            const result = await this.db.oneOrNone(`SELECT user_count 
                FROM GreetingCount 
                WHERE id = $1 AND user_name = $2`, [userId, user_name]);
            return result ? result.user_count : 0;
        }
        catch (error) {
            throw new Error('Error retrieving greeting count: ' + error.message);
        }
    }
}
exports.default = PostgreSQLUserGreetCounter;
class PostgreSQLGreetable {
    constructor(pool) {
        this.pool = pool;
    }
    async addLanguageGreeting(language, greeting) {
        try {
            const query = 'INSERT INTO language_greetings (language, greeting) VALUES ($1, $2)';
            await this.pool.query(query, [language, greeting]);
        }
        catch (error) {
            throw new Error(`Failed to add language greeting: ${error.message}`);
        }
    }
    async getGreeting(language) {
        try {
            const query = 'SELECT greeting FROM language_greetings WHERE language = $1';
            const result = await this.pool.query(query, [language]);
            if (result.rows.length === 0) {
                throw new Error(`Greeting not found for language: ${language}`);
            }
            return result.rows[0].greeting;
        }
        catch (error) {
            throw new Error(`Failed to get greeting: ${error.message}`);
        }
    }
}
exports.PostgreSQLGreetable = PostgreSQLGreetable;
// // Create a Pool instance
// const pool = new Pool({
//     connectionString: 'postgres://ayszwgje:LWKoBXeAlPDOy7qs6TarjxhBak0WS4w3@bubble.db.elephantsql.com:5432/ayszwgje'
// });
const poolConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};
const pool = new pg_1.Pool(poolConfig);
