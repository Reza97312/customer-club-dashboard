import axios from "axios";
import { LevelsResponse } from "../types/Levels.type";
import { useAuthStore } from "@/src/features/auth/store/auth.store";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchLevels = async (token?: string): Promise<LevelsResponse> => {
  const activeToken = token || useAuthStore.getState().accessToken;

  const response = await axios.get<LevelsResponse>(`${BASE_URL}levels`, {
    headers: {
      ...(activeToken ? { Authorization: `Bearer ${activeToken}` } : {}),
    },
  });
  return response.data;
};
