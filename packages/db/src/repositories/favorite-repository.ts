import { eq, and } from 'drizzle-orm';
import { drizzleClient } from '@client';
import { favoriteSchema } from '@schema';
import BaseRepository from './base-repository.js';

/**
 * Repository class for handling operations related to the `favorite` entity.
 * 
 * This class provides specific data-access methods for the `favorite` table.
 * It extends `BaseRepository` to reuse common CRUD functionality and uses
 * Drizzle ORM for database interaction. Errors are logged using Winston.
 */
class FavoriteRepository extends BaseRepository {
    constructor() {
        super();
    }

    /**
     * Retrieves all favorite records from the database.
     * 
     * @returns A promise resolving to an array of favorite records.
     */
    public getAllFavorites = async () => {
        return this.getAll(favoriteSchema);
    };

    /**
     * Retrieves a specific favorite based on favoriteBy and erdDiagramId.
     * 
     * This is a custom lookup not covered by the base getById method,
     * so it uses a manual query.
     * 
     * @param favoriteBy - User or entity who favorited the item
     * @param erdDiagramId - ID of the ERD diagram
     * @returns A promise resolving to the matched favorite record(s).
     */
    public getFavorite = async (favoriteBy: string, erdDiagramId: string) => {
        try {
            const favorite = await drizzleClient
                .select()
                .from(favoriteSchema)
                .where(and(
                    eq(favoriteSchema.favoriteBy, favoriteBy),
                    eq(favoriteSchema.erdDiagramId, erdDiagramId)
                ));
            return favorite;
        } catch (error) {
            throw new Error(`FavoriteRepository.getFavorite: ${error}`);
        }
    };

    /**
     * Creates a new favorite record in the database.
     * 
     * @param teamId - Associated team ID
     * @param favoriteBy - User or entity who is favoriting
     * @param erdDiagramId - ID of the ERD diagram
     * @returns A promise resolving to the newly created favorite record.
     */
    public createFavorite = async (teamId: string, favoriteBy: string, erdDiagramId: string) => {
        const data = { teamId, favoriteBy, erdDiagramId };
        return this.create(favoriteSchema, data);
    };

    /**
     * Deletes a favorite record based on favoriteBy and erdDiagramId.
     * 
     * This is a custom delete not based on a single ID, so it bypasses base delete().
     * 
     * @param favoriteBy - User or entity who favorited the item
     * @param erdDiagramId - ID of the ERD diagram
     * @returns A promise resolving to the deleted favorite record(s).
     */
    public deleteFavorite = async (favoriteBy: string, erdDiagramId: string) => {
        try {
            const deletedFavorite = await drizzleClient
                .delete(favoriteSchema)
                .where(and(
                    eq(favoriteSchema.favoriteBy, favoriteBy),
                    eq(favoriteSchema.erdDiagramId, erdDiagramId)
                ))
                .returning();
            return deletedFavorite;
        } catch (error) {
            throw new Error(`FavoriteRepository.deleteFavorite: ${error}`);
        }
    };
}

export default new FavoriteRepository();
