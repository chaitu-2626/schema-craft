// Import the Drizzle ORM function for the postgres-js driver
import { drizzle } from 'drizzle-orm/postgres-js';

// Import the actual postgres-js client
import postgres from "postgres";

// Import all table schemas and relations
import {schema} from '@schema';

// Import validated environment variables
import env from "@/env.js";

/**
 * Create a PostgreSQL connection using the DATABASE_URL from your environment.
 *
 * We optionally configure the connection based on whether we're
 * running a migration or seeding operation.
 *
 * - `max`: Limits the number of connections (e.g. use 1 connection for migrations)
 * - `onnotice`: Silences "notice" messages during seeding (e.g. "CREATE TABLE will create...")
 */
export const pgConnection = postgres(env.DATABASE_URL, {
    max: (env.DB_MIGRATING || env.DB_SEEDING) ? 1 : undefined, // Use only 1 connection if migrating or seeding
    onnotice: env.DB_SEEDING ? () => { } : undefined,            // Silence PostgreSQL notices during seeding
});

/**
 * Initialize the Drizzle ORM client by passing the Postgres connection and your schema.
 * This object is what you'll use to run queries (e.g., db.select(...)).
 */
export const drizzleClient = drizzle(pgConnection, {
    schema,
    logger: true, // Logs SQL queries in the console
});

/**
 * Export the type of the Drizzle client for type safety in other parts of your app.
 */
export type DrizzleClientType = typeof drizzleClient;

/**
 * Default export: the fully configured Drizzle client.
 */
export default drizzleClient;