// src/types/erdDiagram.ts
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { erdDiagramSchema } from '@schema';
import { z } from 'zod';

const insertErdDiagramSchema = createInsertSchema(erdDiagramSchema);
const selectErdDiagramSchema = createSelectSchema(erdDiagramSchema);
const updateErdDiagramSchema = createUpdateSchema(erdDiagramSchema);

export type ErdDiagram = z.infer<typeof selectErdDiagramSchema>;
export type CreateErdDiagram = z.infer<typeof insertErdDiagramSchema>;
export type UpdateErdDiagram = z.infer<typeof updateErdDiagramSchema>;
