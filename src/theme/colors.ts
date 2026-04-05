import { ThemeColors, ColorPalette } from './types';

export const Palettes: Record<
  ColorPalette,
  {
    primary: string;
    secondary: string;
    gradientStart: string;
    gradientEnd: string;
    primaryLight: string;
  }
> = {
  default: {
    primary: '#7C6FF7',
    primaryLight: 'rgba(124,111,247,0.18)',
    secondary: '#A855F7',
    gradientStart: '#6C63FF',
    gradientEnd: '#A855F7',
  },
  ocean: {
    primary: '#0EA5E9',
    primaryLight: 'rgba(14,165,233,0.18)',
    secondary: '#06B6D4',
    gradientStart: '#0EA5E9',
    gradientEnd: '#06B6D4',
  },
  forest: {
    primary: '#10B981',
    primaryLight: 'rgba(16,185,129,0.18)',
    secondary: '#059669',
    gradientStart: '#10B981',
    gradientEnd: '#059669',
  },
  sunset: {
    primary: '#F97316',
    primaryLight: 'rgba(249,115,22,0.18)',
    secondary: '#FB923C',
    gradientStart: '#F97316',
    gradientEnd: '#FB923C',
  },
};

const commonColors = {
  income: '#10B981',
  incomeLight: 'rgba(16,185,129,0.15)',
  expense: '#F43F5E',
  expenseLight: 'rgba(244,63,94,0.15)',
  savings: '#FBBF24',
  savingsLight: 'rgba(251,191,36,0.15)',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const darkThemeColors: Omit<
  ThemeColors,
  | keyof typeof commonColors
  | 'primary'
  | 'secondary'
  | 'gradientStart'
  | 'gradientEnd'
  | 'primaryLight'
> = {
  background: '#0A0E1A',
  surface: '#111827',
  surfaceElevated: '#1C2333',
  surfaceHighlight: '#232D3F',
  border: '#2A3448',
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textMuted: '#4B5563',
  textInverse: '#0A0E1A',
  overlay: 'rgba(0,0,0,0.65)',
  cardShadow: 'rgba(0,0,0,0.4)',
};

export const lightThemeColors: Omit<
  ThemeColors,
  | keyof typeof commonColors
  | 'primary'
  | 'secondary'
  | 'gradientStart'
  | 'gradientEnd'
  | 'primaryLight'
> = {
  background: '#F3F4F6',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceHighlight: '#F9FAFB',
  border: '#E5E7EB',
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#9CA3AF',
  textInverse: '#F9FAFB',
  overlay: 'rgba(0,0,0,0.3)',
  cardShadow: 'rgba(0,0,0,0.1)',
};

export const getThemeColors = (
  dark: boolean,
  palette: ColorPalette,
): ThemeColors => {
  const base = dark ? darkThemeColors : lightThemeColors;
  const p = Palettes[palette];

  return {
    ...commonColors,
    ...base,
    ...p,
  } as ThemeColors;
};
