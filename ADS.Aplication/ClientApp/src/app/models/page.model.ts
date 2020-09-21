
export class PaginationModel {
  totalCount: number;
  pageSize: number = 5;
  currentPage: number= 1;
  totalPages: number;
  selectItemsPerPage: [5, 10, 25, 100];
}
