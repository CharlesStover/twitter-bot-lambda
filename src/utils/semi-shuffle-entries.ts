// Shuffle an array of entries in a seemingly-randomized way that generates the
//   same order each time.

export default function semiShuffleEntries(entries: [string, unknown][]): void {
  let i = 0;
  entries.sort(([a], [b]): -1 | 1 => {
    i++;
    if (a.charAt(i % a.length) < b.charAt(i % b.length)) {
      return -1;
    }
    return 1;
  });
}
