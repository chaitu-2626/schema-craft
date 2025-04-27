import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';
import { erdAttributeSchema, erdDiagramSchema, erdEntitySchema, erdRelationshipSchema, favoriteSchema, teamSchema, teamMemberSchema, userSchema } from '@schema';


export const insertErdAttributeSchema = createInsertSchema(erdAttributeSchema);
export const selectErdAttributeSchema = createSelectSchema(erdAttributeSchema);
export const updateErdAttributeSchema = createUpdateSchema(erdAttributeSchema);


export type ErdAttribute = z.infer<typeof selectErdAttributeSchema>;
export type CreateErdAttribute = z.infer<typeof insertErdAttributeSchema>;
export type UpdateErdAttribute = z.infer<typeof updateErdAttributeSchema>;


export const insertErdDiagramSchema = createInsertSchema(erdDiagramSchema);
export const selectErdDiagramSchema = createSelectSchema(erdDiagramSchema);
export const updateErdDiagramSchema = createUpdateSchema(erdDiagramSchema);


export type ErdDiagram = z.infer<typeof selectErdDiagramSchema>;
export type CreateErdDiagram = z.infer<typeof insertErdDiagramSchema>;
export type UpdateErdDiagram = z.infer<typeof updateErdDiagramSchema>;


export const insertErdEntitySchema = createInsertSchema(erdEntitySchema);
export const selectErdEntitySchema = createSelectSchema(erdEntitySchema);
export const updateErdEntitySchema = createUpdateSchema(erdEntitySchema);


export type ErdEntity = z.infer<typeof selectErdEntitySchema>;
export type CreateErdEntity = z.infer<typeof insertErdEntitySchema>;
export type UpdateErdEntity = z.infer<typeof updateErdEntitySchema>;

export const insertErdRelationshipSchema = createInsertSchema(erdRelationshipSchema);
export const selectErdRelationshipSchema = createSelectSchema(erdRelationshipSchema);
export const updateErdRelationshipSchema = createUpdateSchema(erdRelationshipSchema);


export type ErdRelationship = z.infer<typeof selectErdRelationshipSchema>;
export type CreateErdRelationship = z.infer<typeof insertErdRelationshipSchema>;
export type UpdateErdRelationship = z.infer<typeof updateErdRelationshipSchema>;

export const insertFavoriteSchema = createInsertSchema(favoriteSchema);
export const selectFavoriteSchema = createSelectSchema(favoriteSchema);
export const updateFavoriteSchema = createUpdateSchema(favoriteSchema);


export type Favorite = z.infer<typeof selectFavoriteSchema>;
export type CreateFavorite = z.infer<typeof insertFavoriteSchema>;
export type UpdateFavorite = z.infer<typeof updateFavoriteSchema>;


export const insertTeamSchema = createInsertSchema(teamSchema);
export const selectTeamSchema = createSelectSchema(teamSchema);
export const updateTeamSchema = createUpdateSchema(teamSchema);


export type Team = z.infer<typeof selectTeamSchema>;
export type CreateTeam = z.infer<typeof insertTeamSchema>;
export type UpdateTeam = z.infer<typeof updateTeamSchema>;

export const insertTeamMemberSchema = createInsertSchema(teamMemberSchema);
export const selectTeamMemberSchema = createSelectSchema(teamMemberSchema);
export const updateTeamMemberSchema = createUpdateSchema(teamMemberSchema);

export type TeamMember = z.infer<typeof selectTeamMemberSchema>;
export type CreateTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type UpdateTeamMember = z.infer<typeof updateTeamMemberSchema>;

export const insertUserSchema = createInsertSchema(userSchema);
export const selectUserSchema = createSelectSchema(userSchema);
export const updateUserSchema = createUpdateSchema(userSchema);

export type User = z.infer<typeof selectUserSchema>;
export type CreateUserInput = z.infer<typeof insertUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;