import axios from "axios";
import { UserProfile, UserProfileApiResponse } from "../types/user.types";
import { useAuthStore } from "@/src/features/auth/store/auth.store";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const getUserProfileApi = async (): Promise<UserProfile> => {
  const accessToken = useAuthStore.getState().accessToken;

  const response = await apiClient.get<UserProfileApiResponse>("users/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.result;
};
