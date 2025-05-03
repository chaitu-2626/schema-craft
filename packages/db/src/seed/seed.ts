import { Table, getTableName, sql } from "drizzle-orm";
import { type DrizzleClientType, drizzleClient } from '@client';
import { env } from "@config";
import { erdAttributeSchema, erdDiagramSchema, erdEntitySchema, erdRelationshipSchema, favoriteSchema, teamMemberSchema, teamSchema, userSchema } from "@schema";
import { erdAttributeSeeder, erdDiagramSeeder, erdEntitySeeder, erdRelationshipSeeder, favoriteSeeder, teamMemberSeeder, teamSeeder, userSeeder } from "@seed";

//Seed only if DB_SEEDING is set to true in the environment variables
if (!env.DB_SEEDING) {
    throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: DrizzleClientType, table: Table) {
    const tableName = getTableName(table);
    console.log(`Resetting table: ${tableName}`);
    try {
        console.log(`Resetting table: ${tableName}`);
        await db.execute(
            sql.raw(`TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`)
        );
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Failed to reset table "${tableName}": ${error.message}`);
        } else {
            console.error(`Failed to reset table "${tableName}": Unknown error`);
        }
    }
}


// We will reset the tables before seeding them with data.
const schemas = [
    userSchema,
    teamSchema,
    teamMemberSchema,
    erdDiagramSchema,
    erdEntitySchema,
    erdAttributeSchema,
    erdRelationshipSchema,
    favoriteSchema
];

// We will seed the tables with data.
const seeders = [
    userSeeder,
    teamSeeder,
    teamMemberSeeder,
    erdDiagramSeeder,
    erdEntitySeeder,
    erdAttributeSeeder,
    erdRelationshipSeeder,
    favoriteSeeder,
];

async function main() {
    for (const table of schemas) {
        await resetTable(drizzleClient, table);
    }

    for (const seeder of seeders) {
        await seeder();
    }
}

main().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});