/**
 * Get a random number between 0 and max
 * default is 1,000,000,000,000 for creating ids
 */
export function getRandomInt(max: number = 1_000_000_000_000): number {
  return Math.floor(Math.random() * max);
}
