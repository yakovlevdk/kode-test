import axios from 'axios';
import type { ApiUsersResponse, User } from '../types/user';

const BASE_URL =
  'https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users';

interface ApiUserRaw {
  id: string;
  avatarUrl?: string;
  avatar_url?: string;
  firstName?: string;
  first_name?: string;
  lastName?: string;
  last_name?: string;
  userTag?: string;
  user_tag?: string;
  department?: string;
  position?: string;
  birthday?: string;
  phone?: string;
}

function mapApiUser(u: ApiUserRaw): User {
  return {
    id: u.id,
    avatarUrl: u.avatarUrl ?? u.avatar_url ?? '',
    firstName: String(u.firstName ?? u.first_name ?? ''),
    lastName: String(u.lastName ?? u.last_name ?? ''),
    userTag: String(u.userTag ?? u.user_tag ?? ''),
    department: String(u.department ?? ''),
    position: String(u.position ?? ''),
    birthday: String(u.birthday ?? ''),
    phone: String(u.phone ?? ''),
  };
}

export async function fetchUsers(
  department?: string,
): Promise<ApiUsersResponse> {
  const params: Record<string, string> = department
    ? { __example: department }
    : { __example: 'all' };

  const response = await axios.get<{ items: ApiUserRaw[] }>(BASE_URL, {
    params,
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status >= 500) {
    throw new Error(`API error: ${response.status}`);
  }

  return {
    items: (response.data.items ?? []).map(mapApiUser),
  };
}

export function fetchUsersDynamic(): Promise<ApiUsersResponse> {
  return fetchUsersWithParams({ __example: 'all', __dynamic: 'true' });
}

function fetchUsersWithParams(
  params: Record<string, string>,
): Promise<ApiUsersResponse> {
  return axios
    .get<ApiUsersResponse>(BASE_URL, {
      params,
      headers: { 'Content-Type': 'application/json' },
      validateStatus: (status) => status >= 200 && status < 300,
    })
    .then((r) => r.data);
}
