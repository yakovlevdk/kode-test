import { createEffect, createEvent, createStore, sample, combine } from 'effector';
import { fetchUsers } from '../api/users';
import { getCached, getCachedOrStale, setCached } from '../utils/cache';
import type { User } from '../types/user';
import type { SortMode } from '../types/user';

export const loadUsers = createEvent<string | void>();
export const searchChanged = createEvent<string>();
export const departmentChanged = createEvent<string>();
export const sortChanged = createEvent<SortMode>();
export const sortModalToggled = createEvent<void>();

export const loadUsersFx = createEffect(async (department: string | void) => {
  const key = department || 'all';
  const cached = getCached<User[]>(`users:${key}`);
  if (cached) {
    return { key, items: cached };
  }
  try {
    const res = await fetchUsers(key === 'all' ? undefined : key);
    setCached(`users:${key}`, res.items);
    return { key, items: res.items };
  } catch (err) {
    const stale = getCachedOrStale<User[]>(`users:${key}`);
    if (stale) return { key, items: stale };
    throw err;
  }
});

export const $users = createStore<User[]>([]).on(
  loadUsersFx.doneData,
  (_, { items }) => items,
);

export const $loading = createStore(false)
  .on(loadUsersFx.pending, (_, p) => p)
  .reset(loadUsersFx.finally);

export const $error = createStore<string | null>(null)
  .on(loadUsersFx.failData, (_, err) => err?.message ?? 'Unknown error')
  .on(loadUsersFx.done, () => null)
  .reset(loadUsersFx);

import { loadState, saveState } from '../utils/persist';
const persisted = loadState();

export const $search = createStore(persisted.search ?? '').on(searchChanged, (_, s) => s);

export const $department = createStore(persisted.department ?? 'all').on(departmentChanged, (_, d) => d);

export const $sortMode = createStore<SortMode>((persisted.sortMode as SortMode) ?? 'alphabet').on(
  sortChanged,
  (_, m) => m,
);

export const $sortModalOpen = createStore(false)
  .on(sortModalToggled, (open) => !open)
  .on(sortChanged, () => false);

sample({ clock: loadUsers, target: loadUsersFx });

sample({
  clock: departmentChanged,
  fn: (d) => d,
  target: loadUsers,
});

export const appMounted = createEvent<void>();

sample({
  clock: appMounted,
  source: $department,
  fn: (d) => d,
  target: loadUsers,
});

$search.watch((s) => {
  const d = $department.getState();
  const m = $sortMode.getState();
  saveState({ search: s, department: d, sortMode: m });
});
$department.watch((d) => {
  const s = $search.getState();
  const m = $sortMode.getState();
  saveState({ search: s, department: d, sortMode: m });
});
$sortMode.watch((m) => {
  const s = $search.getState();
  const d = $department.getState();
  saveState({ search: s, department: d, sortMode: m });
});

export const $filteredUsers = combine($users, $search, (users: User[], search: string) => {
  if (!search.trim()) return users;
  const q = search.trim().toLowerCase();
  return users.filter(
    (u) =>
      (u.firstName ?? '').toLowerCase().includes(q) ||
      (u.lastName ?? '').toLowerCase().includes(q) ||
      (u.userTag ?? '').toLowerCase().includes(q),
  );
});

function parseBirthday(birthday: string): { day: number; month: number; year: number } {
  if (birthday.includes('-')) {
    const [y, m, d] = birthday.split('-').map(Number);
    return { year: y!, month: m!, day: d! };
  }
  const [d, m, y] = birthday.split('.').map(Number);
  return { year: y!, month: m!, day: d! };
}

function getNextBirthday(birthday: string): Date {
  const { day: d, month: m } = parseBirthday(birthday);
  const now = new Date();
  let next = new Date(now.getFullYear(), m - 1, d);
  if (next < now) next = new Date(now.getFullYear() + 1, m - 1, d);
  return next;
}

function compareByBirthday(a: User, b: User): number {
  return getNextBirthday(a.birthday).getTime() - getNextBirthday(b.birthday).getTime();
}

function compareByAlphabet(a: User, b: User): number {
  const nameA = String(a.firstName ?? '') + String(a.lastName ?? '');
  const nameB = String(b.firstName ?? '') + String(b.lastName ?? '');
  return nameA.localeCompare(nameB);
}

export const $sortedUsers = combine($filteredUsers, $sortMode, (users: User[], mode: SortMode) => {
  const copy = [...users];
  if (mode === 'birthday') {
    copy.sort(compareByBirthday);
  } else {
    copy.sort(compareByAlphabet);
  }
  return copy;
});

export const $groupedByBirthdayYear = $sortedUsers.map((users: User[]) => {
  const groups: Record<number, User[]> = {};
  for (const u of users) {
    const next = getNextBirthday(u.birthday);
    const year = next.getFullYear();
    if (!groups[year]) groups[year] = [];
    groups[year].push(u);
  }
  return groups;
});
