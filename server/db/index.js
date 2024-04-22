import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config({path: '../../.env'});

const { Pool } = pg;

export const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
});