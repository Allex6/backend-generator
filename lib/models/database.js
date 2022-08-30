export default function database(type){

    switch (type) {

        case 'prisma':
            return `import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;`;
    
        default:
            return `import pkg from "pg";
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;

const DATABASE_URL = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

await pool.connect();

export default pool;`;
    }

};