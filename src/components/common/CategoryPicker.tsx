import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontSizes, FontWeights } from '../../constants/typography';
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  Category,
} from '../../constants/categories';
import { useTheme } from '../../theme/useTheme';
import { useStyles } from '../../theme/useStyles';
import { Theme } from '../../theme/types';

interface CategoryPickerProps {
  visible: boolean;
  selectedId: string;
  type: 'income' | 'expense';
  onSelect: (category: Category) => void;
  onClose: () => void;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  visible,
  selectedId,
  type,
  onSelect,
  onClose,
}) => {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title}>Select Category</Text>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="close" size={22} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            keyExtractor={item => item.id}
            numColumns={3}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => {
              const isSelected = item.id === selectedId;
              return (
                <TouchableOpacity
                  style={[
                    styles.categoryItem,
                    isSelected && {
                      borderColor: item.color,
                      backgroundColor: `${item.color}22`,
                    },
                  ]}
                  onPress={() => onSelect(item)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: `${item.color}22` },
                    ]}
                  >
                    <Icon name={item.icon} size={24} color={item.color} />
                  </View>
                  <Text style={styles.categoryLabel} numberOfLines={2}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

function getStyles(theme: Theme) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'flex-end',
    },
    sheet: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      maxHeight: '75%',
    },
    handle: {
      width: 40,
      height: 4,
      backgroundColor: theme.colors.border,
      borderRadius: 2,
      alignSelf: 'center',
      marginTop: 12,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      fontSize: FontSizes.md,
      fontWeight: FontWeights.semibold as '600',
      color: theme.colors.textPrimary,
    },
    grid: {
      padding: 16,
      gap: 12,
    },
    categoryItem: {
      flex: 1,
      margin: 4,
      alignItems: 'center',
      padding: 12,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surfaceElevated,
    },
    iconCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    categoryLabel: {
      fontSize: FontSizes.xs,
      fontWeight: FontWeights.medium as '500',
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });
}
