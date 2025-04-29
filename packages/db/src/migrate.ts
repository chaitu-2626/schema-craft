// Import the migrate function from Drizzle ORM's postgres-js adapter
import { migrate } from 'drizzle-orm/postgres-js/migrator';

// Import the Drizzle config which contains migration folder info (like `out`)
import config from '$/drizzle.config.js';

// Import the Drizzle ORM client and Postgres connection you set up
import { drizzleClient, pgConnection } from '@app';

// Import validated environment variables
import env from '@env';

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
async function runMigration() {
  await migrate(drizzleClient, {
    migrationsFolder: config.out!, // `out` is where generated migration files live
  });

  // Success message after migration is done
  console.log('Migration completed successfully.');

  // Clean up the connection after migration is complete.
  await pgConnection.end();
}

// Run the migration function
runMigration().catch((err) => {
  console.error('Migration failed', err);
  process.exit(1);
});
