import { z } from 'zod';

// Zod validation schema for ERD entity input (create/update)
export const erdEntityValidationSchema = z.object({
  // Custom message for diagramId field
  diagramId: z.string().uuid('Invalid diagram ID format. Please provide a valid UUID for the diagram.'),
  
  name: z
    .string()
    .min(1, 'Name is required.')
    .max(200, 'Name cannot exceed 200 characters.'),
  
  color: z
    .string()
    .min(1, 'Color is required.')
    .max(100, 'Color cannot exceed 100 characters.'),
  
  createdAt: z.date().optional(), // Optional, if provided it must be a valid date
  
  // Custom message for createdBy field
  createdBy: z.string().uuid('Invalid creator ID format. Please provide a valid UUID for the creator.'),
  
  updatedAt: z.date().optional(), // Optional, if provided it must be a valid date
  
  // Custom message for updatedBy field (optional field)
  updatedBy: z
    .string()
    .uuid('Invalid updater ID format. Please provide a valid UUID for the updater.')
    .optional(), // Optional field (nullable in case of updates)
});
