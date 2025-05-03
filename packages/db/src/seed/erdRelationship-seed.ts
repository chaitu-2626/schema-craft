import { RelationshipType } from '@schema-craft/types';
import { drizzleClient } from '@client';
import { erdRelationshipData } from '@seedData';
import { erdRelationshipSchema } from '@schema';

type ErdRelationship = typeof erdRelationshipData[number];

/**
 * Inserts an ERD relationship into the database.
 * @param relationship The ERD relationship to insert.
 */
const insertErdRelationship = async (relationship: ErdRelationship): Promise<void> => {
  const { relationshipType, ...rest } = relationship;

  await drizzleClient.insert(erdRelationshipSchema).values({
    ...rest,
    relationshipType: RelationshipType[relationshipType as keyof typeof RelationshipType], // Ensure correct enum mapping
  });
}

/**
 * Seeds the ERD relationship data into the database.
 */
export default async function seed() {
  console.log('Seeding ERD relationships...');

  await Promise.all(erdRelationshipData.map(insertErdRelationship));

  console.log('ERD relationships seeding complete.');
}