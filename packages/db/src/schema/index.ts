import { erdEntitySchema, erdEntityRelations } from './erdEntity-schema.js';
import { erdDiagramSchema, erdDiagramRelations } from './erdDiagram-schema.js';
import { erdAttributeSchema, erdAttributeRelations } from './erdAttribute-schema.js';
import { erdRelationshipSchema } from './erdRelationship-schema.js';
import { favoriteSchema, favoriteRelations } from './favorite-schema.js';
import { teamSchema, teamRelations } from './team-schema.js';
import { teamMemberSchema, teamMemberRelations } from './teamMember-schema.js';
import { userSchema } from './user-schema.js';

export {
  erdEntitySchema,
  erdEntityRelations,
  erdDiagramSchema,
  erdDiagramRelations,
  erdAttributeSchema, 
  erdAttributeRelations,
  erdRelationshipSchema,
  favoriteSchema,
  favoriteRelations,
  teamSchema,
  teamRelations,
  teamMemberSchema,
  teamMemberRelations,
  userSchema,
};

export const schema = {
  erdEntitySchema,
  erdEntityRelations,
  erdDiagramSchema,
  erdDiagramRelations,
  erdAttributeSchema,
  erdAttributeRelations,
  erdRelationshipSchema,
  favoriteSchema,
  favoriteRelations,
  teamSchema,
  teamRelations,
  teamMemberSchema,
  teamMemberRelations,
  userSchema,
};
