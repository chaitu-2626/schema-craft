import { Table, getTableName, sql } from "drizzle-orm";
import { type DrizzleClientType, drizzleClient } from '@app';
import env from "@env";
import { erdAttributeSchema, erdDiagramSchema, erdEntitySchema, erdRelationshipSchema, favoriteSchema, teamMemberSchema, teamSchema, userSchema } from "@schema";
import { erdAttributeSeeder, erdDiagramSeeder, erdEntitySeeder, erdRelationshipSeeder, favoriteSeeder, teamMemberSeeder, teamSeeder, userSeeder } from "@seed";

//Seed only if DB_SEEDING is set to true in the environment variables
if (!env.DB_SEEDING) {
    throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: DrizzleClientType, table: Table) {
    return db.execute(
        sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
    );
}

// We will reset the tables before seeding them with data.
const schemas = [
    erdAttributeSchema,
    erdDiagramSchema,
    erdEntitySchema,
    erdRelationshipSchema,
    favoriteSchema,
    teamMemberSchema,
    teamSchema,
    userSchema
];
for (const table of schemas) {
    await resetTable(drizzleClient, table);
}

// We will seed the tables with data.
const seeders = [
    erdAttributeSeeder,
    erdDiagramSeeder,
    erdEntitySeeder,
    erdRelationshipSeeder,
    favoriteSeeder,
    teamMemberSeeder,
    teamSeeder,
    userSeeder
];
for (const seeder of seeders) {
    await seeder();
}