import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { User } from '../../types/user';

const Card = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 80px;
  padding: 4px 16px;
  text-decoration: none;
  color: inherit;
  background: ${(p) => p.theme.colors.bgPrimary};
  border-bottom: 1px solid ${(p) => p.theme.colors.bgSecondary};

  &:hover {
    background: ${(p) => p.theme.colors.bgSecondary};
  }
`;

const Avatar = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
  padding: 7px 0;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
`;

const Name = styled.span`
  font: ${(p) => p.theme.typography.headline};
  color: ${(p) => p.theme.colors.textPrimary};
`;

const Tag = styled.span`
  font: ${(p) => p.theme.typography.subhead};
  color: ${(p) => p.theme.colors.textTertiary};
`;

const Dept = styled.span`
  font: ${(p) => p.theme.typography.caption};
  color: ${(p) => p.theme.colors.textSecondary};
`;

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const { t } = useTranslation();
  const key = `departments.${user.department}`;
  const deptLabel = t(key) !== key ? t(key) : user.department;

  return (
    <Card to={`/user/${user.id}`}>
      <Avatar src={user.avatarUrl || '/ava.png'} alt="" />
      <Info>
        <NameRow>
          <Name>
            {user.firstName} {user.lastName}
          </Name>
          {user.userTag && <Tag>{user.userTag}</Tag>}
        </NameRow>
        <Dept>{deptLabel}</Dept>
      </Info>
    </Card>
  );
}
