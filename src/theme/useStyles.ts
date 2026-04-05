import { useMemo } from 'react';
import { useTheme } from './useTheme';
import { Theme } from './types';

export const useStyles = <T extends Record<string, any>>(
  factory: (theme: Theme) => T,
): T => {
  const theme = useTheme();

  return useMemo(
    () => factory(theme),

    [theme.colors, theme.dark, theme.palette],
  );
};
