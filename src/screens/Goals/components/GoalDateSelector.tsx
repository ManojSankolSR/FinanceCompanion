import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { FontSizes, FontWeights } from '../../../constants/typography';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface GoalDateSelectorProps {
  endDate: Date;
  setEndDate: (date: Date) => void;
}

export function GoalDateSelector({
  endDate,
  setEndDate,
}: GoalDateSelectorProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
      <View style={styles.fieldBlock}>
        <Text style={styles.fieldLabel}>Target Date</Text>
        <TouchableOpacity
          style={styles.dateBtn}
          onPress={() => setShowDatePicker(true)}
        >
          <Icon name="calendar" size={18} color={theme.colors.primary} />
          <Text style={styles.dateBtnText}>
            {endDate.toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
          <Icon name="chevron-right" size={18} color={theme.colors.textMuted} />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()}
          onChange={(_, selected) => {
            setShowDatePicker(false);
            if (selected) {
              setEndDate(selected);
            }
          }}
        />
      )}
    </>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    fieldBlock: {},
    fieldLabel: {
      fontSize: FontSizes.sm,
      color: theme.colors.textSecondary,
      fontWeight: FontWeights.semibold as '600',
      marginBottom: 8,
    },
    dateBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    dateBtnText: {
      flex: 1,
      color: theme.colors.textPrimary,
      fontSize: FontSizes.base,
    },
  });
}
