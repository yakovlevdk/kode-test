import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import type { User } from '../../types/user';
import {
  $loading,
  $error,
  $department,
  $sortedUsers,
  $sortMode,
  $groupedByBirthdayYear,
  $search,
  loadUsers,
} from '../../store/users';
import { $isOnline } from '../../store/network';
import { UserCard } from '../../components/UserCard/UserCard';
import { SkeletonCard } from '../../components/Skeleton/Skeleton';

const Wrapper = styled.main`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

const List = styled.div`
  padding: 16px 0 24px;
`;

const EmptyState = styled.div`
  padding: 48px 24px;
  text-align: center;
  font: ${(p) => p.theme.typography.headline};
  color: ${(p) => p.theme.colors.textTertiary};
`;

const SearchEmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 149px 16px 48px;
`;

const SearchEmptyInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 343px;
`;

const SearchEmptyIcon = styled.img`
  width: 56px;
  height: 56px;
`;

const SearchEmptyTitle = styled.div`
  font: 600 17px/1.29 Inter, sans-serif;
  color: ${(p) => p.theme.colors.textPrimary};
  text-align: center;
`;

const SearchEmptyTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
`;

const SearchEmptyText = styled.div`
  font: 400 16px/1.25 Inter, sans-serif;
  color: ${(p) => p.theme.colors.textTertiary};
  text-align: center;
`;

const CriticalErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 149px 16px 48px;
`;

const CriticalErrorInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 343px;
`;

const CriticalErrorIcon = styled.img`
  width: 56px;
  height: 56px;
`;

const CriticalErrorTitle = styled.div`
  font: 600 17px/1.29 Inter, sans-serif;
  color: ${(p) => p.theme.colors.textPrimary};
  text-align: center;
`;

const CriticalErrorText = styled.div`
  font: 400 16px/1.25 Inter, sans-serif;
  color: ${(p) => p.theme.colors.textTertiary};
  text-align: center;
`;

const CriticalErrorRetryBtn = styled.button`
  margin-top: 12px;
  padding: 0;
  border: none;
  background: none;
  font: 600 16px Inter, sans-serif;
  color: #6534FF;
  cursor: pointer;
`;

const YearGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 16px 40px 8px;
`;

const YearLine = styled.span`
  flex: 1;
  height: 1px;
  background: #C3C3C6;
`;

const YearLabel = styled.span`
  width: 184px;
  flex-shrink: 0;
  text-align: center;
  font: 400 13px/1.23 Inter, sans-serif;
  color: #97979B;
`;

export function HomePage() {
  const { t } = useTranslation();
  const [loading, error, users, sortMode, grouped, search, isOnline, department] = useUnit([
    $loading,
    $error,
    $sortedUsers,
    $sortMode,
    $groupedByBirthdayYear,
    $search,
    $isOnline,
    $department,
  ]);

  if (isOnline && error && users.length === 0) {
    return (
      <Wrapper>
        <CriticalErrorWrapper>
          <CriticalErrorInner>
            <CriticalErrorIcon src="/d285cbc49d555b4fec5658d4fb92d5da79dde2df.png" alt="" aria-hidden />
            <SearchEmptyTextBlock>
              <CriticalErrorTitle>{t('criticalError')}</CriticalErrorTitle>
              <CriticalErrorText>{t('criticalErrorHint')}</CriticalErrorText>
            </SearchEmptyTextBlock>
            <CriticalErrorRetryBtn type="button" onClick={() => loadUsers(department)}>
              {t('retry')}
            </CriticalErrorRetryBtn>
          </CriticalErrorInner>
        </CriticalErrorWrapper>
      </Wrapper>
    );
  }

  if (loading && users.length === 0) {
    return (
      <Wrapper>
        <List>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </List>
      </Wrapper>
    );
  }

  if (users.length === 0) {
    const hasActiveSearch = search.trim() !== '';
    return (
      <Wrapper>
        {hasActiveSearch ? (
          <SearchEmptyWrapper>
            <SearchEmptyInner>
              <SearchEmptyIcon src="/left-pointing-magnifying-glass_1f50d.png" alt="" aria-hidden />
              <SearchEmptyTextBlock>
                <SearchEmptyTitle>{t('searchEmpty')}</SearchEmptyTitle>
                <SearchEmptyText>{t('searchEmptyHint')}</SearchEmptyText>
              </SearchEmptyTextBlock>
            </SearchEmptyInner>
          </SearchEmptyWrapper>
        ) : (
          <EmptyState>{t('emptyList')}</EmptyState>
        )}
      </Wrapper>
    );
  }

  if (sortMode === 'birthday') {
    const years = Object.keys(grouped)
      .map(Number)
      .sort((a, b) => a - b);

    return (
      <Wrapper>
        <List>
          {years.map((year) => (
            <div key={year}>
              <YearGroup>
                <YearLine />
                <YearLabel>{year}</YearLabel>
                <YearLine />
              </YearGroup>
              {grouped[year]?.map((u: User) => (
                <UserCard key={u.id} user={u} />
              ))}
            </div>
          ))}
        </List>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <List>
        {users.map((u: User) => (
          <UserCard key={u.id} user={u} />
        ))}
      </List>
    </Wrapper>
  );
}
