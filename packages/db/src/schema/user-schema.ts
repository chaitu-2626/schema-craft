import {
	pgTable,
	uuid,
	varchar,
	timestamp,
	pgEnum,
	index
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { UserRole } from '@schema-craft/types';

export const userRoleEnum = pgEnum('user_role', UserRole);

/**
 * USER table
 * Stores user identity and authentication-related metadata.
 */
export const userSchema = pgTable(
	'USER',
	{
		/**
		 * Clerk User ID used for external identity mapping.
		 */
		id: varchar('user_id', { length: 64 }).primaryKey().unique().notNull(),

		/**
		 * Role assigned to the user (e.g., admin, member, viewer).
		*/
		userRole: userRoleEnum().default(UserRole.Viewer),

		/**
		 * Timestamp of when the user account was created.
		 */
		createdAt: timestamp('created_at').defaultNow(),

		/**
		 * Timestamp of the last update to the user record.
		 */
		updatedAt: timestamp('updated_at').$onUpdate(() => sql`now()`),
	}
);
