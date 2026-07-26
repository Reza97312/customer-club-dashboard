import axios from "axios";
import { LoginRequest, LoginResponse } from "../types/auth.types";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

interface ApiWrapper {
  success: boolean;
  result: LoginResponse;
}

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<ApiWrapper>("users/login", data);

  return response.data.result;
};
