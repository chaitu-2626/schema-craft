import { erdEntitySchema } from '@schema';
import BaseRepository from './base-repository.js';
import {ErdEntityTypes} from '@types'

/**
 * Repository class for handling operations related to the `erdEntity` table.
 */
class ErdEntityRepository extends BaseRepository {
 
  constructor() {
    super();
  }

  /**
   * Retrieves all ERD entities.
   * @returns Array of ERD entities
   */
  public getAllErdEntities = async () => {
    return await this.getAll(erdEntitySchema);
  };

  /**
   * Retrieves a specific ERD entity by ID.
   * @param id ERD entity UUID
   * @returns ERD entity if found, otherwise null
   */
  public getErdEntityById = async (id: string) => {
    return await this.getById(erdEntitySchema, id, erdEntitySchema.id);
  };

  /**
   * Creates a new ERD entity.
   * @param erdEntityData Validated ERD entity data
   * @returns Newly created ERD entity
   */
  public createErdEntity = async (
    erdEntityData: ErdEntityTypes.CreateErdEntity
  ) => {
    return await this.create(erdEntitySchema, erdEntityData);
  };

  /**
   * Updates an existing ERD entity.
   * @param id ID of the entity to update
   * @param erdEntityData Partial updated data for the entity
   * @returns Updated ERD entity or null
   */
  public updateErdEntity = async (
    id: string,
    erdEntityData: ErdEntityTypes.UpdateErdEntity
  ) => {
    return await this.update(erdEntitySchema, id, erdEntityData, erdEntitySchema.id);
  };

  /**
   * Deletes an ERD entity by ID.
   * @param id UUID of the entity
   * @returns Result of delete operation
   */
  public deleteErdEntity = async (id: string) => {
    return await this.delete(erdEntitySchema, id, erdEntitySchema.id);
  };
}

export default new ErdEntityRepository();
