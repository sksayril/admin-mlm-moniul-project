export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  joinDate: string;
  lastLogin: string;
}

export interface DepositRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  processedAt?: string;
  paymentMethod: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  processedAt?: string;
  withdrawalMethod: string;
  accountDetails: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AdminUser {
  subscription: {
    active: boolean;
  };
  tpin: {
    active: boolean;
  };
  incomeWallet: {
    balance: number;
    selfIncome: number;
    directIncome: number;
    matrixIncome: number;
    dailyTeamIncome: number;
    rankRewards: number;
    fxTradingIncome: number;
    lastUpdated: string;
  };
  tradingPackage: {
    purchased: boolean;
  };
  _id: string;
  name: string;
  email: string;
  role: string;
  referrals: any[];
  rank: string;
  teamSize: number;
  paymentDetails: any[];
  downline: any[];
  withdrawals: any[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  status: string;
  token: string;
  data: {
    admin: AdminUser;
  };
}