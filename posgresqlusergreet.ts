
import {GreetingCount} from './person';//interface
import pgPromise, { IDatabase } from 'pg-promise';
import { UserGreetCounter } from './person';
//import {Greetable} from './person'
import { language } from './language';
import { Pool, QueryResult } from 'pg';
require('dotenv').config();

export default class PostgreSQLUserGreetCounter implements GreetingCount {
    private db: IDatabase<any>;

    constructor() {
        const pgp = pgPromise();
        this.db = pgp({
            connectionString: 'postgres://ayszwgje:LWKoBXeAlPDOy7qs6TarjxhBak0WS4w3@bubble.db.elephantsql.com:5432/ayszwgje'
        });
    }

    async incrementGreetingCount(userId: number, user_name: string): Promise<void> {
        try {
            await this.db.none(`
                INSERT INTO GreetingCount (id, user_name, user_count) 
                VALUES ($1, $2, 1) 
                ON CONFLICT (id) 
                DO UPDATE 
                SET user_count = GreetingCount.user_count + 1
            `, [userId, user_name]);
        }catch (error:any) {
            throw new Error('Error incrementing greeting count: ' + error.message);
        }
    }

    async getGreetingCount(userId: number, user_name: string): Promise<number> {
        try {
            const result = await this.db.oneOrNone<{ user_count: number }>(
                `SELECT user_count 
                FROM GreetingCount 
                WHERE id = $1 AND user_name = $2`, [userId, user_name]
            );
            return result ? result.user_count : 0;
        } catch (error:any) {
            throw new Error('Error retrieving greeting count: ' + error.message);
        }
    }
    
}

//greeting from the database

export interface Greetable {
    addLanguageGreeting(language: string, greeting: string): Promise<void>;
    getGreeting(language: string): Promise<string>;
}


export class PostgreSQLGreetable implements Greetable {
    private pool: Pool;
    constructor(pool: Pool) {
        this.pool = pool;
    }
    async addLanguageGreeting(language: string, greeting: string): Promise<void> {
        try {
            const query = 'INSERT INTO language_greetings (language, greeting) VALUES ($1, $2)';
            await this.pool.query(query, [language, greeting]);
        } catch (error:any) {
            throw new Error(`Failed to add language greeting: ${error.message}`);
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
        } catch (error:any) {
            throw new Error(`Failed to get greeting: ${error.message}`);
        }
    }
    
}

// // Create a Pool instance
// const pool = new Pool({
//     connectionString: 'postgres://ayszwgje:LWKoBXeAlPDOy7qs6TarjxhBak0WS4w3@bubble.db.elephantsql.com:5432/ayszwgje'
// });
const poolConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const pool = new Pool(poolConfig);
