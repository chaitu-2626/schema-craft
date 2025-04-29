import {
	pgTable,
	uuid,
	timestamp,
	index,
	primaryKey
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { teamSchema } from './team-schema.js';
import { erdDiagramSchema } from './erdDiagram-schema.js';
import { userSchema } from './user-schema.js';

export const favoriteSchema = pgTable('FAVORITE', {
	teamId: uuid('team_id')
		.notNull()
		.references(() => teamSchema.id, { onDelete: 'cascade' }),

	favoriteBy: uuid('user_id')
		.notNull()
		.references(() => userSchema.id, { onDelete: 'cascade' }),

	erdDiagramId: uuid('erd_diagram_id')
		.notNull()
		.references(() => erdDiagramSchema.id, { onDelete: 'cascade' }),

	favoriteAt: timestamp('favorite_at').defaultNow(),
}, (table) => [
	primaryKey({ columns: [table.favoriteBy, table.erdDiagramId] }),

	index('idx_favorite_team_id').on(table.teamId),
	index('idx_favorite_user_id').on(table.favoriteBy)
]);


export const favoriteRelations = relations(favoriteSchema, ({ one }) => ({
	erdDiagram: one(erdDiagramSchema, {
		fields: [favoriteSchema.erdDiagramId],
		references: [erdDiagramSchema.id],
	}),
}));