export type PaginationType = {
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  countItems: number;
  perPage: number;
  totalPages: number;
};
