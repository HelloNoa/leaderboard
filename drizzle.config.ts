import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import * as process from "process";
import { sshTunnel } from "./src/util/tunnel"; // installed by @nestjs/config
dotenv.config({
    path: '.env.local',
});
const connectionString = process.env.DATABASE_URL ?? ''
// ssh -L [LOCAL_IP:]LOCAL_PORT:DESTINATION:DESTINATION_PORT [USER@]SSH_SERVER
// ssh -L localhost:6543:localhost:5432 hellonoa@mini.hellonoa.dev
export default {
    strict: false,
    driver: 'pg',
    schema: './src/db/schema.ts',
    // schema: './src/_schemas/*',
    schemaFilter: ["game_score"],
    out: './drizzle',
    dbCredentials: {
        connectionString: connectionString,
    },
} satisfies Config;
