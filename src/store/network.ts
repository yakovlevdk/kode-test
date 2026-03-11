import { createEvent, createStore, sample } from 'effector';
import { loadUsers, loadUsersFx, $department } from './users';

export const $isOnline = createStore(
  typeof navigator !== 'undefined' ? navigator.onLine : true,
);

export const setOnline = createEvent<boolean>();
export const syncOnline = createEvent<void>();

$isOnline.on(setOnline, (_, v) => v).on(syncOnline, () => navigator.onLine);

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => setOnline(true));
  window.addEventListener('offline', () => setOnline(false));
}

export const $showReconnectBanner = createStore(false)
  .on(setOnline, (_, online) => (online ? true : false))
  .on(loadUsersFx.done, () => false);

sample({
  clock: setOnline,
  filter: (_src, online) => online,
  source: $department,
  target: loadUsers,
});
