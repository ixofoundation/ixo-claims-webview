export type IRequestResult<ReturnType> = Promise<{
  data?: ReturnType;
  error?: Error | unknown;
}>;

export type PaginationFields = {
  offset?: number;
  first?: number;
  last?: number;
  page?: number; // UI is 1-based, but the API is 0-based
  pageSize?: number;
  totalCount?: number;
};
