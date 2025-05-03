import { teamSchema } from '@schema';
import BaseRepository from './base-repository.js';

/**
 * Repository class for handling operations related to the `team` entity.
 * 
 * Provides CRUD methods for managing teams using shared logic from the BaseRepository.
 * Errors are logged using the Winston logger for better traceability.
 */
class TeamRepository extends BaseRepository {
  constructor() {
    super();
  }

  /**
   * Retrieves all team records.
   * 
   * @returns A promise resolving to an array of teams.
   */
  public getAllTeams = async () => {
    try {
      return await this.getAll(teamSchema);
    } catch (error) {
      throw new Error(`TeamRepository.getAllTeams: ${error}`);
    }
  }

  /**
   * Retrieves a specific team by its ID.
   * 
   * @param id - The ID of the team to retrieve
   * @returns A promise resolving to the team record.
   */
  public getTeamById = async (id: string) => {
    try {
      return await this.getById(teamSchema, id, teamSchema.id);
    } catch (error) {
      throw new Error(`TeamRepository.getTeamById: ${error}`);
    }
  }

  /**
   * Creates a new team.
   * 
   * @param teamData - The data of the team to be created
   * @returns A promise resolving to the created team.
   */
  public createTeam = async (teamData: any) => {
    try {
      return await this.create(teamSchema, teamData);
    } catch (error) {
      throw new Error('Failed to create team');
    }
  }

  /**
   * Updates an existing team by its ID.
   * 
   * @param id - The ID of the team to update
   * @param teamData - The updated data for the team
   * @returns A promise resolving to the updated team.
   */
  public updateTeam = async (id: string, teamData: any) => {
    try {
      return await this.update(teamSchema, id, teamData, teamSchema.id);
    } catch (error) {
      throw new Error('Failed to update team');
    }
  }

  /**
   * Deletes a team by its ID.
   * 
   * @param id - The ID of the team to delete
   * @returns A promise resolving once the deletion is complete.
   */
  public deleteTeam = async (id: string) => {
    try {
      await this.delete(teamSchema, id, teamSchema.id);
    } catch (error) {
      throw new Error('Failed to delete team');
    }
  }
}

export default new TeamRepository();
