import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import { Theme } from './types';
import { useColorScheme } from 'react-native';
import { useAppSelector } from '../app/hooks';
import { getThemeColors } from './colors';

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);

  if (context) {
    return context;
  }

  const systemScheme = useColorScheme();

  const themeMode = useAppSelector(state => state.ui.themeMode);

  const colorPalette = useAppSelector(state => state.ui.colorPalette);

  const isDark =
    themeMode === 'system' ? systemScheme === 'dark' : themeMode === 'dark';
  const colors = getThemeColors(isDark, colorPalette);

  return {
    dark: isDark,
    colors,
    mode: themeMode,
    palette: colorPalette,
  };
};
