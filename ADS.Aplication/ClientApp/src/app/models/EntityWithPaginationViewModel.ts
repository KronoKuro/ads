
import { PaginationModel } from './page.model';

export class EntityWithPaginationViewModel<T> {
  entities: T[];
  pagination: PaginationModel;
}
