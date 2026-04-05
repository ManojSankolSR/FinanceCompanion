import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useAppSelector } from '../../../app/hooks';
import { selectWeeklyChartData } from '../../../features/transactions/transactionsSelectors';
import { FontSizes, FontWeights } from '../../../constants/typography';
import { GradientCard } from '../../../components/common/GradientCard';
import { formatCurrency } from '../../../utils/currency';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 80;

interface WeeklyBarChartProps {
  currencySymbol: string;
}

export const WeeklyBarChart: React.FC<WeeklyBarChartProps> = ({
  currencySymbol,
}) => {
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const { days, thisWeekData } = useAppSelector(selectWeeklyChartData);

  const maxVal = Math.max(...thisWeekData, 1);

  const barData = days.map((day, i) => ({
    value: thisWeekData[i],
    label: day,
    frontColor:
      thisWeekData[i] > 0 ? theme.colors.primary : theme.colors.border,
    gradientColor: theme.colors.secondary,
    topLabelComponent:
      thisWeekData[i] > maxVal * 0.8
        ? () => (
            <Text style={styles.topLabel}>
              {formatCurrency(thisWeekData[i], currencySymbol, true)}
            </Text>
          )
        : undefined,
  }));

  const totalThisWeek = thisWeekData.reduce((s, v) => s + v, 0);

  return (
    <GradientCard style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.weekTotal}>
            {formatCurrency(totalThisWeek, currencySymbol, true)}
          </Text>
          <Text style={styles.weekLabel}>Total spent this week</Text>
        </View>
      </View>
      {totalThisWeek === 0 ? (
        <View style={styles.emptyChart}>
          <Text style={styles.emptyText}>No expenses this week</Text>
        </View>
      ) : (
        <BarChart
          data={barData}
          width={CHART_WIDTH}
          height={140}
          barWidth={28}
          spacing={12}
          roundedTop
          roundedBottom={false}
          hideRules
          hideAxesAndRules
          xAxisThickness={0}
          yAxisThickness={0}
          showGradient
          gradientColor={theme.colors.secondary}
          noOfSections={4}
          maxValue={maxVal * 1.2}
          isAnimated
          animationDuration={800}
          labelWidth={32}
          xAxisLabelTextStyle={styles.xLabel}
          renderTooltip={(item: any) => (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>
                {formatCurrency(item.value, currencySymbol, true)}
              </Text>
            </View>
          )}
        />
      )}
    </GradientCard>
  );
};

function getStyles(theme: Theme) {
  return StyleSheet.create({
    card: { paddingBottom: 8 },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    weekTotal: {
      fontSize: FontSizes.xl,
      fontWeight: FontWeights.extrabold as '800',
      color: theme.colors.textPrimary,
    },
    weekLabel: {
      fontSize: FontSizes.xs,
      color: theme.colors.textMuted,
      marginTop: 2,
    },
    topLabel: {
      fontSize: 9,
      color: theme.colors.secondary,
      fontWeight: FontWeights.semibold as '600',
    },
    xLabel: {
      color: theme.colors.textMuted,
      fontSize: 11,
      fontWeight: FontWeights.medium as '500',
    },
    tooltip: {
      backgroundColor: theme.colors.surfaceHighlight,
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    tooltipText: {
      fontSize: 10,
      color: theme.colors.textPrimary,
      fontWeight: FontWeights.semibold as '600',
    },
    emptyChart: {
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      color: theme.colors.textMuted,
      fontSize: FontSizes.sm,
    },
  });
}
