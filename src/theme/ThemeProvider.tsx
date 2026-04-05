import React, { createContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useAppSelector } from '../app/hooks';
import { getThemeColors } from './colors';
import { Theme } from './types';

export const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemScheme = useColorScheme();
  const themeMode = useAppSelector(state => state.ui.themeMode);
  const colorPalette = useAppSelector(state => state.ui.colorPalette);

  const theme = useMemo(() => {
    const isDark =
      themeMode === 'system' ? systemScheme === 'dark' : themeMode === 'dark';
    const colors = getThemeColors(isDark, colorPalette);

    return {
      dark: isDark,
      colors,
      mode: themeMode,
      palette: colorPalette,
    };
  }, [systemScheme, themeMode, colorPalette]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
