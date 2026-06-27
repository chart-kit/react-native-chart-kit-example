export type MarketIndexPoint = {
  date: Date;
  dow: number;
  sp500: number;
};

export type LeadSourceDatum = {
  color: string;
  leads: number;
  source: string;
};

const historyLength = 192;
const dayInMs = 24 * 60 * 60 * 1000;
const marketEndDate = new Date(2026, 5, 19);

export const marketIndexHistory: MarketIndexPoint[] = Array.from(
  { length: historyLength },
  (_, index) => {
    const progress = index / (historyLength - 1);
    const date = new Date(
      marketEndDate.valueOf() - (historyLength - 1 - index) * dayInMs
    );
    const sp500 =
      100 +
      progress * 19.4 +
      Math.sin(index / 8.4) * 1.8 +
      Math.cos(index / 19.2) * 0.95 +
      Math.sin(index / 3.6) * 0.35;
    const dow =
      100 +
      progress * 13.2 +
      Math.cos(index / 9.6) * 1.3 +
      Math.sin(index / 22.4) * 0.72 +
      Math.cos(index / 4.8) * 0.28;

    return {
      date,
      dow: Number(dow.toFixed(2)),
      sp500: Number(sp500.toFixed(2))
    };
  }
);

export const leadSources: LeadSourceDatum[] = [
  { source: "Advisors", leads: 82, color: "#00d084" },
  { source: "Search", leads: 58, color: "#38bdf8" },
  { source: "Partners", leads: 45, color: "#f7c948" },
  { source: "Events", leads: 34, color: "#a78bfa" },
  { source: "Direct", leads: 29, color: "#ff4d5e" }
];
