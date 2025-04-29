import { drizzleClient } from '@app';
import { favoriteJson } from '@seedData';
import { favoriteSchema } from '@schema';

export default async function seed() {
  console.log('Seeding favorites...');

  await Promise.all(
    favoriteJson.map(async (favoriteData) => { // Use 'any' temporarily for data source type

      const { favoriteAt, ...rest } = favoriteData;

      await drizzleClient.insert(favoriteSchema).values({
        ...rest,
        favoriteAt: favoriteAt ? new Date(favoriteAt) : null, // Convert to Date object if present
      });
    })
  );

  console.log('Favorites seeding complete.');
}