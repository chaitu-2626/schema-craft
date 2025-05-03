// src/types/erdRelationship.ts
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { erdRelationshipSchema } from '@schema';
import { z } from 'zod';

const insertErdRelationshipSchema = createInsertSchema(erdRelationshipSchema);
const selectErdRelationshipSchema = createSelectSchema(erdRelationshipSchema);
const updateErdRelationshipSchema = createUpdateSchema(erdRelationshipSchema);

export type ErdRelationship = z.infer<typeof selectErdRelationshipSchema>;
export type CreateErdRelationship = z.infer<typeof insertErdRelationshipSchema>;
export type UpdateErdRelationship = z.infer<typeof updateErdRelationshipSchema>;
