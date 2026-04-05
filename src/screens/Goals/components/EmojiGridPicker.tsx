import React from 'react';
import { Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontSizes, FontWeights } from '../../../constants/typography';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

const EMOJIS = [
  '🎯',
  '🛡️',
  '✈️',
  '🏠',
  '🚗',
  '💍',
  '🎓',
  '💪',
  '📱',
  '💻',
  '🏋️',
  '🌴',
  '🎸',
  '📸',
  '🌟',
];

interface EmojiGridPickerProps {
  selectedEmoji: string;
  onSelectEmoji: (emoji: string) => void;
}

export function EmojiGridPicker({
  selectedEmoji,
  onSelectEmoji,
}: EmojiGridPickerProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <>
      <Text style={styles.sectionLabel}>Choose an Icon</Text>
      <FlatList
        data={EMOJIS}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.emojiList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelectEmoji(item)}
            style={[
              styles.emojiBtn,
              selectedEmoji === item && styles.emojiBtnActive,
            ]}
          >
            <Text style={styles.emojiChar}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    sectionLabel: {
      fontSize: FontSizes.sm,
      color: theme.colors.textMuted,
      fontWeight: FontWeights.semibold as '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 12,
    },
    emojiList: { gap: 8, paddingBottom: 4 },
    emojiBtn: {
      width: 52,
      height: 52,
      borderRadius: 16,
      backgroundColor: theme.colors.surfaceElevated,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: theme.colors.border,
    },
    emojiBtnActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primaryLight,
    },
    emojiChar: { fontSize: 26 },
  });
}
