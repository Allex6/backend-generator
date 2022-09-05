function getDatabaseConnection(fileExt){

    switch (fileExt) {
        
        case 'ts':
            return `(async ()=>{
    await pool.connect();
})();`;
    
        default:
            return 'await pool.connect();';
    }

}

export default function database(type, fileExt){

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

${getDatabaseConnection(fileExt)}

export default pool;`;
    }

};