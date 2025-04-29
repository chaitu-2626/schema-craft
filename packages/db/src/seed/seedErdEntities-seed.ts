import { drizzleClient } from '@app';
import { erdEntityJson } from '@seedData';
import { erdEntitySchema } from '@schema';

export default async function seed() {
  console.log('Seeding ERD entities...');

  await Promise.all(
    erdEntityJson.map(async (entityData) => { // Use rest operator to exclude unwanted properties

      await drizzleClient.insert(erdEntitySchema).values({
        ...entityData,
        updatedBy: entityData.createdBy,
        updatedAt: new Date(),
      });

    })
  );

  console.log('ERD entities seeding complete.');
}
