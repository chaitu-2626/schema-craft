import { drizzleClient } from '@/index.js';
import { teamJson } from '@seedData';
import { teamSchema } from '@schema';

export default async function seed() {
  console.log('Seeding teams...');

  await Promise.all(

    teamJson.map(async (teamData) => {

      // Convert dates to Date objects
      const { createdAt, updatedAt, ...rest } = teamData;

      await drizzleClient.insert(teamSchema).values({
        ...rest,
        createdAt: new Date(createdAt),
        updatedAt: updatedAt ? new Date(updatedAt) : null,
      });

    })
  );

  console.log('Teams seeding complete.');
}
