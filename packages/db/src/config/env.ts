// Load environment variables from a .env file
import { config } from 'dotenv';

// Allows expanding variables that reference other env vars (e.g., VAR=$OTHER_VAR)
import { expand } from 'dotenv-expand';

// Zod is a schema validation library
import { ZodError, z } from 'zod';

/**
 * Helper schema to handle boolean values coming in as strings (like "true"/"false").
 * We coerce any value to string, then check if it's "true".
 */
const stringBoolean = z
  .coerce.string()               // Make sure the value is a string (even if it's not)
  .transform((val) => val === "true")  // Convert "true" → true, anything else → false
  .default("false");             // Default value if not set at all

/**
 * Define a schema for all the environment variables your app expects.
 * This ensures safety and type-checking at runtime.
 */
const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"), // Optional, defaults to "development"
  DB_HOST: z.string(),                         // Required
  DB_USER: z.string(),                         // Required
  DB_PASSWORD: z.string(),                     // Required
  DB_NAME: z.string(),                         // Required
  DB_PORT: z.coerce.number(),                  // Will convert strings like "5432" to number
  DATABASE_URL: z.string(),                    // Required - usually full connection string
  DB_MIGRATING: stringBoolean,                 // Optional boolean (as string) → true/false
  DB_SEEDING: stringBoolean,                   // Optional boolean (as string) → true/false
});

/**
 * Infer TypeScript type from the schema, so you get auto-complete and type safety
 */
export type EnvSchemaType = z.infer<typeof EnvSchema>;

/**
 * Load and expand .env variables into `process.env`
 */
// Load environment-specific file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
expand(config({ path: envFile }));

/**
 * Try parsing the environment using our schema.
 * If anything is missing or invalid, throw a descriptive error.
 */
try {
  EnvSchema.parse(process.env); // Validates the environment
} catch (error) {
  if (error instanceof ZodError) {
    // If it's a Zod validation error, format the message
    let errorMessage = "Invalid environment variables:\n";

    error.issues.forEach((err) => {
      errorMessage += `- ${err.path.join('.')} : ${err.message}\n`;
    });

    const e = new Error(errorMessage);
    e.stack = ""; // Hide stack trace to make it cleaner
    throw e;
  } else {
    // If it's some other error, just log it
    console.error(error);
  }
}

/**
 * Finally, export the parsed & validated environment
 * so the rest of the app can safely use it.
 */
export default EnvSchema.parse(process.env) as EnvSchemaType;
