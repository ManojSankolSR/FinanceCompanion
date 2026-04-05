import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { FontSizes, FontWeights } from '../../constants/typography';
import { useAppSelector } from '../../app/hooks';
import { useTransactions } from '../../hooks/useTransactions';
import { getCategoryById } from '../../constants/categories';
import { CategoryPicker } from '../../components/common/CategoryPicker';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { TransactionTypeTabs } from './components/TransactionTypeTabs';
import {
  AddTransactionScreenNavigationProp,
  AddTransactionScreenRouteProp,
} from '../../navigation/types';
import { formatCurrency } from '../../utils/currency';
import { useTheme } from '../../theme/useTheme';
import { useStyles } from '../../theme/useStyles';
import { Theme } from '../../theme/types';

export default function AddTransactionScreen() {
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const navigation = useNavigation<AddTransactionScreenNavigationProp>();
  const route = useRoute<AddTransactionScreenRouteProp>();
  const transactionId = route.params?.transactionId;
  const isEditing = !!transactionId;

  const { createTransaction, editTransaction } = useTransactions();
  const currencySymbol = useAppSelector(s => s.ui.currencySymbol);
  const existingTransaction = useAppSelector(s =>
    s.transactions.items.find(t => t.id === transactionId),
  );

  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('food');
  const [categoryIcon, setCategoryIcon] = useState('food-fork-drink');
  const [categoryColor, setCategoryColor] = useState('#F97316');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [amountError, setAmountError] = useState('');

  useEffect(() => {
    if (existingTransaction) {
      setType(existingTransaction.type);
      setAmount(existingTransaction.amount.toString());
      setCategoryId(existingTransaction.category);
      setCategoryIcon(existingTransaction.categoryIcon);
      setCategoryColor(existingTransaction.categoryColor);
      setDate(new Date(existingTransaction.date));
      setNotes(existingTransaction.notes || '');
    }
  }, [existingTransaction]);

  const handleAmountChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) return;
    setAmount(cleaned);
    setAmountError('');
  };

  const handleSave = () => {
    const numericAmount = parseFloat(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setAmountError('Please enter a valid amount');
      return;
    }

    const data = {
      amount: numericAmount,
      type,
      category: categoryId,
      categoryIcon,
      categoryColor,
      date: date.toISOString(),
      notes: notes.trim(),
      goalId: '',
    };

    if (isEditing && transactionId) {
      editTransaction(transactionId, data);
    } else {
      createTransaction(data);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Icon name="close" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditing ? 'Edit Transaction' : 'New Transaction'}
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {}
            <View style={styles.amountSection}>
              <Text style={styles.amountLabel}>How much?</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencyPrefix}>{currencySymbol}</Text>
                <TextInput
                  style={[
                    styles.amountInput,
                    amountError ? { color: theme.colors.expense } : {},
                  ]}
                  value={amount}
                  onChangeText={handleAmountChange}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  placeholderTextColor={theme.colors.textMuted}
                  autoFocus={!isEditing}
                />
              </View>
              {amountError ? (
                <Text style={styles.errorText}>{amountError}</Text>
              ) : null}
            </View>

            <View style={styles.card}>
              <TransactionTypeTabs
                type={type}
                setType={setType}
                onTypeChange={newType => {
                  setType(newType);
                }}
              />

              {}
              <TouchableOpacity
                style={styles.formItem}
                onPress={() => setShowCategoryPicker(true)}
              >
                <View style={styles.formIconContainer}>
                  <View
                    style={[
                      styles.categoryIconCircle,
                      { backgroundColor: `${categoryColor}22` },
                    ]}
                  >
                    <Icon name={categoryIcon} size={22} color={categoryColor} />
                  </View>
                </View>
                <View style={styles.formContent}>
                  <Text style={styles.formLabel}>Category</Text>
                  <Text style={styles.formValue}>
                    {categoryId.charAt(0).toUpperCase() +
                      categoryId.slice(1).replace(/_/g, ' ')}
                  </Text>
                </View>
                <Icon
                  name="chevron-right"
                  size={24}
                  color={theme.colors.textMuted}
                />
              </TouchableOpacity>

              <View style={styles.divider} />

              {}
              <TouchableOpacity
                style={styles.formItem}
                onPress={() => setShowDatePicker(true)}
              >
                <View style={styles.formIconContainer}>
                  <View style={styles.iconCircle}>
                    <Icon
                      name="calendar"
                      size={22}
                      color={theme.colors.primary}
                    />
                  </View>
                </View>
                <View style={styles.formContent}>
                  <Text style={styles.formLabel}>Date</Text>
                  <Text style={styles.formValue}>
                    {date.toLocaleDateString()}
                  </Text>
                </View>
                <Icon
                  name="chevron-right"
                  size={24}
                  color={theme.colors.textMuted}
                />
              </TouchableOpacity>

              <View style={styles.divider} />

              {}
              <View style={styles.formItem}>
                <View style={styles.formIconContainer}>
                  <View style={styles.iconCircle}>
                    <Icon
                      name="text-subject"
                      size={22}
                      color={theme.colors.primary}
                    />
                  </View>
                </View>
                <View style={styles.formContent}>
                  <Text style={styles.formLabel}>Notes</Text>
                  <TextInput
                    style={styles.notesInput}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="What was this for?"
                    placeholderTextColor={theme.colors.textMuted}
                    multiline
                  />
                </View>
              </View>
            </View>

            <PrimaryButton
              label={isEditing ? 'Update Transaction' : 'Save Transaction'}
              onPress={handleSave}
              style={styles.saveBtn}
            />
          </ScrollView>
        </KeyboardAvoidingView>

        <CategoryPicker
          visible={showCategoryPicker}
          selectedId={categoryId}
          type={type}
          onSelect={cat => {
            setCategoryId(cat.id);
            setCategoryIcon(cat.icon);
            setCategoryColor(cat.color);
            setShowCategoryPicker(false);
          }}
          onClose={() => setShowCategoryPicker(false)}
        />

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    safeArea: { flex: 1 },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    headerTitle: {
      fontSize: FontSizes.lg,
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textPrimary,
    },
    backBtn: {
      padding: 8,
      marginLeft: -8,
    },
    scroll: { flex: 1 },
    scrollContent: { padding: 20, paddingBottom: 40 },
    amountSection: {
      alignItems: 'center',
      paddingVertical: 32,
    },
    amountLabel: {
      fontSize: FontSizes.sm,
      color: theme.colors.textMuted,
      fontWeight: FontWeights.medium as '500',
      marginBottom: 12,
    },
    amountInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    currencyPrefix: {
      fontSize: FontSizes['3xl'],
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textPrimary,
      marginRight: 8,
    },
    amountInput: {
      fontSize: FontSizes['5xl'],
      fontWeight: FontWeights.bold as '800',
      color: theme.colors.textPrimary,
      padding: 0,
    },
    errorText: {
      color: theme.colors.expense,
      fontSize: FontSizes.xs,
      marginTop: 8,
      fontWeight: FontWeights.medium as '500',
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 24,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 32,
    },
    formItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
    },
    formIconContainer: {
      marginRight: 16,
    },
    iconCircle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.colors.surfaceElevated,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    categoryIconCircle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
    },
    formContent: {
      flex: 1,
    },
    formLabel: {
      fontSize: FontSizes.xs,
      color: theme.colors.textMuted,
      fontWeight: FontWeights.medium as '500',
      marginBottom: 4,
    },
    formValue: {
      fontSize: FontSizes.base,
      fontWeight: FontWeights.semibold as '600',
      color: theme.colors.textPrimary,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginLeft: 60,
    },
    notesInput: {
      fontSize: FontSizes.base,
      fontWeight: FontWeights.medium as '500',
      color: theme.colors.textPrimary,
      padding: 0,
      marginTop: 2,
    },
    saveBtn: {
      marginTop: 'auto',
    },
  });
}
