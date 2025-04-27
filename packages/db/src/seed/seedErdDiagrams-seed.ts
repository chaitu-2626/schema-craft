import { drizzleClient } from '@/index.js';
import {erdDiagramJson} from '@seedData';
import { erdDiagramSchema } from '@schema';
import { DiagramVisibility, DatabaseType } from '@schema-craft/types';

export default async function seed() {
  console.log('Seeding ERD diagrams...');

  await Promise.all(
    erdDiagramJson.map(async (diagramData) => {

      // Destructure enum-related fields separately to convert them properly
      const { visibility, databaseType, ...rest } = diagramData;

      await drizzleClient.insert(erdDiagramSchema).values({
        ...rest,

        // Convert the string `visibility` from JSON into a valid DiagramVisibility enum value.
        // This ensures type safety and compatibility with the schema defined in TypeScript.
        visibility: DiagramVisibility[visibility as keyof typeof DiagramVisibility],

        // Same as above for `databaseType`. Converts the string into a strongly typed enum value.
        databaseType: DatabaseType[databaseType as keyof typeof DatabaseType],
      });
    })
  );

  console.log('ERD diagrams seeding complete.');
}
