// src/services/server/src/repositories/erdDiagram-repository.ts
import { erdDiagramSchema } from '@schema';
import BaseRepository from './base-repository.js';


/**
 * Repository class for handling operations related to the `erd_diagram` entity.
 *
 * This class provides specific data-access methods for the `erd_diagram` table.
 * It extends `BaseRepository` to reuse common CRUD functionality and uses
 * Drizzle ORM for database interaction. Errors are logged using Winston.
 *
 * Methods include:
 * - Fetching all ERD diagrams
 * - Fetching a specific ERD diagram by its ID
 * - Creating a new ERD diagram
 * - Updating an ERD diagram
 * - Deleting an ERD diagram
 */
class ErdDiagramRepository extends BaseRepository {
  constructor() {
    super();
  }

  /**
   * Retrieves all ERD diagrams from the database.
   *
   * @returns A promise resolving to an array of ERD diagram records.
   */
  public getAllErdDiagrams = async () => {
    try {
      return await this.getAll(erdDiagramSchema);
    } catch (error) {
      throw new Error('Failed to get all ERD diagrams');
    }
  }

  /**
   * Retrieves a specific ERD diagram by its ID.
   *
   * @param id - The ID of the ERD diagram to retrieve
   * @returns A promise resolving to the matched ERD diagram record.
   */
  public getErdDiagramById = async (id: string) => {
    try {
      return await this.getById(erdDiagramSchema, id, erdDiagramSchema.id);
    } catch (error) {
      throw new Error('Failed to get ERD diagram by ID');
    }
  }

  /**
   * Creates a new ERD diagram record in the database.
   *
   * @param erdDiagramData - The data for the new ERD diagram
   * @returns A promise resolving to the newly created ERD diagram record.
   */
  public createErdDiagram = async (erdDiagramData: any) => {
    try {
      return await this.create(erdDiagramSchema, erdDiagramData);
    } catch (error) {
      throw new Error('Failed to create ERD diagram');
    }
  }

  /**
   * Updates an existing ERD diagram by its ID.
   *
   * @param id - The ID of the ERD diagram to update
   * @param erdDiagramData - The updated data for the ERD diagram
   * @returns A promise resolving to the updated ERD diagram record.
   */
  public updateErdDiagram = async (id: string, erdDiagramData: any) => {
    try {
      return await this.update(erdDiagramSchema, id, erdDiagramData, erdDiagramSchema.id);
    } catch (error) {
      throw new Error('Failed to update ERD diagram');
    }
  }

  /**
   * Deletes an ERD diagram by its ID.
   *
   * @param id - The ID of the ERD diagram to delete
   * @returns A promise resolving once the deletion is complete.
   */
  public deleteErdDiagram = async (id: string) => {
    try {
      await this.delete(erdDiagramSchema, id, erdDiagramSchema.id);
    } catch (error) {
      throw new Error('Failed to delete ERD diagram');
    }
  }
}

export default new ErdDiagramRepository();
