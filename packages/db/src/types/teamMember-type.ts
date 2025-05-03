// src/types/teamMember.ts
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { teamMemberSchema } from '@schema';
import { z } from 'zod';

const insertTeamMemberSchema = createInsertSchema(teamMemberSchema);
const selectTeamMemberSchema = createSelectSchema(teamMemberSchema);
const updateTeamMemberSchema = createUpdateSchema(teamMemberSchema);

export type TeamMember = z.infer<typeof selectTeamMemberSchema>;
export type CreateTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type UpdateTeamMember = z.infer<typeof updateTeamMemberSchema>;
