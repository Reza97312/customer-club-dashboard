"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchLevels } from "../services/Level.api";

export const useGetLevels = (token?: string) => {
  return useQuery({
    queryKey: ["levels"],
    queryFn: () => fetchLevels(token),
    staleTime: 1000 * 60 * 5,
  });
};
