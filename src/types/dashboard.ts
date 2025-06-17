export interface DashboardStats {
  userStats: {
    totalUsers: number;
    newUsers: number;
    activeSubscriptions: number;
    activeTpins: number;
    pendingSubscriptions: number;
    pendingTpins: number;
  };
  financialStats: {
    totalRevenue: number;
    revenueInPeriod: number;
    transactionsInPeriod: number;
    totalWithdrawals: {
      pending: {
        totalAmount: number;
        count: number;
      };
      approved: {
        totalAmount: number;
        count: number;
      };
      rejected: {
        totalAmount: number;
        count: number;
      };
    };
  };
  mlmStats: {
    activeReferrers: number;
    totalTeamSize: number;
    totalDirectIncome: number;
    totalMatrixIncome: number;
    totalSelfIncome: number;
    totalRankRewards: number;
    activeTradingPackages: number;
    rankDistribution: Array<{
      _id: string;
      count: number;
    }>;
  };
  chartData: {
    labels: string[];
    datasets: {
      newUsers: number[];
      revenue: number[];
      withdrawals: number[];
    };
  };
}

export interface DashboardResponse {
  status: string;
  message?: string;
  data: DashboardStats;
}
