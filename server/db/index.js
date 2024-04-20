import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});
import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
});
