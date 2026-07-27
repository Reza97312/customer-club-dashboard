import axios from "axios";
import { useAuthStore } from "@/src/features/auth/store/auth.store";
import {
  RecentActivitiesParams,
  RecentActivitiesResponse,
} from "../types/RecentActivities.types";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const getRecentActivitiesApi = async (
  params: RecentActivitiesParams,
): Promise<RecentActivitiesResponse> => {
  const accessToken = useAuthStore.getState().accessToken;

  const queryParams: Record<string, any> = {
    offset: params.offset ?? 0,
    size: params.size ?? 10,
  };

  if (params.type) {
    queryParams.type = params.type;
  }

  if (params.userVitrinId) {
    queryParams.userVitrinId = params.userVitrinId;
  }

  const response = await apiClient.get<RecentActivitiesResponse>(
    "recent-activities",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: queryParams,
    },
  );

  return response.data;
};
