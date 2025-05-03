import { MySQLDataType, IndexType } from '@schema-craft/types';
import { drizzleClient } from '@client';
import { erdAttributeData } from '@seedData';
import { erdAttributeSchema } from '@schema';

type ErdAttribute = typeof erdAttributeData[number];

/**
 * Inserts an ERD attribute into the database.
 * @param attribute The ERD attribute to insert.
 */
const insertErdAttribute = async (attribute: ErdAttribute): Promise<void> => {
  const { dataType, indexType, ...rest } = attribute;

  await drizzleClient.insert(erdAttributeSchema).values({
    ...rest,
    // Convert string to corresponding enum value to satisfy schema types
    dataType: MySQLDataType[dataType as keyof typeof MySQLDataType],
    indexType: IndexType[indexType as keyof typeof IndexType]
  });
}

/**
 * Seeds the ERD attribute data into the database.
 */
export default async function seed() {
  console.log('Seeding ERD attributes...');

  await Promise.all(erdAttributeData.map(insertErdAttribute));

  console.log('ERD attributes seeding complete.');
}
