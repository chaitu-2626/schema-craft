import {
    pgTable,
    uuid,
    timestamp,
    primaryKey,
    index,
    pgEnum,
    boolean
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { UserRole } from '@schema-craft/types';
import { userSchema } from './user-schema.js';
import { teamSchema } from './team-schema.js';


export const userRoleEnum = pgEnum('user_role', UserRole);

//Represent the schema definition for the "TEAM_MEMBER" table in a PostgreSQL database
export const teamMemberSchema = pgTable('TEAM_MEMBER', {

    //Foreign key to the "team" table
    //When the team is deleted, all the members of the team will be deleted
    teamId: uuid('team_id')
        .notNull()
        .references(() => teamSchema.id, { onDelete: 'cascade' }),

    //Foreign key to the "user" table
    //When the user is deleted, all the teams of the user will be deleted
    userId: uuid('user_id')
        .notNull()
        .references(() => userSchema.id, { onDelete: 'cascade' }),

    userRole: userRoleEnum('user_role').notNull().default(UserRole.Viewer),

    joinedAt: timestamp('joined_at'),

    invitedAt: timestamp('invited_at').defaultNow(),

    inviteAccepted: boolean('invite_accepted').default(false),
}, (table) => [

    // Composite Primary Key:
    // Ensures that each (teamId, userId) pair is unique.
    // Prevents the same user from being added multiple times to the same team.
    // This also creates a composite index on (teamId, userId) for fast joint lookups.
    primaryKey({ columns: [table.teamId, table.userId] }),

    // These indexes improve query performance when filtering by either `teamId` or `userId` individually.
    // Without these individual indexes, the composite primary key only optimizes queries involving both `teamId` and `userId` together.
    index('idx_team_id').on(table.teamId),
    index('idx_user_id').on(table.userId),
]);


export const teamMemberRelations = relations(teamMemberSchema, ({ one }) => ({
    // When we query the team member, we can also get the full user details 
    // by mentioning with: {users: true} in the query
    users: one(userSchema, {
        fields: [teamMemberSchema.userId],
        references: [userSchema.id],
    })
}));