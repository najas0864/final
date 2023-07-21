import { createPool } from 'mysql';
console.log(process.env.DATABASE);

const DB = createPool({
    connectionLimit : 100,
    user:'root',
    password:'',
    database:'final',
    host:'localhost',
})
export default DB;