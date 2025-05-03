import { drizzleClient } from '@client';
import { favoriteData } from '@seedData';
import { favoriteSchema } from '@schema';

type Favorite = typeof favoriteData[number];

/**
 * Inserts a favorite into the database.
 * @param favorite The favorite to insert.
 */
const insertFavorite = async (favorite: Favorite): Promise<void> => {
  const { favoriteAt, ...rest } = favorite;

  await drizzleClient.insert(favoriteSchema).values({
    ...rest,
    favoriteAt: favoriteAt ? new Date(favoriteAt) : null, // Convert to Date object if present
  });
}

/**
 * Seeds the favorite data into the database.
 */
export default async function seed() {
  console.log('Seeding favorites...');

  await Promise.all(favoriteData.map(insertFavorite));

  console.log('Favorites seeding complete.');
}