import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid ${(p) => p.theme.colors.bgSecondary};
`;

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    rgba(243, 243, 246, 1) 0%,
    rgba(250, 250, 250, 1) 100%
  );
  flex-shrink: 0;
`;

const Line1 = styled.div`
  width: 144px;
  height: 16px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    rgba(243, 243, 246, 1) 0%,
    rgba(250, 250, 250, 1) 100%
  );
  margin-bottom: 8px;
`;

const Line2 = styled.div`
  width: 80px;
  height: 12px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    rgba(243, 243, 246, 1) 0%,
    rgba(250, 250, 250, 1) 100%
  );
`;

export function SkeletonCard() {
  return (
    <Card>
      <Avatar />
      <div>
        <Line1 />
        <Line2 />
      </div>
    </Card>
  );
}
