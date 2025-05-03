import { drizzleClient } from '@/client.js';
import { teamData } from '@seedData';
import { teamSchema } from '@schema';

// Define the type of a single team item using indexed access
type Team = typeof teamData[number];

/**
 * Inserts a single team into the database.
 * @param team - The team data to insert.
 */
async function insertTeam(team: Team) {
  const { createdAt, updatedAt, ...rest } = team;

  await drizzleClient.insert(teamSchema).values({
    ...rest,
    createdAt: createdAt ? new Date(createdAt) : null,
    updatedAt: updatedAt ? new Date(updatedAt) : null,
  });
}

/**
 * Seeds the teams into the database.
 */
export default async function seed() {
  console.log('Seeding teams...');

  await Promise.all(teamData.map(insertTeam));

  console.log('Teams seeding complete.');
}
