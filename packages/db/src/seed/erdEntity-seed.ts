import { drizzleClient } from '@client';
import { erdEntityData } from '@seedData';
import { erdEntitySchema } from '@schema';

type ErdEntity = typeof erdEntityData[number];

/**
 * Inserts an ERD entity into the database.
 * @param entity The ERD entity to insert.
 */
const insertErdEntity = async (entity: ErdEntity): Promise<void> => {
  const { createdAt, updatedAt, ...rest } = entity;
  await drizzleClient.insert(erdEntitySchema).values({
    ...rest,
    createdAt: createdAt ? new Date(createdAt) : null,
    updatedAt: updatedAt ? new Date(updatedAt) : null,
  });
}

/**
 * Seeds the ERD entity data into the database.
 */
export default async function seed() {
  console.log('Seeding ERD entities...');

  await Promise.all(erdEntityData.map(insertErdEntity));

  console.log('ERD entities seeding complete.');
}
