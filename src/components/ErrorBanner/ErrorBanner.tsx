import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Banner = styled.div<{ $variant: 'error' | 'loading' }>`
  background: ${(p) =>
    p.$variant === 'error' ? p.theme.colors.errorPrimary : p.theme.colors.activePrimary};
  color: ${(p) => p.theme.colors.textOnError};
  padding: 8px 24px;
  font: ${(p) => p.theme.typography.captionMedium};
  text-align: left;
`;

interface ErrorBannerProps {
  variant: 'error' | 'loading';
}

export function ErrorBanner({ variant }: ErrorBannerProps) {
  const { t } = useTranslation();
  const text = variant === 'error' ? t('offlineError') : t('bannerLoading');
  return <Banner $variant={variant}>{text}</Banner>;
}
