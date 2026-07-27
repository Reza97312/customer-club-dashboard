import axios from "axios";
import { useAuthStore } from "@/src/features/auth/store/auth.store";
import {
  CustomerClubSummary,
  VitrinListItem,
} from "../types/CustomerClub.types";

const getApiClient = () => {
  const token = useAuthStore.getState().accessToken;
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getVitrinList = async (): Promise<VitrinListItem[]> => {
  const { data } = await getApiClient().get("users/vitrin/all-user");
  return data.result;
};

export const getPersonalSummary = async (): Promise<CustomerClubSummary> => {
  const { data } = await getApiClient().get("customer-club/summary");
  return data.result;
};

export const getVitrinSummary = async (
  vitrinId: number,
): Promise<CustomerClubSummary> => {
  const { data } = await getApiClient().get(
    `customer-club/summary-user-vitrin/${vitrinId}`,
  );
  return data.result;
};

export const getVitrinDetails = async (vitrinId: number) => {
  const { data } = await getApiClient().get(`users/vitrin/${vitrinId}`);
  return data.result;
};
