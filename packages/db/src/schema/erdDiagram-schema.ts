import {
	pgTable,
	uuid,
	varchar,
	timestamp,
	index,
	pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { DiagramVisibility, DatabaseType } from '@schema-craft/types';
import { teamSchema } from './team-schema.js';
import { userSchema } from './user-schema.js';
import { erdEntitySchema } from './erdEntity-schema.js';


const visibilityEnum = pgEnum('erd_diagram_visibility', DiagramVisibility);
const databaseTypeEnum = pgEnum('erd_diagram_database_type', DatabaseType);

/**
 * Represents the schema definition for the ERD diagram table in a PostgreSQL database.
 * An ERD diagram can have multiple entities (tables) associated with it.
 */
export const erdDiagramSchema = pgTable('erd_diagram', {
	id: uuid('erd_diagram_id').defaultRandom().primaryKey(),

	// FK to the team this diagram belongs to
	teamId: uuid('erd_team_id')
		.notNull()
		.references(() => teamSchema.id, { onDelete: 'cascade' }),

	// FK to the user that created the diagram
	ownerId: uuid('erd_owner_id')
		.notNull()
		.references(() => userSchema.id, { onDelete: 'cascade' }),

	// Name of the diagram
	name: varchar('erd_diagram_name', { length: 300 }).notNull(),

	// Diagram visibility (Private or Public)
	visibility: visibilityEnum('erd_diagram_visibility')
		.notNull()
		.default(DiagramVisibility.Private),

	createdAt: timestamp('erd_diagram_created_at').defaultNow(),

	updatedAt: timestamp('erd_diagram_updated_at'),

	// When the last updated user is deleted, their value will be set to null
	updatedBy: uuid('erd_diagram_updated_by')
		.references(() => userSchema.id, { onDelete: 'set null' }),

	// Database type for the schema (MySQL, PostgreSQL, or SQL Server)
	databaseType: databaseTypeEnum('erd_diagram_database_type')
		.notNull()
		.default(DatabaseType.MySQL),
}, (table) => [
	// Indexes for better performance on lookups related to foreign keys
	index('idx_erd_team_id').on(table.teamId),
	index('idx_erd_owner_id').on(table.ownerId),
]);

/**
 * Defines the one-to-many relationship between an ERD diagram and its entities (tables).
 */
export const erdDiagramRelations = relations(erdDiagramSchema, ({ many }) => ({
	// Helps to fetch all the schema entities (tables) associated with a diagram
	erdEntities: many(erdEntitySchema),
}));