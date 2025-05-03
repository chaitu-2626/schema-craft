import postgres from "postgres";
import env from './env.js';


/**
 * Create a PostgreSQL connection using the DATABASE_URL from your environment.
 *
 * We optionally configure the connection based on whether we're
 * running a migration or seeding operation.
 *
 * - `max`: Limits the number of connections (e.g. use 1 connection for migrations)
 * - `onnotice`: Silences "notice" messages during seeding (e.g. "CREATE TABLE will create...")
 */
const databaseConnections = postgres(env.DATABASE_URL, {
    max: env.DB_SEEDING ? 1 : undefined, // Use only 1 connection while seeding
    onnotice: env.DB_SEEDING ? () => { } : undefined,  // Silence PostgreSQL notices during seeding
});

export default databaseConnections;