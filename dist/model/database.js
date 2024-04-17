"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg_1 = require("pg");
const config = {
    connectionString: process.env.DB_URL,
};
const pool = new pg_1.Pool(config);
exports.default = pool;
