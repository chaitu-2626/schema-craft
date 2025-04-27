// db/schema/user.ts
import {
	pgTable,
	uuid,
	varchar,
	timestamp,
	boolean,
	check
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { MAX_USER_NAME_LENGTH } from '@schema-craft/types'

export const userSchema = pgTable(
	'USER',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		name: varchar('name', { length: MAX_USER_NAME_LENGTH }).notNull(),
		email: varchar('email', { length: 255 }).unique().notNull(),
		password: varchar('password', { length: 255 }).notNull(),
		profilePhoto: varchar('profile_photo', { length: 1024 }),
		twoFactorEnabled: boolean('two_factor_enabled').default(false),
		createdAt: timestamp('created_at').defaultNow(),
	},
	(table) => [
		check('name_check', sql`LENGTH(${table.name}) >= 4`)
	]
);
