import { z } from 'zod';
import {
    MAX_USER_NAME_LENGTH,
    MAX_EMAIL_LENGTH,
    MAX_PASSWORD_LENGTH,
    MAX_PROFILE_PHOTO_URL_LENGTH,
    EMAIL_REGEX,
    PASSWORD_REGEX
} from '@constants';

export const userValidationSchema = z.object({
    name: z
        .string()
        .min(4, 'Name must be at least 4 characters long')
        .max(MAX_USER_NAME_LENGTH, `Name must not exceed ${MAX_USER_NAME_LENGTH} characters`),

    email: z
        .string()
        .max(MAX_EMAIL_LENGTH, `Email must not exceed ${MAX_EMAIL_LENGTH} characters`)
        .regex(EMAIL_REGEX, 'Invalid email format'),

    password: z
        .string()
        .max(MAX_PASSWORD_LENGTH, `Password must not exceed ${MAX_PASSWORD_LENGTH} characters`)
        .regex(
            PASSWORD_REGEX,
            'Password must include uppercase, lowercase, number, and special character'
        ),
    profilePhoto: z
        .string()
        .max(MAX_PROFILE_PHOTO_URL_LENGTH, `Profile photo URL must not exceed ${MAX_PROFILE_PHOTO_URL_LENGTH} characters`)
        .optional()
});
