import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Theme, ThemeMode, ColorPalette } from '../../../theme/types';
import { useStyles } from '../../../theme/useStyles';
import { useTheme } from '../../../theme/useTheme';
import { GradientCard } from '../../../components/common/GradientCard';

const THEME_MODES: { mode: ThemeMode; label: string; icon: string }[] = [
  { mode: 'light', label: 'Light', icon: 'white-balance-sunny' },
  { mode: 'dark', label: 'Dark', icon: 'moon-waning-crescent' },
  { mode: 'system', label: 'System', icon: 'laptop' },
];

const PALETTES: { id: ColorPalette; name: string; color: string }[] = [
  { id: 'default', name: 'Default', color: '#7C6FF7' },
  { id: 'ocean', name: 'Ocean', color: '#0EA5E9' },
  { id: 'forest', name: 'Forest', color: '#10B981' },
  { id: 'sunset', name: 'Sunset', color: '#F97316' },
];

interface AppearanceSectionProps {
  currentThemeMode: ThemeMode;
  currentColorPalette: ColorPalette;
  onThemeChange: (mode: ThemeMode) => void;
  onPaletteChange: (palette: ColorPalette) => void;
}

export function AppearanceSection({
  currentThemeMode,
  currentColorPalette,
  onThemeChange,
  onPaletteChange,
}: AppearanceSectionProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>APPEARANCE</Text>
      <GradientCard style={styles.settingsGroup}>
        {}
        <View style={styles.themeSelector}>
          {THEME_MODES.map(m => (
            <TouchableOpacity
              key={m.mode}
              onPress={() => onThemeChange(m.mode)}
              style={[
                styles.themeOption,
                currentThemeMode === m.mode && styles.themeOptionActive,
              ]}
            >
              <Icon
                name={m.icon}
                size={20}
                color={
                  currentThemeMode === m.mode
                    ? theme.colors.primary
                    : theme.colors.textMuted
                }
              />
              <Text
                style={[
                  styles.themeOptionLabel,
                  currentThemeMode === m.mode && styles.themeOptionLabelActive,
                ]}
              >
                {m.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.settingSeparator} />

        {}
        <View style={styles.paletteContainer}>
          <Text style={styles.settingLabel}>Accent Color</Text>
          <View style={styles.paletteList}>
            {PALETTES.map(p => (
              <TouchableOpacity
                key={p.id}
                onPress={() => onPaletteChange(p.id)}
                style={[
                  styles.paletteOption,
                  { backgroundColor: p.color },
                  currentColorPalette === p.id && styles.paletteOptionActive,
                ]}
              >
                {currentColorPalette === p.id && (
                  <Icon name="check" size={16} color="#FFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </GradientCard>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: { marginBottom: 12 },
    sectionLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.textMuted,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      paddingHorizontal: 20,
      marginBottom: 10,
      marginTop: 20,
    },
    settingsGroup: { marginHorizontal: 20, padding: 0, overflow: 'hidden' },
    settingLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.textPrimary,
    },
    settingSeparator: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginHorizontal: 16,
    },

    themeSelector: {
      flexDirection: 'row',
      padding: 12,
      gap: 8,
    },
    themeOption: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 12,
      gap: 6,
      backgroundColor: theme.colors.surfaceHighlight,
    },
    themeOptionActive: {
      backgroundColor: theme.colors.primaryLight,
    },
    themeOptionLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textMuted,
    },
    themeOptionLabelActive: {
      color: theme.colors.primary,
    },

    paletteContainer: {
      padding: 16,
    },
    paletteList: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 12,
    },
    paletteOption: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    paletteOptionActive: {
      borderWidth: 3,
      borderColor: theme.colors.white,
    },
  });
}
