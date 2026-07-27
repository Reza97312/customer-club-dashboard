export interface UserCity {
  id: number;
  name: string;
  locationType: string;
}

export interface UserLevelFile {
  id: number;
  key: string;
  mimeType: string;
  size: string;
  link: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UserLevel {
  id: number;
  name: string;
  scores: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  file: UserLevelFile | null;
}

export interface UserCurrency {
  id: number;
  unit: string;
  name: string;
  symbol: string;
  slug?: string;
  currencyPrecision: number;
  priority: number;
  status: string;
  countryId: number | null;
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  birthDate: string;
  phone: string;
  email: string;
  gender: string;
  coins: string;
  scores: string;
  statusStore: string;
  subscriptionExpiresAt: string;
  city: UserCity | null;
  country: UserCity | null;
  level: UserLevel | null;
  defaultCurrency: UserCurrency | null;
  roles: string[];
  userType: string;
  defaultRole: string;
  trustLevel: string[];
}

export interface UserProfileApiResponse {
  success: boolean;
  result: UserProfile;
}
