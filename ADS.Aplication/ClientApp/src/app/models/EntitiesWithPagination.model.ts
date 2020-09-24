
import { PaginationModel } from './page.model';

export class EntitiesWithPagination<E, R> {
  entity: E;
  relationEntities: R[];
  pagination: PaginationModel;
}
