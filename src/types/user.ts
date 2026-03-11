export interface User {
  id: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  userTag: string;
  department: string;
  position: string;
  birthday: string;
  phone: string;
}

export interface ApiUsersResponse {
  items: User[];
}

export type SortMode = 'alphabet' | 'birthday';

export type DepartmentKey = string;
