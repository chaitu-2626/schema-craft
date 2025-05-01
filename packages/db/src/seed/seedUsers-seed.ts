import { drizzleClient } from '@app';
import { userJson } from '@seedData';
import { userSchema } from "@schema";
import { UserRole } from '@schema-craft/types';

export default async function seed() {
  console.log("Seeding users...");

  await Promise.all(
    userJson.map(async (userData) => {
      const { userRole, ...rest } = userData;

      // Insert the user into the database
      await drizzleClient.insert(userSchema).values({
        ...rest,
        userRole: UserRole[userRole as keyof typeof UserRole], // Convert string to enum
      });
    })
  );

  console.log("Seeding complete.");
}
