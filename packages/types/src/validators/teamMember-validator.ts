import { z } from 'zod';
import { UserRole } from '@enums';

// Zod validation for UUIDs
const uuidValidation = z.string().uuid('Invalid UUID');

// Zod validation for user role enum
export const userRoleValidationSchema = z.nativeEnum(UserRole, {
    required_error: 'User role is required',
    invalid_type_error: 'Invalid user role',
});

// Zod validation for team member input (create/update)
export const teamMemberValidationSchema = z.object({
    teamId: uuidValidation,
    userId: uuidValidation,
    userRole: userRoleValidationSchema, 
    joinedAt: z.coerce.date().optional(),
    invitedAt: z.coerce.date().optional(),
    inviteAccepted: z.boolean().optional(), // optional, as DB has default
});
