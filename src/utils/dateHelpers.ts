import { format, isToday, isYesterday, parseISO } from 'date-fns';

export const formatDate = (dateStr: string): string => {
  const date = parseISO(dateStr);
  if (isToday(date)) {
    return 'Today';
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  return format(date, 'dd MMM yyyy');
};

export const formatDateShort = (dateStr: string): string => {
  return format(parseISO(dateStr), 'dd MMM');
};

export const formatDateTime = (dateStr: string): string => {
  return format(parseISO(dateStr), 'dd MMM yyyy, hh:mm a');
};

export const formatMonthYear = (dateStr: string): string => {
  return format(parseISO(dateStr), 'MMMM yyyy');
};

export const groupTransactionsByDate = <T extends { date: string }>(
  items: T[],
): { label: string; data: T[] }[] => {
  const groups: Record<string, T[]> = {};
  items.forEach(item => {
    const label = formatDate(item.date);
    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(item);
  });
  return Object.entries(groups).map(([label, data]) => ({ label, data }));
};

export const getDaysLeft = (endDateStr: string): number => {
  const end = parseISO(endDateStr);
  const now = new Date();
  const diff = Math.ceil(
    (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  return Math.max(0, diff);
};

export const toISOString = (date: Date): string => date.toISOString();
