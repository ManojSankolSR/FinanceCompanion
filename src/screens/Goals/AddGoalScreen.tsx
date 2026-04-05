import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addMonths, endOfMonth, startOfMonth } from 'date-fns';

import { useAppSelector } from '../../app/hooks';
import { useGoals } from '../../hooks/useGoals';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import {
  AddGoalScreenNavigationProp,
  AddGoalScreenRouteProp,
} from '../../navigation/types';
import { AddGoalHeader } from './components/AddGoalHeader';
import { GoalPreview } from './components/GoalPreview';
import { GoalFormInfoBox } from './components/GoalFormInfoBox';
import { AddGoalForm } from './components/AddGoalForm';
import { useTheme } from '../../theme/useTheme';
import { useStyles } from '../../theme/useStyles';
import { Theme } from '../../theme/types';

export default function AddGoalScreen() {
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const navigation = useNavigation<AddGoalScreenNavigationProp>();
  const route = useRoute<AddGoalScreenRouteProp>();
  const goalId = route.params?.goalId;
  const isEditing = !!goalId;

  const { createGoal, editGoal } = useGoals();
  const existingGoal = useAppSelector(s =>
    s.goals.items.find(g => g.id === goalId),
  );
  const currencySymbol = useAppSelector(s => s.ui.currencySymbol);

  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('🎯');
  const [targetAmount, setTargetAmount] = useState('');
  const [startDate] = useState(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState(endOfMonth(addMonths(new Date(), 1)));
  const [titleError, setTitleError] = useState('');
  const [amountError, setAmountError] = useState('');

  useEffect(() => {
    if (existingGoal) {
      setTitle(existingGoal.title);
      setEmoji(existingGoal.emoji);
      setTargetAmount(existingGoal.targetAmount.toString());
      setEndDate(new Date(existingGoal.endDate));
    }
  }, [existingGoal]);

  const handleSave = () => {
    let valid = true;
    if (!title.trim()) {
      setTitleError('Please enter a goal name');
      valid = false;
    }
    const amount = parseFloat(targetAmount);
    if (!targetAmount || isNaN(amount) || amount <= 0) {
      setAmountError('Please enter a valid target amount');
      valid = false;
    }
    if (!valid) {
      return;
    }

    const data = {
      title: title.trim(),
      emoji,
      targetAmount: amount,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      isActive: true,
    };

    if (isEditing && goalId) {
      editGoal(goalId, data);
    } else {
      createGoal(data);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <AddGoalHeader
            isEditing={isEditing}
            onClose={() => navigation.goBack()}
          />

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <GoalPreview
              title={title || 'New Goal'}
              emoji={emoji}
              targetAmount={parseFloat(targetAmount) || 0}
              currencySymbol={currencySymbol}
              endDate={endDate}
            />

            <GoalFormInfoBox />

            <AddGoalForm
              title={title}
              setTitle={setTitle}
              titleError={titleError}
              targetAmount={targetAmount}
              setTargetAmount={setTargetAmount}
              amountError={amountError}
              emoji={emoji}
              setEmoji={setEmoji}
              endDate={endDate}
              setEndDate={setEndDate}
              currencySymbol={currencySymbol}
            />

            <PrimaryButton
              label={isEditing ? 'Update Goal' : 'Launch Goal'}
              onPress={handleSave}
              style={styles.saveBtn}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    safeArea: { flex: 1 },
    keyboardView: { flex: 1 },
    scroll: { flex: 1 },
    scrollContent: { padding: 20, paddingBottom: 40 },
    saveBtn: { marginTop: 20 },
  });
}
