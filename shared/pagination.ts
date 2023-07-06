export interface Pagination {
  page: number,
  size: number,
}

export type Range = [number, number];

export const getRange = ({ page, size }: Pagination): Range => {
  const from = page ? page * size : 0;
  const to = page ? from + size : size;
  return [from, to];
};

export const getPaginationFromQuery = (query: Record<string, unknown>): Pagination => {
  const { page, size } = query;
  return {
    page: +(page || '0') || 0,
    size: +(size || '10') || 10,
  };
}
