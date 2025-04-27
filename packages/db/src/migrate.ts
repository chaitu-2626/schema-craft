// Import the migrate function from Drizzle ORM's postgres-js adapter
import { migrate } from 'drizzle-orm/postgres-js/migrator';

// Import the Drizzle config which contains migration folder info (like `out`)
import config from '$/drizzle.config.js';

// Import the Drizzle ORM client and Postgres connection you set up
import { drizzleClient, pgConnection } from '@/index.js';

// Import validated environment variables
import env from '@/env.js';

/**
 * Safety Check
 * Prevent accidental migrations unless an explicit env variable is set.
 *
 * Why? To avoid running migrations unintentionally in production/dev.
 * You must run this script with: DB_MIGRATING=true
 */
if (!env.DB_MIGRATING) {
  throw new Error('You must set DB_MIGRATING to "true" when running migrations');
}

/**
 * Run the migrations using Drizzle's migrate() function.
 *
 * It uses:
 * - The drizzle client (connected to the DB)
 * - The path to the migrations folder (from drizzle.config.ts)
 */
await migrate(drizzleClient, {
  migrationsFolder: config.out!, // `out` is where generated migration files live
});

/**
 * Clean up the connection after migration is complete.
 * This ensures Node.js exits properly without hanging.
 */
await pgConnection.end();
