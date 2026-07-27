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

  const queryParams: RecentActivitiesParams = {
    offset: params.offset ?? 0,
    size: params.size ?? 10,
  };

  if (params.type) {
    queryParams.type = params.type;
  }

  let endpoint = "recent-activities";

  if (params.userVitrinId) {
    endpoint = `recent-activities/${params.userVitrinId}`;

    delete queryParams.userVitrinId;
  }

  const response = await apiClient.get<RecentActivitiesResponse>(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: queryParams,
  });

  return response.data;
};
