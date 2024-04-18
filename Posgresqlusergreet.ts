
import { GreetingCount } from "./GreetingCount";
import pgPromise, { IDatabase } from 'pg-promise';
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
        } catch (error: any) {
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
        } catch (error: any) {
            throw new Error('Error retrieving greeting count: ' + error.message);
        }
    }

}
