import { defineConfig } from "drizzle-kit";
import env from "@env";

export default defineConfig({
    schema: "./dist/src/schema/index.js",
    out: "./src/migration",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
});
