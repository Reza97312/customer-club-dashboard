export type LoginRequest = {
  phone: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};
