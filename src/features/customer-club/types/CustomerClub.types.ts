export enum EndUserRoleEnum {
  USER = "user",
  RETAILER = "retailer",
  WHOLESALER = "wholesaler",
  MARKETER = "marketer",
  PRODUCER = "producer",
  IMPORTER = "importer",
  MERCHANT = "merchant",
  DISTRIBUTOR = "distributor",
  BANK = "bank",
  GOVERNMENT = "government",
  INSTITUTE = "institute",
}

export interface VitrinListItem {
  id: number;
  role: EndUserRoleEnum | string;
  status: string;
  companyPhones?: string[] | null;
  companyName: string | null;
}

export interface CustomerClubSummary {
  numberTasksCompleted: number;
  totalScoreMonthly: number;
  totalCoinMonthly?: number | null;
}

export interface LocationItem {
  id?: number;
  name: string;
  locationType?: string;
}

export interface LevelFile {
  link?: string | null;
}

export interface LevelItem {
  id: number;
  name: string;
  scores: string | number;
  status?: boolean;
  file?: LevelFile | null;
}

export interface VitrinDetailUserProfile {
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  city?: LocationItem | null;
  country?: LocationItem | null;
  file?: { link?: string | null } | null;
  defaultRole?: string | null;
  role?: string | null;
  scores?: string | number | null;
}

export interface VitrinDetail {
  id: number;
  userId?: number;
  role?: EndUserRoleEnum | string | null;
  status?: string | null;
  companyName?: string | null;
  scores?: string | number | null;
  level?: LevelItem | null;
  logo?: { link?: string | null } | null;
  user?: VitrinDetailUserProfile | null;
  fieldOfActivity?: { name?: string | null } | null;
  citiesRow?: LocationItem[] | null;
}
