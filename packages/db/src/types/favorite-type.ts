// src/types/favorite.ts
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { favoriteSchema } from '@schema';
import { z } from 'zod';

const insertFavoriteSchema = createInsertSchema(favoriteSchema);
const selectFavoriteSchema = createSelectSchema(favoriteSchema);
const updateFavoriteSchema = createUpdateSchema(favoriteSchema);

export type Favorite = z.infer<typeof selectFavoriteSchema>;
export type CreateFavorite = z.infer<typeof insertFavoriteSchema>;
export type UpdateFavorite = z.infer<typeof updateFavoriteSchema>;
