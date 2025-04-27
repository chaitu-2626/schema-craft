// Maximum field lengths
export const MAX_USER_NAME_LENGTH = 255 as const;
export const MAX_EMAIL_LENGTH = 255 as const;
export const MAX_PASSWORD_LENGTH = 255 as const;
export const MAX_PROFILE_PHOTO_URL_LENGTH = 1024 as const;

// Regex Patterns

/**
 * Email must follow standard format like "example@domain.com"
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password must include:
 * - Minimum 8 characters
 * - At least 1 lowercase letter
 * - At least 1 uppercase letter
 * - At least 1 digit
 * - At least 1 special character (e.g. !@#$%^&*)
 */
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
