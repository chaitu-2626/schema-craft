import {
	pgTable,
	uuid,
	varchar,
	timestamp,
	index
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { teamMemberSchema } from './teamMember-schema.js';
import { userSchema } from './user-schema.js';

export const teamSchema = pgTable('team', {
	id: uuid('team_id').defaultRandom().primaryKey(),

	name: varchar('name', { length: 255 }).notNull(),

	// ImageKit URL for the team logo
	logo: varchar('logo_photo', { length: 1024 }),

	ownerId: uuid('owner_id')
		.notNull()
		.references(() => userSchema.id, { onDelete: 'cascade' }),

	createdAt: timestamp('created_at').defaultNow(),

	updatedAt: timestamp('updated_at'),

	updatedBy: uuid('updated_by').references(() => userSchema.id, { onDelete: 'set null' })
}, (table) => [
	index('idx_owner_id').on(table.ownerId)
]);

export const teamRelations = relations(teamSchema, ({ many }) => ({
	members: many(teamMemberSchema)
}));