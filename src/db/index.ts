import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as dotenv from 'dotenv';
import * as process from "process";

dotenv.config({
    path: '.env.local',
});

const connectionString = process.env.DATABASE_URL ?? ''
console.log(connectionString)
// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client);

// const allUsers = await db.select().from(users);

