import 'dotenv/config';
import { Pool } from 'pg';

const config = {
    connectionString: process.env.DB_URL,
};

const pool = new Pool(config);

export default pool;