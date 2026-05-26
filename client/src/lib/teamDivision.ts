/* =============================================================
   Team Division Utility — SpinPick Clone
   Algorithms for dividing people into balanced teams
   ============================================================= */

export interface Team {
  name: string;
  members: string[];
}

/**
 * Divide entries into equal teams
 * Uses round-robin assignment for balance
 */
export function divideIntoTeams(entries: string[], teamCount: number): Team[] {
  if (teamCount <= 0 || entries.length === 0) return [];
  if (teamCount > entries.length) teamCount = entries.length;

  // Shuffle entries for randomness
  const shuffled = [...entries].sort(() => Math.random() - 0.5);

  // Create empty teams
  const teams: Team[] = Array.from({ length: teamCount }, (_, i) => ({
    name: `Team ${i + 1}`,
    members: [],
  }));

  // Distribute members using round-robin
  shuffled.forEach((member, index) => {
    teams[index % teamCount].members.push(member);
  });

  return teams;
}

/**
 * Divide entries into pairs
 */
export function divideIntoPairs(entries: string[]): Team[] {
  if (entries.length === 0) return [];

  const shuffled = [...entries].sort(() => Math.random() - 0.5);
  const pairs: Team[] = [];

  for (let i = 0; i < shuffled.length; i += 2) {
    if (i + 1 < shuffled.length) {
      pairs.push({
        name: `Pair ${Math.floor(i / 2) + 1}`,
        members: [shuffled[i], shuffled[i + 1]],
      });
    } else {
      // Odd person out gets their own team
      pairs.push({
        name: `Solo ${Math.floor(i / 2) + 1}`,
        members: [shuffled[i]],
      });
    }
  }

  return pairs;
}

/**
 * Divide entries into groups of specific size
 */
export function divideIntoGroups(entries: string[], groupSize: number): Team[] {
  if (groupSize <= 0 || entries.length === 0) return [];

  const shuffled = [...entries].sort(() => Math.random() - 0.5);
  const groups: Team[] = [];

  for (let i = 0; i < shuffled.length; i += groupSize) {
    const groupMembers = shuffled.slice(i, Math.min(i + groupSize, shuffled.length));
    groups.push({
      name: `Group ${Math.floor(i / groupSize) + 1}`,
      members: groupMembers,
    });
  }

  return groups;
}

/**
 * Calculate team sizes for balanced distribution
 */
export function calculateTeamSizes(totalMembers: number, teamCount: number): number[] {
  if (teamCount <= 0 || totalMembers === 0) return [];

  const baseSize = Math.floor(totalMembers / teamCount);
  const remainder = totalMembers % teamCount;

  return Array.from({ length: teamCount }, (_, i) => (i < remainder ? baseSize + 1 : baseSize));
}

/**
 * Validate team division parameters
 */
export function validateTeamDivision(
  entries: string[],
  teamCount: number
): { valid: boolean; error?: string } {
  if (entries.length === 0) {
    return { valid: false, error: "No entries" };
  }

  if (teamCount <= 0) {
    return { valid: false, error: "Team count must be greater than 0" };
  }

  if (teamCount > entries.length) {
    return { valid: false, error: `Cannot create ${teamCount} teams from ${entries.length} members` };
  }

  return { valid: true };
}
