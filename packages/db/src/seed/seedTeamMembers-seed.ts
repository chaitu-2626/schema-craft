import { drizzleClient } from '@/index.js';
import { teamMemberJson } from '@seedData';
import { teamMemberSchema } from '@schema';
import { UserRole } from '@schema-craft/types'

export default async function seed() {
  console.log('Seeding team members...');

  await Promise.all(
    teamMemberJson.map(async (teamMemberData) => {
      const { userRole, invitedAt, joinedAt, ...rest } = teamMemberData;

      await drizzleClient.insert(teamMemberSchema).values({
        ...rest,
        userRole: UserRole[userRole as keyof typeof UserRole], // Convert string to enum,
        invitedAt: new Date(invitedAt), // Convert string to Date object
        joinedAt: joinedAt ? new Date(joinedAt) : null, // Convert string to Date object or null
      });
    })
  );

  console.log('Team members seeding complete.');
}