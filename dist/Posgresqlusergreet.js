"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
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
