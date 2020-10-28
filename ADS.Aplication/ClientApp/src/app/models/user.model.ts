import { Role } from '../models/role.model';

export interface User {

  id: string;
  userName: string;
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  isArchived: boolean;
  role: Role;
}
