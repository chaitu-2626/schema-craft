// src/types/erdAttribute.ts
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { erdAttributeSchema } from '@schema';
import { z } from 'zod';

const insertErdAttributeSchema = createInsertSchema(erdAttributeSchema);
const selectErdAttributeSchema = createSelectSchema(erdAttributeSchema);
const updateErdAttributeSchema = createUpdateSchema(erdAttributeSchema);

export type ErdAttribute = z.infer<typeof selectErdAttributeSchema>;
export type CreateErdAttribute = z.infer<typeof insertErdAttributeSchema>;
export type UpdateErdAttribute = z.infer<typeof updateErdAttributeSchema>;
