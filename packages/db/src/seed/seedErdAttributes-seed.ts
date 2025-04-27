import { drizzleClient } from '@/index.js';
import { erdAttributeJson } from '@seedData';
import { erdAttributeSchema } from '@schema';
import { MySQLDataType, IndexType } from '@schema-craft/types';

export default async function seed() {
  console.log('Seeding ERD attributes...');

  await Promise.all(
    erdAttributeJson.map(async (attributeData) => {
      const { dataType, indexType, ...rest } = attributeData;

      await drizzleClient.insert(erdAttributeSchema).values({
        ...rest,
        // Convert string to corresponding enum value to satisfy schema types
        dataType: MySQLDataType[dataType as keyof typeof MySQLDataType],
        indexType: IndexType[indexType as keyof typeof IndexType],
        updatedAt: new Date(),
      });
    })
  );

  console.log('ERD attributes seeding complete.');
}
