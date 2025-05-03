import {
    ErdAttributeTypes,
    ErdDiagramTypes,
    ErdEntityTypes,
    ErdRelationshipTypes,
    FavoriteTypes,
    TeamMemberTypes,
    TeamTypes,
    UserTypes,
} from '@types';

async function loadJson<T = unknown>(path: string): Promise<T> {
    return (await import(path, { assert: { type: 'json' } })).default;
}

export const erdAttributeData = await loadJson<ErdAttributeTypes.CreateErdAttribute[]>('./erdAttributes.json');
export const erdDiagramData = await loadJson<ErdDiagramTypes.CreateErdDiagram[]>('./erdDiagrams.json');
export const erdEntityData = await loadJson<ErdEntityTypes.CreateErdEntity[]>('./erdEntities.json');
export const erdRelationshipData = await loadJson<ErdRelationshipTypes.CreateErdRelationship[]>('./erdRelationships.json');
export const favoriteData = await loadJson<FavoriteTypes.CreateFavorite[]>('./favorites.json');
export const teamMemberData = await loadJson<TeamMemberTypes.CreateTeamMember[]>('./teamMembers.json');
export const teamData = await loadJson<TeamTypes.CreateTeam[]>('./teams.json');
export const userData = await loadJson<UserTypes.CreateUserInput[]>('./users.json');
