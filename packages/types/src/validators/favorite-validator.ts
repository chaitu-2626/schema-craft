import { z } from 'zod';

// UUID validator
const uuidValidation = z.string().uuid('Invalid UUID format');

// Zod validation schema for favorite input (create/update)
export const favoriteValidationSchema = z.object({
	teamId: uuidValidation,
	favoriteBy: uuidValidation,
	erdDiagramId: uuidValidation,
	favoriteAt: z
		.date()
		.optional()  // If you want to allow `favoriteAt` to be optional in some cases
});
