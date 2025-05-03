// src/types/erdEntity.ts
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { erdEntitySchema } from '@schema';
import { z } from 'zod';

const insertErdEntitySchema = createInsertSchema(erdEntitySchema);
const selectErdEntitySchema = createSelectSchema(erdEntitySchema);
const updateErdEntitySchema = createUpdateSchema(erdEntitySchema);

export type ErdEntity = z.infer<typeof selectErdEntitySchema>;
export type CreateErdEntity = z.infer<typeof insertErdEntitySchema>;
export type UpdateErdEntity = z.infer<typeof updateErdEntitySchema>;
