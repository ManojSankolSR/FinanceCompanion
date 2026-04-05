export interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceHighlight: string;
  border: string;

  primary: string;
  primaryLight: string;
  secondary: string;

  gradientStart: string;
  gradientEnd: string;

  income: string;
  incomeLight: string;
  expense: string;
  expenseLight: string;
  savings: string;
  savingsLight: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  white: string;
  black: string;
  transparent: string;
  overlay: string;
  cardShadow: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorPalette = 'default' | 'ocean' | 'forest' | 'sunset';

export interface Theme {
  mode: ThemeMode;
  dark: boolean;
  colors: ThemeColors;
  palette: ColorPalette;
}
