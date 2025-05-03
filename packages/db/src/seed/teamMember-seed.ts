import { drizzleClient } from '@/client.js';
import { teamMemberData } from '@seedData';
import { teamMemberSchema } from '@schema';
import { UserRole } from '@schema-craft/types'

type TeamMember = typeof teamMemberData[number];

/**
 * Inserts a team member into the database.
 * @param teamMember The team member to insert.
 */
const insertTeamMember = async (teamMember: TeamMember): Promise<void> => {
  const { userRole, invitedAt, joinedAt, ...rest } = teamMember;

  await drizzleClient.insert(teamMemberSchema).values({
    ...rest,
    userRole: UserRole[userRole as keyof typeof UserRole],
    invitedAt: invitedAt ? new Date(invitedAt) : null,
    joinedAt: joinedAt ? new Date(joinedAt) : null,
  });
}

/**
 * Seeds the team member data into the database.
 */
export default async function seed() {
  console.log('Seeding team members...');

  await Promise.all(teamMemberData.map(insertTeamMember));

  console.log('Team members seeding complete.');
}