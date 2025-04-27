import { z } from 'zod';
import { RelationshipType } from '@enums';

const uuidValidation = z.string().uuid('Invalid UUID format');

// Zod validation schema for ERD relationship input (create/update)
export const erdRelationshipValidationSchema = z.object({
  fromAttributeId: uuidValidation,
  toAttributeId: uuidValidation,
  relationshipType: z.nativeEnum(RelationshipType),
  createdAt: z.date().optional(),  // Optional, if provided it must be a valid date
  createdBy: uuidValidation,
  updatedAt: z.date().optional(),  // Optional, if provided it must be a valid date
  updatedBy: uuidValidation.optional(),  // Optional field (nullable in case of updates)
});
