export const getPageNumbers = (total: number): number => {
  return Math.ceil(total / 10);
};
