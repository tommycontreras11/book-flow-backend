export const getDaysBetweenDates = (
  startDate: string,
  endDate: string
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffInMs = end.getTime() - start.getTime();

  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

export const getFullDate = (date?: Date) => {
  const today = date ?? new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}