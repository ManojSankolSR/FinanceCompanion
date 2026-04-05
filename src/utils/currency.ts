export const formatCurrency = (
  amount: number,
  symbol: string = '₹',
  compact: boolean = false,
): string => {
  if (compact) {
    if (amount >= 100000) {
      return `${symbol}${(amount / 100000).toFixed(1)}L`;
    }
    if (amount >= 1000) {
      return `${symbol}${(amount / 1000).toFixed(1)}K`;
    }
  }
  return `${symbol}${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

export const parseAmount = (value: string): number => {
  const num = parseFloat(value.replace(/[^0-9.]/g, ''));
  return isNaN(num) ? 0 : num;
};

const FALLBACK_RATES: Record<string, number> = {
  USD: 1.0,
  INR: 83.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.0,
};

export const getExchangeRate = async (
  from: string,
  to: string,
): Promise<number> => {
  if (from === to) return 1;
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    if (data && data.rates && data.rates[to]) {
      return data.rates[to];
    }
  } catch (error) {
    console.warn(`Failed to fetch live rate, using fallback. ${from} -> ${to}`);
  }

  const fromRate = FALLBACK_RATES[from] || 1;
  const toRate = FALLBACK_RATES[to] || 1;
  return toRate / fromRate;
};
