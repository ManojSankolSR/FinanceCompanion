import { StyleSheet, TextStyle } from 'react-native';

export const FontSizes = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 34,
  '4xl': 42,
};

export const FontWeights: Record<string, TextStyle['fontWeight']> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

export const LineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
};

export const Typography = StyleSheet.create({
  displayLarge: {
    fontSize: FontSizes['4xl'],
    fontWeight: FontWeights.extrabold,
    letterSpacing: -0.5,
  },
  displayMedium: {
    fontSize: FontSizes['3xl'],
    fontWeight: FontWeights.bold,
    letterSpacing: -0.3,
  },
  displaySmall: {
    fontSize: FontSizes['2xl'],
    fontWeight: FontWeights.bold,
  },
  headingLarge: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  headingMedium: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  headingSmall: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
  },
  bodyLarge: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.base * LineHeights.normal,
  },
  bodyMedium: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.sm * LineHeights.normal,
  },
  bodySmall: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.xs * LineHeights.normal,
  },
  labelLarge: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    letterSpacing: 0.3,
  },
  labelMedium: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.semibold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  amount: {
    fontSize: FontSizes['3xl'],
    fontWeight: FontWeights.extrabold,
    letterSpacing: -1,
  },
  amountSmall: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    letterSpacing: -0.5,
  },
});
