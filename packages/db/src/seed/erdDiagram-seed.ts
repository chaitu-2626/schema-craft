import { DiagramVisibility, DatabaseType } from '@schema-craft/types';
import { drizzleClient } from '@client';
import { erdDiagramData } from '@seedData';
import { erdDiagramSchema } from '@schema';

type ERDDiagram = typeof erdDiagramData[number];

/**
 * Inserts an ERD diagram into the database.
 * @param diagram The ERD diagram to insert.
 */
const insertErdDiagram = async (diagram: ERDDiagram): Promise<void> => {
  const { visibility, databaseType, createdAt, updatedAt, ...rest } = diagram;

  await drizzleClient.insert(erdDiagramSchema).values({
    ...rest,
    visibility: DiagramVisibility[visibility as keyof typeof DiagramVisibility],
    databaseType: DatabaseType[databaseType as keyof typeof DatabaseType],
    createdAt: createdAt ? new Date(createdAt) : null,
    updatedAt: updatedAt ? new Date(updatedAt) : null,
  });
}

/**
 * Seeds the ERD diagram data into the database.
 */
export default async function seed() {
  console.log('Seeding ERD diagrams...');

  await Promise.all(erdDiagramData.map(insertErdDiagram));

  console.log('ERD diagrams seeding complete.');
}
