import axios from "axios";
import { LevelsResponse } from "../types/Levels.type";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchLevels = async (token?: string): Promise<LevelsResponse> => {
  const response = await axios.get<LevelsResponse>(`${BASE_URL}levels`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
