import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontSizes } from '../../../constants/typography';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface TransactionSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function TransactionSearch({
  searchQuery,
  setSearchQuery,
}: TransactionSearchProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.searchContainer}>
      <Icon
        name="magnify"
        size={18}
        color={theme.colors.textMuted}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search by category or notes..."
        placeholderTextColor={theme.colors.textMuted}
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="search"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => setSearchQuery('')}>
          <Icon name="close-circle" size={18} color={theme.colors.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: 14,
      paddingHorizontal: 14,
      marginHorizontal: 20,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      height: 46,
    },
    searchIcon: { marginRight: 8 },
    searchInput: {
      flex: 1,
      color: theme.colors.textPrimary,
      fontSize: FontSizes.sm,
      height: 46,
    },
  });
}
