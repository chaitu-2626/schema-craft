export const erdAttributeJson = (await import('./erdAttributes.json', {
    assert: { type: 'json' }
})).default;

export const erdDiagramJson = (await import('./erdDiagrams.json', {
    assert: { type: 'json' }
})).default;

export const erdEntityJson = (await import('./erdEntities.json', {
    assert: { type: 'json' }
})).default;

export const erdRelationshipJson = (await import('./erdRelationships.json', {
    assert: { type: 'json' }
})).default;

export const favoriteJson = (await import('./favorites.json', {
    assert: { type: 'json' }
})).default;

export const teamMemberJson = (await import('./teamMembers.json', {
    assert: { type: 'json' }
})).default;

export const teamJson = (await import('./teams.json', {
    assert: { type: 'json' }
})).default;

export const userJson = (await import('./users.json', {
    assert: { type: 'json' }
})).default;
