/* =============================================================
   Weighted Selection Utility — SpinPick Clone
   Implements weighted random selection for entries
   ============================================================= */

export interface WeightedEntry {
  name: string;
  weight: number;
}

/**
 * Select a random entry based on weights
 * Higher weight = higher probability of selection
 */
export function selectWeightedRandom(entries: WeightedEntry[]): string | null {
  if (entries.length === 0) return null;

  // Calculate total weight
  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
  if (totalWeight <= 0) return null;

  // Generate random number between 0 and totalWeight
  let random = Math.random() * totalWeight;

  // Find the entry that corresponds to the random number
  for (const entry of entries) {
    random -= entry.weight;
    if (random <= 0) {
      return entry.name;
    }
  }

  // Fallback (should rarely happen due to floating point)
  return entries[entries.length - 1].name;
}

/**
 * Calculate the probability percentage for each entry
 */
export function calculateProbabilities(entries: WeightedEntry[]): Record<string, number> {
  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
  if (totalWeight <= 0) return {};

  const probabilities: Record<string, number> = {};
  entries.forEach((entry) => {
    probabilities[entry.name] = (entry.weight / totalWeight) * 100;
  });

  return probabilities;
}

/**
 * Validate weights (all positive, sum > 0)
 */
export function validateWeights(entries: WeightedEntry[]): { valid: boolean; error?: string } {
  if (entries.length === 0) {
    return { valid: false, error: "No entries" };
  }

  for (const entry of entries) {
    if (entry.weight < 0) {
      return { valid: false, error: `Negative weight for "${entry.name}"` };
    }
  }

  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
  if (totalWeight <= 0) {
    return { valid: false, error: "Total weight must be greater than 0" };
  }

  return { valid: true };
}
