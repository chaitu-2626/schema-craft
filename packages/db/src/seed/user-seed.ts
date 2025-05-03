import { drizzleClient } from '@client';
import { UserRole } from '@schema-craft/types';
import { userData } from '@seedData';
import { userSchema } from "@schema";


type User = typeof userData[number];

/**
 * Inserts a user into the database.
 * @param user The data of the user to insert.
 */
const insertUser = async (user: User): Promise<void> => {
  const { userRole, ...rest } = user;

  await drizzleClient.insert(userSchema).values({
    ...rest,
    userRole: userRole ? UserRole[userRole as keyof typeof UserRole] : UserRole.Admin,
  });
};


/**
 * Seeds the user data into the database.
 */
export default async function seed() {
  console.log("Seeding users...");
  await Promise.all(userData.map(insertUser));
  console.log("Seeding complete.");
}
