import { defineConfig } from "drizzle-kit";
import {env} from "@config";

export default defineConfig({
    schema: "./dist/src/schema/index.js",
    out: "./src/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
});
