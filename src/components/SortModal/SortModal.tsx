import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { $sortModalOpen, $sortMode, sortChanged, sortModalToggled } from '../../store/users';

const Overlay = styled.div<{ $open: boolean }>`
  display: ${(p) => (p.$open ? 'flex' : 'none')};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Sheet = styled.div`
  background: ${(p) => p.theme.colors.bgPrimary};
  border-radius: 20px;
  width: 373px;
  min-height: 192px;
  padding: 0 16px 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 7px 8px 16px;
  gap: 16px;
`;

const CloseBtn = styled.button`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  padding: 0;
  border-radius: 50%;
  background: ${(p) => p.theme.colors.bgSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${(p) => p.theme.colors.bgSecondary};
  }
`;

const CloseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.73641 0.263604C10.0879 0.615076 10.0879 1.18492 9.73641 1.5364L6.273 5L9.73641 8.46362C10.0586 8.7858 10.0854 9.29148 9.81695 9.64424L9.73641 9.73641C9.38494 10.0879 8.81509 10.0879 8.46362 9.73641L5 6.273L1.5364 9.73641C1.18492 10.0879 0.615076 10.0879 0.263604 9.73641C-0.0878679 9.38494 -0.0878679 8.81509 0.263604 8.46362L3.727 5L0.263604 1.5364C-0.0585786 1.21421 -0.0854272 0.708534 0.183058 0.355769L0.263604 0.263604C0.615076 -0.087868 1.18492 -0.087868 1.5364 0.263604L5 3.727L8.46362 0.263604C8.81509 -0.087868 9.38494 -0.087868 9.73641 0.263604Z" fill="#C3C3C6"/>
  </svg>
);

const Title = styled.h2`
  flex: 1;
  font: 600 20px/1.2 Inter, sans-serif;
  color: ${(p) => p.theme.colors.textPrimary};
  margin: 0;
  text-align: center;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const RadioSelected = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5Z" stroke="#6534FF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#6534FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RadioUnselected = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#6534FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RadioWrap = styled.span`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Option = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 60px;
  padding: 0 12px;
  border: none;
  background: none;
  cursor: pointer;
  font: ${(p) => p.theme.typography.headline};
  color: ${(p) => p.theme.colors.textPrimary};
  text-align: left;
`;

export function SortModal() {
  const { t } = useTranslation();
  const [open, sortMode] = useUnit([$sortModalOpen, $sortMode]);

  return (
    <Overlay $open={open} onClick={() => sortModalToggled()}>
      <Sheet onClick={(e) => e.stopPropagation()}>
        <Header>
          <span style={{ width: 24 }} aria-hidden />
          <Title>{t('sort')}</Title>
          <CloseBtn onClick={() => sortModalToggled()} aria-label={t('close')}>
            <CloseIcon />
          </CloseBtn>
        </Header>
        <Options>
        <Option onClick={() => sortChanged('alphabet')}>
          <RadioWrap>{sortMode === 'alphabet' ? <RadioSelected /> : <RadioUnselected />}</RadioWrap>
          {t('sortAlphabet')}
        </Option>
        <Option onClick={() => sortChanged('birthday')}>
          <RadioWrap>{sortMode === 'birthday' ? <RadioSelected /> : <RadioUnselected />}</RadioWrap>
          {t('sortBirthday')}
        </Option>
        </Options>
      </Sheet>
    </Overlay>
  );
}
