export const formatCompactUsers = (value: number) => {
  const rounded = Math.round(value);

  if (Math.abs(rounded) >= 1000) {
    return `${(rounded / 1000).toFixed(rounded >= 10000 ? 0 : 1)}k`;
  }

  return `${rounded}`;
};

export const formatWholeNumber = (value: number) =>
  Math.round(value).toLocaleString("en-US");

export const formatRealtimeAgeLabel = (minutesAgo: number) =>
  minutesAgo <= 0 ? "Now" : `${minutesAgo} min ago`;
