import { drizzleClient } from '@client';
import { eq } from 'drizzle-orm';

/**
 * A generic base repository providing core CRUD operations.
 * 
 * This class is meant to be extended by specific repository classes
 * for different database entities. It uses Drizzle ORM under the hood.
 */
abstract class BaseRepository {
    constructor() { }

    /**
     * Fetches all records from the given table.
     * 
     * @param table - The database table to query.
     * @returns A promise resolving to an array of records.
     */
    protected async getAll(table: any) {
        try {
            return await drizzleClient.select().from(table);
        } catch (error) {
            throw new Error('Failed to get all items');
        }
    }

    /**
     * Fetches a single record by ID from the given table.
     * 
     * @param table - The database table to query.
     * @param id - The ID value to look up.
     * @param idField - The column representing the ID field.
     * @returns A promise resolving to the found record or undefined.
     */
    protected async getById(table: any, id: string, idField: any) {
        try {
            const item = await drizzleClient.select().from(table).where(eq(idField, id));
            return item[0];
        } catch (error) {
            throw new Error('Failed to get item by id');
        }
    }

    /**
     * Inserts a new record into the given table.
     * 
     * @param table - The table to insert into.
     * @param data - The data object to be inserted.
     * @returns A promise resolving to the newly created record.
     */
    protected async create(table: any, data: any) {
        try {
            const newItem = await drizzleClient.insert(table).values(data).returning();
            return newItem[0];
        } catch (error) {
            throw new Error('Failed to create item');
        }
    }

    /**
     * Updates an existing record in the given table.
     * 
     * @param table - The table to update.
     * @param id - The ID of the record to update.
     * @param data - The fields to update.
     * @param idField - The column representing the ID field.
     * @returns A promise resolving to the updated record.
     */
    protected async update(table: any, id: string, data: any, idField: any) {
        try {
            const updatedItem = await drizzleClient.update(table).set(data).where(eq(idField, id)).returning();
            return updatedItem[0];
        } catch (error) {
            throw new Error('Failed to update item');
        }
    }

    /**
     * Deletes a record by ID from the given table.
     * 
     * @param table - The table to delete from.
     * @param id - The ID of the record to delete.
     * @param idField - The column representing the ID field.
     * @returns A promise that resolves once the record is deleted.
     */
    protected async delete(table: any, id: string, idField: any) {
        try {
            await drizzleClient.delete(table).where(eq(idField, id));
        } catch (error) {
            throw new Error('Failed to delete item');
        }
    }
}

export default BaseRepository;