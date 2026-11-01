import list from '@/data/parked-domains.txt?raw';

/** Parked domains from src/data/parked-domains.txt, lower-cased and sorted. */
export const parkedDomains: string[] = [
  ...new Set(
    list
      .split('\n')
      .map((line) => line.replace(/#.*/, '').trim().toLowerCase())
      .filter(Boolean),
  ),
].sort();
