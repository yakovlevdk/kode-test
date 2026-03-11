const typography = {
  titleBold: '600 24px/1.17 Inter, sans-serif',
  headline: '500 16px/1.25 Inter, sans-serif',
  subhead: '500 14px/1.29 Inter, sans-serif',
  caption: '400 13px/1.23 Inter, sans-serif',
  captionMedium: '500 13px/1.23 Inter, sans-serif',
  textMedium: '500 15px Inter, sans-serif',
  textSemibold: '600 15px Inter, sans-serif',
} as const;

const radii = { search: '16px' } as const;

export const lightTheme = {
  colors: {
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F3F3F6',
    textPrimary: '#050510',
    textSecondary: '#55555C',
    textTertiary: '#97979B',
    contentSecondary: '#C3C3C6',
    activePrimary: '#6534FF',
    errorPrimary: '#F44336',
    textOnError: '#FFFFFF',
  },
  typography,
  radii,
};

export const darkTheme = {
  colors: {
    bgPrimary: '#1C1C1E',
    bgSecondary: '#2C2C2E',
    textPrimary: '#FFFFFF',
    textSecondary: '#EBEBF5',
    textTertiary: '#8E8E93',
    contentSecondary: '#48484A',
    activePrimary: '#6534FF',
    errorPrimary: '#FF453A',
    textOnError: '#FFFFFF',
  },
  typography,
  radii,
};

export const theme = lightTheme;
