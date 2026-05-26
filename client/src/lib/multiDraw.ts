/* =============================================================
   Multi-Draw Utility — SpinPick Clone
   Sequential winner selection without replacement
   ============================================================= */

export interface DrawResult {
  position: number;
  winner: string;
  timestamp: number;
}

/**
 * Select multiple winners sequentially without replacement
 */
export function selectMultipleWinners(entries: string[], count: number): DrawResult[] {
  if (count <= 0 || entries.length === 0) return [];
  if (count > entries.length) count = entries.length;

  const results: DrawResult[] = [];
  const remaining = [...entries];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * remaining.length);
    const winner = remaining[randomIndex];

    results.push({
      position: i + 1,
      winner,
      timestamp: Date.now() + i * 100, // Stagger timestamps
    });

    // Remove winner from remaining pool
    remaining.splice(randomIndex, 1);
  }

  return results;
}

/**
 * Validate multi-draw parameters
 */
export function validateMultiDraw(
  entries: string[],
  count: number
): { valid: boolean; error?: string } {
  if (entries.length === 0) {
    return { valid: false, error: "No entries available" };
  }

  if (count <= 0) {
    return { valid: false, error: "Draw count must be greater than 0" };
  }

  if (count > entries.length) {
    return { valid: false, error: `Cannot draw ${count} winners from ${entries.length} entries` };
  }

  return { valid: true };
}

/**
 * Format draw results for display
 */
export function formatDrawResults(results: DrawResult[]): string {
  return results
    .map((r) => `${r.position}. ${r.winner}`)
    .join("\n");
}

/**
 * Export draw results as CSV
 */
export function exportDrawResults(results: DrawResult[], wheelTitle: string): string {
  const header = `Position,Winner,Timestamp\n`;
  const rows = results
    .map((r) => `${r.position},"${r.winner}",${new Date(r.timestamp).toISOString()}`)
    .join("\n");
  return header + rows;
}
