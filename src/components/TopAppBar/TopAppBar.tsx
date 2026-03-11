import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import { useUnit } from 'effector-react';
import {
  $search,
  $department,
  $loading,
  $error,
  $sortedUsers,
  searchChanged,
  departmentChanged,
  sortModalToggled,
} from '../../store/users';
import { $theme, themeToggled } from '../../store/theme';
import { DEPARTMENT_KEYS } from '../../constants/departments';
import { SortModal } from '../SortModal/SortModal';

const SearchIcon = () => (
  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.7309 18.3109L16.0209 14.6309C17.461 12.8353 18.1584 10.5562 17.9697 8.2622C17.781 5.9682 16.7206 3.83368 15.0064 2.29754C13.2923 0.761407 11.0547 -0.0595894 8.75382 0.00337096C6.45294 0.0663314 4.26362 1.00846 2.63604 2.63604C1.00846 4.26362 0.0663314 6.45294 0.00337096 8.75382C-0.0595894 11.0547 0.761407 13.2923 2.29754 15.0064C3.83368 16.7206 5.9682 17.781 8.2622 17.9697C10.5562 18.1584 12.8353 17.461 14.6309 16.0209L18.3109 19.7009C18.4039 19.7946 18.5145 19.869 18.6363 19.9198C18.7582 19.9706 18.8889 19.9967 19.0209 19.9967C19.1529 19.9967 19.2836 19.9706 19.4055 19.9198C19.5273 19.869 19.6379 19.7946 19.7309 19.7009C19.9111 19.5144 20.0119 19.2652 20.0119 19.0059C20.0119 18.7466 19.9111 18.4974 19.7309 18.3109ZM9.0209 16.0209C7.63643 16.0209 6.28305 15.6104 5.13191 14.8412C3.98076 14.072 3.08356 12.9788 2.55374 11.6997C2.02393 10.4206 1.88531 9.01314 2.1554 7.65527C2.4255 6.2974 3.09219 5.05012 4.07115 4.07115C5.05012 3.09219 6.2974 2.4255 7.65527 2.1554C9.01314 1.88531 10.4206 2.02393 11.6997 2.55374C12.9788 3.08356 14.072 3.98076 14.8412 5.13191C15.6104 6.28305 16.0209 7.63643 16.0209 9.0209C16.0209 10.8774 15.2834 12.6579 13.9706 13.9706C12.6579 15.2834 10.8774 16.0209 9.0209 16.0209Z" fill="currentColor"/>
  </svg>
);

const SortIcon = () => (
  <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 0C0.802219 0 0.60888 0.0586491 0.44443 0.16853C0.279981 0.278412 0.151809 0.434591 0.0761209 0.617317C0.000433281 0.800043 -0.0193701 1.00111 0.0192152 1.19509C0.0578004 1.38907 0.153041 1.56725 0.292894 1.70711C0.432746 1.84696 0.610929 1.9422 0.80491 1.98079C0.998891 2.01937 1.19996 1.99957 1.38268 1.92388C1.56541 1.84819 1.72159 1.72002 1.83147 1.55557C1.94135 1.39112 2 1.19778 2 1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM5 2H19C19.2652 2 19.5196 1.89464 19.7071 1.70711C19.8946 1.51957 20 1.26522 20 1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0H5C4.73478 0 4.48043 0.105357 4.29289 0.292893C4.10536 0.48043 4 0.734784 4 1C4 1.26522 4.10536 1.51957 4.29289 1.70711C4.48043 1.89464 4.73478 2 5 2ZM5 5C4.80222 5 4.60888 5.05865 4.44443 5.16853C4.27998 5.27841 4.15181 5.43459 4.07612 5.61732C4.00043 5.80004 3.98063 6.00111 4.01922 6.19509C4.0578 6.38907 4.15304 6.56725 4.29289 6.70711C4.43275 6.84696 4.61093 6.9422 4.80491 6.98079C4.99889 7.01937 5.19996 6.99957 5.38268 6.92388C5.56541 6.84819 5.72159 6.72002 5.83147 6.55557C5.94135 6.39112 6 6.19778 6 6C6 5.73478 5.89464 5.48043 5.70711 5.29289C5.51957 5.10536 5.26522 5 5 5ZM9 10C8.80222 10 8.60888 10.0586 8.44443 10.1685C8.27998 10.2784 8.15181 10.4346 8.07612 10.6173C8.00043 10.8 7.98063 11.0011 8.01922 11.1951C8.0578 11.3891 8.15304 11.5673 8.29289 11.7071C8.43275 11.847 8.61093 11.9422 8.80491 11.9808C8.99889 12.0194 9.19996 11.9996 9.38268 11.9239C9.56541 11.8482 9.72159 11.72 9.83147 11.5556C9.94135 11.3911 10 11.1978 10 11C10 10.7348 9.89464 10.4804 9.70711 10.2929C9.51957 10.1054 9.26522 10 9 10ZM19 5H9C8.73478 5 8.48043 5.10536 8.29289 5.29289C8.10536 5.48043 8 5.73478 8 6C8 6.26522 8.10536 6.51957 8.29289 6.70711C8.48043 6.89464 8.73478 7 9 7H19C19.2652 7 19.5196 6.89464 19.7071 6.70711C19.8946 6.51957 20 6.26522 20 6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5ZM19 10H13C12.7348 10 12.4804 10.1054 12.2929 10.2929C12.1054 10.4804 12 10.7348 12 11C12 11.2652 12.1054 11.5196 12.2929 11.7071C12.4804 11.8946 12.7348 12 13 12H19C19.2652 12 19.5196 11.8946 19.7071 11.7071C19.8946 11.5196 20 11.2652 20 11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10Z" fill="#C3C3C6"/>
  </svg>
);

const Container = styled.header`
  background: ${(p) => p.theme.colors.bgPrimary};
  padding: 8px 16px 0;
  position: sticky;
  top: 0;
  z-index: 10;
  overflow: visible;
`;

const StatusBlockOuter = styled.div<{ $variant: 'loading' | 'error' }>`
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  margin-top: -8px;
  margin-bottom: 12px;
  height: 108px;
  background: ${(p) =>
    p.$variant === 'error' ? p.theme.colors.errorPrimary : p.theme.colors.activePrimary};
  padding: 16px 0 0 24px;
  box-sizing: border-box;
`;

const StatusBlockTitle = styled.div`
  font: 700 24px Inter, sans-serif;
  color: #FFFFFF;
  margin: 0;
`;

const StatusBlockText = styled.div`
  font: 500 13px/1.23 Inter, sans-serif;
  color: #FFFFFF;
  margin: 20px 0 0 0;
`;

const SearchRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  font: 700 24px Inter, sans-serif;
  color: ${(p) => p.theme.colors.textPrimary};
  margin: 0;
  padding: 16px 0 0 24px;
  flex-shrink: 0;
`;

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  background: ${(p) => p.theme.colors.bgSecondary};
  border-radius: 16px;
  margin: 0 16px;
`;

const SearchIconWrap = styled.span<{ $active?: boolean }>`
  color: ${(p) => (p.$active ? p.theme.colors.textPrimary : p.theme.colors.textTertiary)};
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const SearchInputBox = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font: 500 15px/24px Inter, sans-serif;
  color: ${(p) => p.theme.colors.textPrimary};
  outline: none;
  padding: 0;
  caret-color: transparent;

  &::placeholder {
    font: 500 15px Inter, sans-serif;
    color: #C3C3C6;
  }
`;

const MirrorSpan = styled.span`
  position: absolute;
  left: -9999px;
  visibility: hidden;
  white-space: pre;
  font: 500 15px Inter, sans-serif;
  pointer-events: none;
`;

const caretBlink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const CustomCaret = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 24px;
  background: #5F30F9;
  border-radius: 5px;
  pointer-events: none;
  margin-right: 5px;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  animation: ${caretBlink} 1s step-end infinite;
`;

const TabsActions = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LangBtn = styled.button`
  flex-shrink: 0;
  padding: 4px 8px;
  border: none;
  background: none;
  font: 500 14px Inter, sans-serif;
  color: ${(p) => p.theme.colors.textTertiary};
  cursor: pointer;

  &:hover {
    color: ${(p) => p.theme.colors.textPrimary};
  }
`;

const ThemeBtn = styled.button`
  flex-shrink: 0;
  padding: 0 8px;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: ${(p) => p.theme.colors.textTertiary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SortBtn = styled.button`
  flex-shrink: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  color: ${(p) => p.theme.colors.textTertiary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tabs = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  min-height: 44px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabsInner = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  padding: 8px 16px 0;
  border-bottom: 1px solid ${(p) => p.theme.colors.contentSecondary};
`;

const Tab = styled.button<{ $active?: boolean }>`
  flex-shrink: 0;
  border: none;
  background: none;
  font: ${(p) =>
    p.$active ? '600 15px/1.33 Inter, sans-serif' : '500 15px/1.33 Inter, sans-serif'};
  color: ${(p) =>
    p.$active ? p.theme.colors.textPrimary : p.theme.colors.textTertiary};
  cursor: pointer;
  padding: 8px 12px;
  position: relative;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 0;
    height: 2px;
    background: ${(p) => p.theme.colors.activePrimary};
    opacity: ${(p) => (p.$active ? 1 : 0)};
  }
`;

function useIsOnline() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener('online', cb);
      window.addEventListener('offline', cb);
      return () => {
        window.removeEventListener('online', cb);
        window.removeEventListener('offline', cb);
      };
    },
    () => navigator.onLine,
    () => true,
  );
}

function isNetworkError(err: string | null): boolean {
  if (!err) return false;
  const lower = err.toLowerCase();
  return lower.includes('network') || lower.includes('fetch') || lower.includes('failed');
}

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export function TopAppBar() {
  const { t, i18n } = useTranslation();
  const isOnline = useIsOnline();
  const theme = useUnit($theme);
  const [search, department, loading, error, users] = useUnit([
    $search,
    $department,
    $loading,
    $error,
    $sortedUsers,
  ]);
  const showOfflineBlock = !isOnline || (isNetworkError(error) && users.length === 0 && !loading);
  const [localSearch, setLocalSearch] = useState(search);
  const [caretLeft, setCaretLeft] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);

  const updateCaret = useCallback(() => {
    const input = inputRef.current;
    const mirror = mirrorRef.current;
    if (!input || !mirror) return;
    const pos = input.selectionStart ?? 0;
    mirror.textContent = localSearch.substring(0, pos);
    setCaretLeft(mirror.offsetWidth);
  }, [localSearch]);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  useEffect(() => {
    const t = setTimeout(() => searchChanged(localSearch), 300);
    return () => clearTimeout(t);
  }, [localSearch]);

  useEffect(() => {
    updateCaret();
  }, [localSearch, updateCaret]);

  return (
    <Container>
      {showOfflineBlock ? (
        <StatusBlockOuter $variant="error">
          <StatusBlockTitle>{t('search')}</StatusBlockTitle>
          <StatusBlockText>{t('offlineError')}</StatusBlockText>
        </StatusBlockOuter>
      ) : loading ? (
        <StatusBlockOuter $variant="loading">
          <StatusBlockTitle>{t('search')}</StatusBlockTitle>
          <StatusBlockText>{t('loading')}</StatusBlockText>
        </StatusBlockOuter>
      ) : (
        <SearchRow>
          <Title>{t('search')}</Title>
          <SearchWrap>
          <SearchIconWrap $active={localSearch.length > 0}>
            <SearchIcon />
          </SearchIconWrap>
          <SearchInputBox>
            <MirrorSpan ref={mirrorRef} aria-hidden />
            <SearchInput
              ref={inputRef}
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onSelect={updateCaret}
              onKeyUp={updateCaret}
              onClick={updateCaret}
              onFocus={() => { setIsFocused(true); updateCaret(); }}
              onBlur={() => setIsFocused(false)}
              placeholder={t('searchPlaceholder')}
            />
            <CustomCaret style={{ left: caretLeft }} $visible={isFocused} />
          </SearchInputBox>
          <SortBtn onClick={() => sortModalToggled()} aria-label={t('sort')}>
            <SortIcon />
          </SortBtn>
        </SearchWrap>
      </SearchRow>
      )}
      <Tabs>
        <TabsInner>
          <Tab
            $active={department === 'all'}
            onClick={() => departmentChanged('all')}
          >
            {t('departments.all')}
          </Tab>
          {DEPARTMENT_KEYS.map((key) => (
            <Tab
              key={key}
              $active={department === key}
              onClick={() => departmentChanged(key)}
            >
              {t(`departments.${key}`)}
            </Tab>
          ))}
          <TabsActions>
            <LangBtn
              onClick={() => i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')}
              aria-label={i18n.language === 'ru' ? 'English' : 'Русский'}
            >
              {i18n.language === 'ru' ? 'EN' : 'RU'}
            </LangBtn>
            <ThemeBtn onClick={() => themeToggled()} aria-label={theme === 'dark' ? t('themeLight') : t('themeDark')}>
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </ThemeBtn>
          </TabsActions>
        </TabsInner>
      </Tabs>
      <SortModal />
    </Container>
  );
}
