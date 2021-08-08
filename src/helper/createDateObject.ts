export default function createDateObject(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day)
}
