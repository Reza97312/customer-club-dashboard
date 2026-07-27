export enum RecentActivitiesTypeEnum {
  BOTH = "BOTH",
  COIN = "COIN",
  SCORE = "SCORE",
  SPENTCOIN = "SPENTCOIN",
  TRANSFERCOIN = "TRANSFERCOIN",
}

export interface RecentActivityItem {
  id: string;
  type: RecentActivitiesTypeEnum | string;
  taskName?: string;
  taskTitle: string;
  taskDescription: string;
  scoreAmount?: number;
  coinAmount?: number;
  createdAt: string;
}

export interface RecentActivitiesResponse {
  success: boolean;
  result: RecentActivityItem[];
  total: { count: number }[];
}

export interface RecentActivitiesParams {
  offset?: number;
  size?: number;
  type?: RecentActivitiesTypeEnum;
  userVitrinId?: string;
}
