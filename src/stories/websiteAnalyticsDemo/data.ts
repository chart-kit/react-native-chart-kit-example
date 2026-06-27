export type AnalyticsTrendPoint = {
  currentWeek: number;
  day: string;
  previousWeek: number;
};

export type RealtimeMinutePoint = {
  minute: string;
  pointIndex: number;
  users: number;
};

export type RealtimeCountryRow = {
  country: string;
  users: number;
};

export const analyticsTrend: AnalyticsTrendPoint[] = [
  { day: "Mon", currentWeek: 7420, previousWeek: 10480 },
  { day: "Tue", currentWeek: 8160, previousWeek: 9680 },
  { day: "Wed", currentWeek: 7890, previousWeek: 11240 },
  { day: "Thu", currentWeek: 9250, previousWeek: 8940 },
  { day: "Fri", currentWeek: 10180, previousWeek: 8280 },
  { day: "Sat", currentWeek: 10860, previousWeek: 9360 },
  { day: "Sun", currentWeek: 11640, previousWeek: 8720 }
];

const realtimeCountryProfiles = [
  { country: "Canada", phase: 0, weight: 0.36 },
  { country: "United States", phase: 1.7, weight: 0.28 },
  { country: "Germany", phase: 3.2, weight: 0.2 },
  { country: "Brazil", phase: 4.8, weight: 0.16 }
];

const getRealtimeUsersAt = (index: number) => {
  const pattern = [
    0, 4, 38, 0, 12, 7, 56, 3, 0, 18, 41, 6, 2, 0, 27, 73, 11, 5, 0, 1,
    34, 9, 48, 0, 16, 2, 0, 62, 8, 25, 0, 4, 31, 52, 6, 0, 14, 46, 2, 0
  ];
  const base = pattern[index % pattern.length] ?? 0;
  const pulse = index % 23 === 0 ? 20 : 0;

  return Math.max(0, base + pulse);
};

export const createRealtimeMinuteRows = (
  tick: number,
  length = 30
): RealtimeMinutePoint[] =>
  Array.from({ length }, (_, index) => {
    const minutesAgo = 29 - index;
    const pointIndex = tick + index;

    return {
      minute: minutesAgo === 0 ? "now" : `-${minutesAgo}m`,
      pointIndex,
      users: getRealtimeUsersAt(pointIndex)
    };
  });

export const createRealtimeCountryRows = (
  tick: number
): RealtimeCountryRow[] => {
  const totals = new Map(
    realtimeCountryProfiles.map((profile) => [profile.country, 0])
  );

  // Country rows represent the same rolling 30-minute window as the bar chart.
  createRealtimeMinuteRows(tick).forEach((minuteRow) => {
    const weightedRows = realtimeCountryProfiles.map((profile) => {
      const pulse =
        0.84 + Math.sin(minuteRow.pointIndex * 0.72 + profile.phase) * 0.18;

      return {
        country: profile.country,
        weight: Math.max(0.04, profile.weight * pulse)
      };
    });
    const totalWeight = weightedRows.reduce((sum, row) => sum + row.weight, 0);

    weightedRows.forEach((row) => {
      totals.set(
        row.country,
        (totals.get(row.country) ?? 0) +
          (minuteRow.users * row.weight) / totalWeight
      );
    });
  });

  return Array.from(totals.entries())
    .map(([country, users]) => ({
      country,
      users: Math.max(0, Math.round(users))
    }))
    .sort((a, b) => b.users - a.users);
};
