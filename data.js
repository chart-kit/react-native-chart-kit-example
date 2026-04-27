// Mock data object used for LineChart and BarChart

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [50, 20, 2, 86, 71, 100],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`
    },
    {
      data: [20, 10, 4, 56, 87, 90],
      color: (opacity = 1) => `rgba(32, 214, 197, ${opacity})`
    },
    {
      data: [30, 90, 67, 54, 10, 2],
      color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`
    }
  ],
  legend: ["Rainy Days", "Sunny Days", "Snowy Days"]
};

const barData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [-50, -20, -2, 86, 71, 100]
    }
  ]
};

// Mock data object used for Contribution Graph

const contributionData = [
  { date: "2016-01-02", count: 1 },
  { date: "2016-01-03", count: 2 },
  { date: "2016-01-04", count: 3 },
  { date: "2016-01-05", count: 4 },
  { date: "2016-01-06", count: 5 },
  { date: "2016-01-30", count: 2 },
  { date: "2016-01-31", count: 3 },
  { date: "2016-03-01", count: 2 },
  { date: "2016-04-02", count: 4 },
  { date: "2016-03-05", count: 2 },
  { date: "2016-02-29", count: 4 }
];

// Mock data object for Pie Chart

const pieChartData = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#39434d",
    legendFontSize: 12
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#f25f5c",
    legendFontColor: "#39434d",
    legendFontSize: 12
  },
  {
    name: "Beijing",
    population: 527612,
    color: "#ffe066",
    legendFontColor: "#39434d",
    legendFontSize: 12
  },
  {
    name: "New York",
    population: 8538000,
    color: "#70c1b3",
    legendFontColor: "#39434d",
    legendFontSize: 12
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "#247ba0",
    legendFontColor: "#39434d",
    legendFontSize: 12
  }
];

// Mock data object for Progress

const progressChartData = {
  labels: ["Swim", "Bike", "Run"],
  data: [0.4, 0.6, 0.8]
};

const stackedBarGraphData = {
  labels: ["Q1", "Q2", "Q3"],
  legend: ["L1", "L2", "L3"],
  data: [
    [60, 60, 60],
    [30, 30, 60],
    [40, 70, 20]
  ],
  barColors: ["#4f46e5", "#06b6d4", "#22c55e"]
};

export {
  barData,
  contributionData,
  data,
  pieChartData,
  progressChartData,
  stackedBarGraphData
};
