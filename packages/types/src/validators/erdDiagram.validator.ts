import { z } from 'zod';
import { DiagramVisibility, DatabaseType } from '@enums'; // Enums for diagram visibility and database type



// Zod validation schema for ERD diagram input (create/update)
export const erdDiagramValidationSchema = z.object({
    teamId: z.string().uuid('Invalid UUID format for team ID'),
    ownerId: z.string().uuid('Invalid UUID format for owner ID'),
    name: z
        .string()
        .min(1, 'Name is required')
        .max(300, 'Name cannot exceed 300 characters'),
    visibility: z.enum([DiagramVisibility.Private, DiagramVisibility.Public]),
    createdAt: z.date().optional(), // Optional, if provided it must be a valid date
    updatedAt: z.date().optional(), // Optional, if provided it must be a valid date
    updatedBy: z.string().uuid('Invalid UUID format for updatedBy').optional(), // Optional
    databaseType: z.enum([DatabaseType.MySQL, DatabaseType.PostgreSQL, DatabaseType.SQLServer]),
});
