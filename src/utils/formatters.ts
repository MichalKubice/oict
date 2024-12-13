// Accepts iso date as parameter and
// returns it in this format: dd.mm.yyyy
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
