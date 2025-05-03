// src/types/user.ts
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { userSchema } from '@schema';
import { z } from 'zod';

const insertUserSchema = createInsertSchema(userSchema);
const selectUserSchema = createSelectSchema(userSchema);
const updateUserSchema = createUpdateSchema(userSchema);

export type User = z.infer<typeof selectUserSchema>;
export type CreateUserInput = z.infer<typeof insertUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
