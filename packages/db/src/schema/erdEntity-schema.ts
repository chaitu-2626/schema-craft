import {
	pgTable,
	uuid,
	varchar,
	index,
	timestamp,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { erdDiagramSchema } from './erdDiagram-schema.js';
import { erdAttributeSchema } from './erdAttribute-schema.js';
import { userSchema } from './user-schema.js';


/**
 * Represents an entity in an ERD diagram (similar to a table in a database).
 * Each ERD entity can have multiple attributes (columns).
 */
export const erdEntitySchema = pgTable('ERD_ENTITY', {
	id: uuid('erd_entity_id').defaultRandom().primaryKey(),

	// FK to schema diagram this entity belongs to
	diagramId: uuid('erd_diagram_id')
		.notNull()
		.references(() => erdDiagramSchema.id, { onDelete: 'cascade' }),

	// Name of the ERD entity (e.g., "User", "Order", etc.)
	name: varchar('erd_entity_name', { length: 200 }).notNull(),

	// UI Color or visual indicator for the table
	color: varchar('erd_entity_color', { length: 100 }).notNull(),

	createdAt: timestamp('erd_created_at').defaultNow(),

	// NOTE: Not deleting this entity automatically when user is deleted.
	// Reason: We want to retain historical data even if a user account is removed.
	// Manual cleanup happens only if the user was the owner of the ERD.
	createdBy: uuid('erd_created_by')
		.notNull()
		.references(() => userSchema.id),

	updatedAt: timestamp('erd_updated_at'),

	updatedBy: uuid('erd_updated_by')
		.notNull()
		.references(() => userSchema.id, { onDelete: 'set null' }),
},
	(table) => [
		// Index for faster lookups on diagram-based queries
		index('idx_erd_entity_diagram_id').on(table.diagramId)
	]);

/**
 * Defines the one-to-many relationship between an entity and its attributes.
 */
export const erdEntityRelations = relations(erdEntitySchema, ({ many }) => ({
	erdAttributes: many(erdAttributeSchema),
}));