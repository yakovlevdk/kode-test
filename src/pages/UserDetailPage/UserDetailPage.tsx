import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $users } from '../../store/users';

const Wrapper = styled.main`
  min-height: 100vh;
`;

const TopBlock = styled.header`
  width: 100%;
  position: relative;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(p) => p.theme.colors.bgSecondary};
`;

const BackBtn = styled.button`
  position: absolute;
  left: 32px;
  top: 28px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.colors.textPrimary};
`;

const ChevronLeft = () => (
  <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.29579 5.95004L4.53579 10.19C4.62875 10.2838 4.73935 10.3582 4.86121 10.4089C4.98307 10.4597 5.11378 10.4858 5.24579 10.4858C5.3778 10.4858 5.50851 10.4597 5.63037 10.4089C5.75223 10.3582 5.86283 10.2838 5.95579 10.19C6.14204 10.0027 6.24658 9.74923 6.24658 9.48504C6.24658 9.22086 6.14204 8.9674 5.95579 8.78004L2.41579 5.24004L5.95579 1.70004C6.14204 1.51268 6.24658 1.25923 6.24658 0.995041C6.24658 0.730855 6.14204 0.477404 5.95579 0.290041C5.86235 0.19736 5.75153 0.124035 5.6297 0.0742702C5.50786 0.0245056 5.3774 -0.000719146 5.24579 4.18742e-05C5.11418 -0.000719169 4.98372 0.0245055 4.86188 0.0742701C4.74005 0.124035 4.62923 0.19736 4.53579 0.290041L0.29579 4.53004C0.202062 4.623 0.127668 4.73361 0.0768991 4.85546C0.0261302 4.97732 -8.11293e-06 5.10803 -8.12447e-06 5.24004C-8.13601e-06 5.37205 0.0261302 5.50276 0.076899 5.62462C0.127668 5.74648 0.202062 5.85708 0.29579 5.95004Z" fill="currentColor"/>
  </svg>
);

const Avatar = styled.img`
  width: 104px;
  height: 104px;
  border-radius: 64px;
  object-fit: cover;
  flex-shrink: 0;
  margin-top: 72px;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 24px;
  justify-content: center;
`;

const Name = styled.h1`
  font: 700 24px Inter, sans-serif;
  color: ${(p) => p.theme.colors.textPrimary};
  margin: 0;
`;

const Tag = styled.span`
  font: 400 17px Inter, sans-serif;
  color: ${(p) => p.theme.colors.textTertiary};
`;

const Position = styled.span`
  font: 400 13px Inter, sans-serif;
  color: ${(p) => p.theme.colors.textSecondary};
  margin-top: 12px;
  text-align: center;
  display: block;
`;

const BirthdayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 9.67002C21.9368 9.48711 21.822 9.32645 21.6693 9.20753C21.5167 9.0886 21.3328 9.01652 21.14 9.00002L15.45 8.17002L12.9 3.00002C12.8181 2.83095 12.6902 2.68837 12.5311 2.5886C12.3719 2.48883 12.1878 2.43591 12 2.43591C11.8121 2.43591 11.6281 2.48883 11.4689 2.5886C11.3097 2.68837 11.1819 2.83095 11.1 3.00002L8.54998 8.16002L2.85998 9.00002C2.6749 9.02633 2.5009 9.10399 2.35773 9.22418C2.21455 9.34438 2.10794 9.5023 2.04998 9.68002C1.99692 9.8537 1.99216 10.0385 2.03621 10.2147C2.08025 10.3909 2.17144 10.5517 2.29998 10.68L6.42998 14.68L5.42998 20.36C5.3896 20.5484 5.40453 20.7445 5.47296 20.9247C5.54139 21.1048 5.66041 21.2613 5.81571 21.3754C5.971 21.4895 6.15595 21.5563 6.34831 21.5678C6.54066 21.5792 6.73224 21.5349 6.89998 21.44L12 18.77L17.1 21.44C17.2403 21.5192 17.3988 21.5606 17.56 21.56C17.7718 21.5608 17.9784 21.4942 18.15 21.37C18.3051 21.2589 18.4252 21.1057 18.4961 20.9285C18.567 20.7513 18.5857 20.5575 18.55 20.37L17.55 14.69L21.68 10.69C21.8244 10.5677 21.9311 10.4069 21.9877 10.2264C22.0444 10.0458 22.0486 9.8529 22 9.67002ZM15.85 13.67C15.7342 13.7824 15.6474 13.9212 15.5969 14.0744C15.5464 14.2276 15.5337 14.3908 15.56 14.55L16.28 18.75L12.52 16.75C12.3738 16.6777 12.213 16.6401 12.05 16.6401C11.8869 16.6401 11.7261 16.6777 11.58 16.75L7.81998 18.75L8.53998 14.55C8.56622 14.3908 8.55354 14.2276 8.50305 14.0744C8.45255 13.9212 8.36572 13.7824 8.24998 13.67L5.24998 10.67L9.45998 10.06C9.62198 10.0375 9.77598 9.97556 9.90848 9.87967C10.041 9.78379 10.1479 9.65686 10.22 9.51002L12 5.70002L13.88 9.52002C13.952 9.66686 14.059 9.79379 14.1915 9.88968C14.324 9.98556 14.478 10.0475 14.64 10.07L18.85 10.68L15.85 13.67Z" fill="currentColor"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.4582 10.9603C17.2382 10.9603 17.0082 10.8903 16.7882 10.8403C16.3427 10.7421 15.9048 10.6118 15.4782 10.4503C15.0143 10.2815 14.5043 10.2903 14.0465 10.4749C13.5886 10.6595 13.2153 11.007 12.9982 11.4503L12.7782 11.9003C11.8042 11.3585 10.9092 10.6855 10.1182 9.90032C9.33294 9.10933 8.65999 8.21431 8.11817 7.24032L8.53817 6.96032C8.98153 6.74323 9.32895 6.36985 9.51356 5.91201C9.69817 5.45417 9.70694 4.94423 9.53817 4.48032C9.37939 4.05274 9.2491 3.61512 9.14817 3.17032C9.09817 2.95032 9.05817 2.72032 9.02817 2.49032C8.90673 1.78594 8.53779 1.14806 7.98779 0.691557C7.43779 0.235054 6.74286 -0.0100738 6.02817 0.000317303L3.02817 0.000317303C2.5972 -0.00372924 2.17042 0.0851307 1.77688 0.260848C1.38334 0.436565 1.03228 0.695013 0.747598 1.0186C0.462918 1.34219 0.251302 1.72331 0.127155 2.13603C0.00300869 2.54875 -0.0307535 2.98338 0.0281672 3.41032C0.560905 7.5997 2.4742 11.4922 5.46582 14.473C8.45744 17.4537 12.3569 19.3528 16.5482 19.8703H16.9282C17.6656 19.8714 18.3776 19.6008 18.9282 19.1103C19.2445 18.8274 19.4973 18.4805 19.6696 18.0926C19.842 17.7048 19.9301 17.2848 19.9282 16.8603V13.8603C19.9159 13.1657 19.663 12.4969 19.2125 11.968C18.762 11.4391 18.142 11.0829 17.4582 10.9603ZM17.9582 16.9603C17.958 17.1023 17.9276 17.2426 17.8689 17.3719C17.8103 17.5013 17.7248 17.6166 17.6182 17.7103C17.5064 17.8068 17.3758 17.8789 17.2346 17.9219C17.0934 17.965 16.9447 17.978 16.7982 17.9603C13.0531 17.4801 9.5744 15.7668 6.91088 13.0906C4.24736 10.4144 2.55058 6.92765 2.08817 3.18032C2.07225 3.03384 2.0862 2.88565 2.12917 2.74471C2.17214 2.60377 2.24324 2.473 2.33817 2.36032C2.43188 2.25365 2.54723 2.16816 2.67655 2.10953C2.80586 2.05091 2.94618 2.0205 3.08817 2.02032L6.08817 2.02032C6.32071 2.01514 6.54779 2.0912 6.73031 2.23539C6.91283 2.37958 7.03938 2.58289 7.08817 2.81032C7.12817 3.08365 7.17817 3.35365 7.23817 3.62032C7.35369 4.14746 7.50743 4.6655 7.69817 5.17032L6.29817 5.82032C6.17846 5.87524 6.07079 5.95326 5.98132 6.04991C5.89186 6.14656 5.82237 6.25993 5.77684 6.38351C5.73131 6.50709 5.71064 6.63845 5.71601 6.77004C5.72139 6.90163 5.75271 7.03086 5.80817 7.15032C7.24737 10.2331 9.72541 12.7111 12.8082 14.1503C13.0516 14.2503 13.3247 14.2503 13.5682 14.1503C13.6929 14.1057 13.8075 14.0368 13.9053 13.9475C14.0032 13.8582 14.0823 13.7504 14.1382 13.6303L14.7582 12.2303C15.2751 12.4152 15.8028 12.5688 16.3382 12.6903C16.6048 12.7503 16.8748 12.8003 17.1482 12.8403C17.3756 12.8891 17.5789 13.0157 17.7231 13.1982C17.8673 13.3807 17.9433 13.6078 17.9382 13.8403L17.9582 16.9603Z" fill="currentColor"/>
  </svg>
);

const BottomBlock = styled.div`
  width: 100%;
  height: 126px;
  padding: 0 16px 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${(p) => p.theme.colors.bgPrimary};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.colors.textPrimary};
`;

const FirstRow = styled(Row)`
  justify-content: space-between;
  width: 100%;
`;

const Age = styled.span`
  font: 500 16px Inter, sans-serif;
  color: ${(p) => p.theme.colors.textTertiary};
`;

const SecondRow = styled(Row)`
  margin-top: 46px;
`;

const Value = styled.span`
  font: 500 16px Inter, sans-serif;
  color: ${(p) => p.theme.colors.textPrimary};
`;

const PhoneLink = styled.a`
  font: 500 16px Inter, sans-serif;
  color: ${(p) => p.theme.colors.textPrimary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function getAge(birthday: string): number {
  const parts = birthday.includes('-') ? birthday.split('-') : birthday.split('.');
  const [y, m, d] = birthday.includes('-')
    ? [parts[0], parts[1], parts[2]]
    : [parts[2], parts[1], parts[0]];
  const birth = new Date(parseInt(y!, 10), parseInt(m!, 10) - 1, parseInt(d!, 10));
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) age--;
  return age;
}

function formatAge(birthday: string, t: (k: string) => string): string {
  const age = getAge(birthday);
  const mod10 = age % 10;
  const mod100 = age % 100;
  let suffix = t('years');
  if (mod100 >= 11 && mod100 <= 19) suffix = t('years');
  else if (mod10 === 1) suffix = t('year');
  else if (mod10 >= 2 && mod10 <= 4) suffix = t('yearsFew');
  return `${age} ${suffix}`;
}

function formatBirthday(birthday: string, locale: string): string {
  const parts = birthday.includes('-') ? birthday.split('-') : birthday.split('.');
  const [y, m, d] = birthday.includes('-')
    ? [parts[0], parts[1], parts[2]]
    : [parts[2], parts[1], parts[0]];
  const date = new Date(parseInt(y!, 10), parseInt(m!, 10) - 1, parseInt(d!, 10));
  return date.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function UserDetailPage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const users = useUnit($users);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return (
      <Wrapper>
        <BackBtn onClick={() => navigate(-1)}>
          <ChevronLeft />
          {t('back')}
        </BackBtn>
        <p>{t('userNotFound')}</p>
      </Wrapper>
    );
  }

  const deptKey = `departments.${user.department}`;
  const deptLabel = t(deptKey) !== deptKey ? t(deptKey) : user.department;

  return (
    <Wrapper>
      <TopBlock>
        <BackBtn onClick={() => navigate(-1)} aria-label={t('back')}>
          <ChevronLeft />
        </BackBtn>
        <Avatar src={user.avatarUrl || '/ava.png'} alt="" />
        <NameRow>
          <Name>{user.firstName} {user.lastName}</Name>
          {user.userTag && <Tag>{user.userTag}</Tag>}
        </NameRow>
        <Position>{deptLabel}</Position>
      </TopBlock>
      <BottomBlock>
        <FirstRow>
          <Row>
            <IconWrap><BirthdayIcon /></IconWrap>
            <Value>{formatBirthday(user.birthday, i18n.language)}</Value>
          </Row>
          <Age>{formatAge(user.birthday, t)}</Age>
        </FirstRow>
        <SecondRow>
          <IconWrap><PhoneIcon /></IconWrap>
          <PhoneLink href={`tel:${user.phone}`}>{user.phone}</PhoneLink>
        </SecondRow>
      </BottomBlock>
    </Wrapper>
  );
}
