import { createEvent, createStore } from 'effector';

const THEME_KEY = 'kode-theme';

type ThemeMode = 'light' | 'dark';

function getSystemPreference(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): ThemeMode | null {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

export const themeToggled = createEvent<void>();
export const syncThemeWithSystem = createEvent<void>();

export const $theme = createStore<ThemeMode>(
  getStoredTheme() ?? getSystemPreference(),
)
  .on(themeToggled, (prev) => (prev === 'light' ? 'dark' : 'light'))
  .on(syncThemeWithSystem, () => getStoredTheme() ?? getSystemPreference());

$theme.watch((mode) => {
  try {
    localStorage.setItem(THEME_KEY, mode);
  } catch {}
});

if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!getStoredTheme()) {
      syncThemeWithSystem();
    }
  });
}
