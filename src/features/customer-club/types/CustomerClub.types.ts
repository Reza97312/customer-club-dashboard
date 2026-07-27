export interface VitrinListItem {
  id: number;
  role: string;
  status: string;
  companyName: string | null;
}

export interface CustomerClubSummary {
  numberTasksCompleted: number;
  totalScoreMonthly: number;
  totalCoinMonthly?: number;
}
