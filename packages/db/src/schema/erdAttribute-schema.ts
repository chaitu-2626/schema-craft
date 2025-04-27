import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    index,
    pgEnum,
    boolean,
    integer,
    check,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { MySQLDataType, IndexType } from '@schema-craft/types';
import { erdEntitySchema } from './erdEntity-schema.js';
import { erdRelationshipSchema } from './erdRelationship-schema.js';
import { userSchema } from './user-schema.js';


const dataTypeEnum = pgEnum('data_type', MySQLDataType);
const indexTypeEnum = pgEnum('index_type', IndexType);

/**
 * Represents an attribute (column) in an ERD entity/table.
 * Attributes define the schema of an entity.
 */
export const erdAttributeSchema = pgTable('ERD_ATTRIBUTES', {

    id: uuid('erd_attribute_id').defaultRandom().primaryKey(),

    //Delete all the attributes of an entity when the entity is deleted
    entityId: uuid('erd_entity_id')
        .notNull()
        .references(() => erdEntitySchema.id, { onDelete: 'cascade' }),

    name: varchar('erd_attribute_name', { length: 255 }).notNull(),

    dataType: dataTypeEnum('erd_data_type')
        .notNull()
        .default(MySQLDataType.INT),

    isNullable: boolean('erd_is_nullable').default(false),

    isAutoIncrement: boolean('erd_is_auto_increment').default(false),

    isUnsigned: boolean('erd_is_unsigned').default(false),

    indexType: indexTypeEnum('erd_index_type').default(IndexType.None),

    defaultValue: varchar('erd_default_value', { length: 255 }),

    enumValues: varchar('erd_enum_values', { length: 500 }),

    //Used for determining the order of the attributes in the entity
    columnIndex: integer('erd_column_index')
        .notNull()
        .default(0),

    createdAt: timestamp('erd_created_at')
        .notNull()
        .defaultNow(),

    // We preserve attributes even if the user who created them is deleted
    // to maintain historical data integrity.
    // Attributes are only manually deleted if the deleted user was the ERD diagram owner.
    createdBy: uuid('erd_created_by')
        .notNull()
        .references(() => userSchema.id),

    updatedAt: timestamp('erd_updated_at').defaultNow(),

    updatedBy: uuid('erd_updated_by')
        .references(() => userSchema.id, { onDelete: 'set null' }),
},
    (table) => [

        //Faster lookups for attributes by their entity ID
        index('idx_erd_entity_id').on(table.entityId),

        //column index cannot be negative
        check('check_column_index_non_negative', sql`${table.columnIndex} >= 0`),
    ]);


//Helps to retrieve all the erd attributes relations with the erd attributes.
export const erdAttributeRelations = relations(erdAttributeSchema, ({ many }) => ({
    erdRelationships: many(erdRelationshipSchema),
}));


