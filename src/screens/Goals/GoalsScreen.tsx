import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { FontSizes, FontWeights } from '../../constants/typography';
import { useAppSelector } from '../../app/hooks';
import { selectAllGoals } from '../../features/goals/goalsSelectors';
import { EmptyState } from '../../components/common/EmptyState';
import { useGoals } from '../../hooks/useGoals';
import { GoalsStackParamList } from '../../navigation/types';
import { SerializedGoal } from '../../features/goals/goalsSlice';
import { GoalCard } from './components/GoalCard';
import { useTheme } from '../../theme/useTheme';
import { useStyles } from '../../theme/useStyles';
import { Theme } from '../../theme/types';

type Nav = StackNavigationProp<GoalsStackParamList, 'Goals'>;

export default function GoalsScreen() {
  const navigation = useNavigation<Nav>();
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const goals = useAppSelector(selectAllGoals);
  const { removeGoal } = useGoals();

  const handleDelete = (goal: SerializedGoal) => {
    Alert.alert('Delete Goal', `Remove "${goal.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => removeGoal(goal.id),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Goals</Text>
            <Text style={styles.headerSubtitle}>
              {goals.filter(g => g.isActive).length} active
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate('AddGoal')}
          >
            <LinearGradient
              colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
              style={styles.addBtnGradient}
            >
              <Icon name="plus" size={20} color={theme.colors.white} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {goals.length === 0 ? (
          <EmptyState
            icon="bullseye-arrow"
            title="No goals yet"
            subtitle="Set a savings goal and track your progress"
            style={styles.empty}
          />
        ) : (
          <FlatList
            data={goals}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <GoalCard item={item} onDelete={handleDelete} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
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
      fontSize: FontSizes.xl,
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textPrimary,
    },
    headerSubtitle: {
      fontSize: FontSizes.sm,
      color: theme.colors.textMuted,
      fontWeight: FontWeights.medium as '500',
    },
    addBtn: {
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 4,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    addBtnGradient: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    listContent: { padding: 20, paddingBottom: 100 },
    empty: { marginTop: 60 },
  });
}
