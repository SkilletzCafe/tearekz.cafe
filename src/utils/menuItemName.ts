/** Hide leading Toast item codes (41, S1, H2) without changing the source name. */
export function getMenuItemDisplayName(name: string): string {
  return name.replace(/^\s*(?:[A-Za-z]+\d+|\d+)\s+(?=\S)/, '');
}
