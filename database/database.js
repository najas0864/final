import dotenv from 'dotenv';
import { createPool } from 'mysql';

dotenv.config({path:'./.env'});

const DB = createPool({
    connectionLimit : process.env.CONNECTION_LIMIT,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,
    host:process.env.DATABASE_HOST,
})
export default DB;