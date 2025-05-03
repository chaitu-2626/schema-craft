import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@schema';
import {databaseConnections} from '@config';

/**
 * Initialize the Drizzle ORM client by passing the Postgres connection and your schema.
 * This object is what you'll use to run queries (e.g., db.select(...)).
 */
export const drizzleClient = drizzle(databaseConnections, {
    schema,
    logger: true, // Logs SQL queries in the console
});


export type DrizzleClientType = typeof drizzleClient;
