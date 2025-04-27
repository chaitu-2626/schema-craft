import { z } from 'zod';
import { MAX_TEAM_NAME_LENGTH, MAX_TEAM_LOGO_URL_LENGTH } from '@constants';

// UUID validator
const uuidValidation = z.string().uuid('Invalid UUID');

// Zod validation schema for team name
export const teamNameValidationSchema = z
	.string()
	.min(2, 'Team name must be at least 2 characters long')
	.max(MAX_TEAM_NAME_LENGTH, `Team name must not exceed ${MAX_TEAM_NAME_LENGTH} characters`);

// Zod validation schema for logo URL (optional)
export const logoUrlValidationSchema = z
	.string()
	.url('Logo must be a valid URL')
	.max(MAX_TEAM_LOGO_URL_LENGTH, `Logo URL must not exceed ${MAX_TEAM_LOGO_URL_LENGTH} characters`)
	.optional();

// Zod validation schema for team input (create/update)
export const teamValidationSchema = z.object({
	name: teamNameValidationSchema,
	logo: logoUrlValidationSchema,
	ownerId: uuidValidation,
	updatedBy: uuidValidation.optional()
});
