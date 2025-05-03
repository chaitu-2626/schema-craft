// src/services/server/src/repositories/team-member-repository.ts
import { teamMemberSchema } from '@schema';
import BaseRepository from './base-repository.js';

/**
 * Repository class for handling operations related to the `teamMember` entity.
 * 
 * Provides CRUD methods for managing team members using the shared BaseRepository logic.
 * Errors are automatically logged using Winston logger.
 */
class TeamMemberRepository extends BaseRepository {
  constructor() {
    super();
  }

  /**
   * Retrieves all team member records.
   * 
   * @returns A promise resolving to an array of team members.
   */
  public getAllTeamMembers = async () => {
    try {
      return await this.getAll(teamMemberSchema);
    } catch (error) {
      throw new Error('Failed to get all team members');
    }
  }

  /**
   * Retrieves a team member by user ID.
   * 
   * @param id - The user ID of the team member
   * @returns A promise resolving to the team member record.
   */
  public getTeamMemberById = async (id: string) => {
    try {
      return await this.getById(teamMemberSchema, id, teamMemberSchema.userId);
    } catch (error) {
      throw new Error('Failed to get team member by ID');
    }
  }

  /**
   * Creates a new team member.
   * 
   * @param teamMemberData - Object containing team member data
   * @returns A promise resolving to the created team member.
   */
  public createTeamMember = async (teamMemberData: any) => {
    try {
      return await this.create(teamMemberSchema, teamMemberData);
    } catch (error) {
      throw new Error('Failed to create team member');
    }
  }

  /**
   * Updates an existing team member by user ID.
   * 
   * @param id - The user ID of the team member
   * @param teamMemberData - Object containing updated data
   * @returns A promise resolving to the updated team member.
   */
  public updateTeamMember = async (id: string, teamMemberData: any) => {
    try {
      return await this.update(teamMemberSchema, id, teamMemberData, teamMemberSchema.userId);
    } catch (error) {
      throw new Error('Failed to update team member');
    }
  }

  /**
   * Deletes a team member by user ID.
   * 
   * @param id - The user ID of the team member
   * @returns A promise resolving once the deletion is complete.
   */
  public deleteTeamMember = async (id: string) => {
    try {
      await this.delete(teamMemberSchema, id, teamMemberSchema.userId);
    } catch (error) {
      throw new Error('Failed to delete team member');
    }
  }
}

export default new TeamMemberRepository();
