// src/types/team.ts
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { teamSchema } from '@schema';
import { z } from 'zod';

const insertTeamSchema = createInsertSchema(teamSchema);
const selectTeamSchema = createSelectSchema(teamSchema);
const updateTeamSchema = createUpdateSchema(teamSchema);

export type Team = z.infer<typeof selectTeamSchema>;
export type CreateTeam = z.infer<typeof insertTeamSchema>;
export type UpdateTeam = z.infer<typeof updateTeamSchema>;
