import { drizzleClient } from '@/index.js';
import { userJson } from '@seedData';
import { userSchema } from "@schema";

export default async function seed() {
  console.log("Seeding users...");

  await Promise.all(
    userJson.map(async (userData) => {
      const { createdAt, ...rest } = userData;

      // Insert the user into the database
      await drizzleClient.insert(userSchema).values({
        ...rest,
        createdAt: new Date(createdAt),
      });
    })
  );

  console.log("Seeding complete.");
}
