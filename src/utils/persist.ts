const KEY = 'kode-users-state';

export interface PersistedState {
  search: string;
  department: string;
  sortMode: 'alphabet' | 'birthday';
}

export function loadState(): Partial<PersistedState> {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as PersistedState;
  } catch {
    return {};
  }
}

export function saveState(s: PersistedState): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
}
