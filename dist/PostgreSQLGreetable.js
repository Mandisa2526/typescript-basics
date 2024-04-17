"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQLGreetable = void 0;
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
            throw new Error('Failed to add language greeting:' + error.message);
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
            throw new Error('Failed to get greeting:' + error.message);
        }
    }
}
exports.PostgreSQLGreetable = PostgreSQLGreetable;
