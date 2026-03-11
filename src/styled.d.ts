import 'styled-components';
import type { lightTheme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof lightTheme.colors;
    typography: typeof lightTheme.typography;
    radii: typeof lightTheme.radii;
  }
}
