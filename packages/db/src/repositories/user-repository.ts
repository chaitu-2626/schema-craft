// src/services/server/src/repositories/user-repository.ts
import { userSchema } from '@schema';
import BaseRepository from './base-repository.js';

/**
 * Repository class for handling operations related to the `user` entity.
 * 
 * Provides CRUD methods for managing users using the shared logic from the BaseRepository.
 * Errors are logged using the Winston logger for better traceability.
 */
class UserRepository extends BaseRepository {
  constructor() {
    super();
  }

  /**
   * Retrieves all user records.
   * 
   * @returns A promise resolving to an array of users.
   */
  public getAllUsers = async () => {
    try {
      return await this.getAll(userSchema);
    } catch (error) {
      throw new Error('Failed to get all users');
    }
  }

  /**
   * Retrieves a user record by user ID.
   * 
   * @param id - The ID of the user to retrieve
   * @returns A promise resolving to the user record.
   */
  public getUserById = async (id: string) => {
    try {
      return await this.getById(userSchema, id, userSchema.id);
    } catch (error) {
      throw new Error('Failed to get user by ID');
    }
  }

  /**
   * Creates a new user record.
   * 
   * @param userData - The data of the user to be created
   * @returns A promise resolving to the created user.
   */
  public createUser = async (userData: any) => {
    try {
      return await this.create(userSchema, userData);
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  /**
   * Updates an existing user record by user ID.
   * 
   * @param id - The ID of the user to update
   * @param userData - The updated data for the user
   * @returns A promise resolving to the updated user.
   */
  public updateUser = async (id: string, userData: any) => {
    try {
      return await this.update(userSchema, id, userData, userSchema.id);
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  /**
   * Deletes a user record by user ID.
   * 
   * @param id - The ID of the user to delete
   * @returns A promise resolving once the deletion is complete.
   */
  public deleteUser = async (id: string) => {
    try {
      await this.delete(userSchema, id, userSchema.id);
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}

export default new UserRepository();
