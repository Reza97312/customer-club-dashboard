import axios from "axios";
import { LevelsResponse } from "../types/Levels.type";
import { useAuthStore } from "@/src/features/auth/store/auth.store";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const fetchLevels = async (token?: string): Promise<LevelsResponse> => {
  const activeToken = token || useAuthStore.getState().accessToken;

  const response = await apiClient.get<LevelsResponse>("levels", {
    headers: {
      ...(activeToken ? { Authorization: `Bearer ${activeToken}` } : {}),
    },
  });

  return response.data;
};
