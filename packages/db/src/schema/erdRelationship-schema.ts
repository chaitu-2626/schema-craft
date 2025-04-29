import {
	pgTable,
	uuid,
	timestamp,
	index,
	pgEnum,
	primaryKey,
} from 'drizzle-orm/pg-core';
import { RelationshipType } from '@schema-craft/types';
import { erdAttributeSchema } from './erdAttribute-schema.js';
import { userSchema } from './user-schema.js';


export const relationshipTypeEnum = pgEnum('erd_relationship_type', RelationshipType);

/**
 * Represents a relationship between two ERD attributes (columns).
 */
export const erdRelationshipSchema = pgTable('ERD_RELATIONSHIP', {

	//Deletes the relationship when the attribute is deleted
	fromAttributeId: uuid('erd_from_attribute_id')
		.notNull()
		.references(() => erdAttributeSchema.id, { onDelete: 'cascade' }),

	toAttributeId: uuid('erd_to_attribute_id')
		.notNull()
		.references(() => erdAttributeSchema.id, { onDelete: 'cascade' }),

	//By default no relationship is created between the two attributes.
	relationshipType: relationshipTypeEnum()
		.default(RelationshipType.None),

	createdAt: timestamp('erd_created_at')
		.notNull()
		.defaultNow(),

	createdBy: uuid('erd_created_by')
		.notNull()
		.references(() => userSchema.id),

	updatedAt: timestamp('erd_updated_at'),

	updatedBy: uuid('erd_updated_by')
		.notNull()
		.references(() => userSchema.id, { onDelete: 'set null' }),
},
	(table) => [
		// Composite PK ensures uniqueness of relationships
		primaryKey({ columns: [table.fromAttributeId, table.toAttributeId] }),

		index('idx_erd_relationship_from_attribute_id').on(table.fromAttributeId),
		index('idx_erd_relationship_to_attribute_id').on(table.toAttributeId)
	]);


