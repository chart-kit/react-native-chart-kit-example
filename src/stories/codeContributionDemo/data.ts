export type RepoContributionDay = {
  date: string;
  count: number;
  commits: number;
  pullRequests: number;
  reviews: number;
};

export type RepoLanguageDatum = {
  color: string;
  files: number;
  language: string;
  percent: number;
};

export type RepoStat = {
  label: string;
  trend: string;
  value: string;
};

const dayInMs = 24 * 60 * 60 * 1000;
const contributionEnd = new Date(2026, 5, 22);

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const shiftDate = (date: Date, days: number) =>
  new Date(date.valueOf() + days * dayInMs);

export const repoContributionEndDate = formatDateKey(contributionEnd);
export const repoContributionNumDays = 371;

export const repoContributions: RepoContributionDay[] = Array.from(
  { length: repoContributionNumDays },
  (_, index) => {
    const date = shiftDate(
      contributionEnd,
      -(repoContributionNumDays - 1 - index)
    );
    const weekday = date.getDay();
    const week = Math.floor(index / 7);
    const releasePulse =
      (week > 10 && week < 15) || (week > 34 && week < 39) ? 12 : 0;
    const docsPulse = index % 41 > 33 ? 5 : 0;
    const weekdayBias = weekday === 0 || weekday === 6 ? -6 : 3;
    const cadence = (index * 11 + weekday * 7 + week * 3) % 19;
    const count = Math.max(0, cadence + releasePulse + docsPulse + weekdayBias);

    return {
      date: formatDateKey(date),
      count,
      commits: Math.max(0, Math.round(count * 0.72)),
      pullRequests: Math.max(0, Math.round(count * 0.16)),
      reviews: Math.max(0, Math.round(count * 0.28))
    };
  }
);

export const repoStats: RepoStat[] = [
  { label: "Stars", value: "18.4k", trend: "+412" },
  { label: "Forks", value: "2.1k", trend: "+38" },
  { label: "Open PRs", value: "24", trend: "7 ready" },
  { label: "Commits", value: "4,872", trend: "main" }
];

export const repoLanguages: RepoLanguageDatum[] = [
  { language: "TypeScript", percent: 48.6, files: 184, color: "#3178c6" },
  { language: "Swift", percent: 18.8, files: 38, color: "#f05138" },
  { language: "Markdown", percent: 12.4, files: 64, color: "#64748b" },
  { language: "CSS", percent: 8.7, files: 21, color: "#8b5cf6" },
  { language: "JSON", percent: 6.5, files: 42, color: "#14b8a6" },
  { language: "Shell", percent: 5, files: 15, color: "#f59e0b" }
];

export const repoTabs = ["Code", "Pull requests", "Actions", "Insights"];
