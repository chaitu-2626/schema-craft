import { drizzleClient } from '@app';
import { erdRelationshipJson } from '@seedData';
import { erdRelationshipSchema } from '@schema';
import { RelationshipType } from '@schema-craft/types';

export default async function seed() {
  console.log('Seeding ERD relationships...');

  // Check if the erdRelationship table is empty
  const existingRelationships = await drizzleClient.select().from(erdRelationshipSchema);
  if (existingRelationships.length > 0) {
    console.log('ERD relationships already exist. Skipping seed.');
    return;
  }

  await Promise.all(
    erdRelationshipJson.map(async (relationshipData) => { // Use 'any' temporarily for data source type

      const { relationshipType, ...rest } = relationshipData;

      await drizzleClient.insert(erdRelationshipSchema).values({
        ...rest,
        relationshipType: RelationshipType[relationshipType as keyof typeof RelationshipType], // Ensure correct enum mapping
        updatedBy: relationshipData.createdBy, // Set updatedBy to the same as createdBy for initial seed
        updatedAt: new Date(), // Set updatedAt to current date for initial seed
      });

    })
  );

  console.log('ERD relationships seeding complete.');
}