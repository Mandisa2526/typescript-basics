import { Pool, QueryResult } from 'pg';
import { Greetable } from "./GreetablePSQL";

export class PostgreSQLGreetable implements Greetable {
    private pool: Pool;
    constructor(pool: Pool) {
        this.pool = pool;
    }
    async addLanguageGreeting(language: string, greeting: string): Promise<void> {
        try {
            const query = 'INSERT INTO language_greetings (language, greeting) VALUES ($1, $2)';
            await this.pool.query(query, [language, greeting]);
        } catch (error: any) {
            throw new Error('Failed to add language greeting:' + error.message);
        }
    }

    async getGreeting(language: string): Promise<string> {
        try {
            const query = 'SELECT greeting FROM language_greetings WHERE language = $1';
            const result: QueryResult<any> = await this.pool.query(query, [language]);
            if (result.rows.length === 0) {
                throw new Error(`Greeting not found for language: ${language}`);
            }
            return result.rows[0].greeting;
        } catch (error: any) {
            throw new Error('Failed to get greeting:' + error.message);
        }
    }

}
