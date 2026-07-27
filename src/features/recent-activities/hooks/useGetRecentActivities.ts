import { useQuery } from "@tanstack/react-query";
import { getRecentActivitiesApi } from "../services/RecentActivities.api";
import { RecentActivitiesTypeEnum } from "../types/RecentActivities.types";
import { useAuthStore } from "@/src/features/auth/store/auth.store";

// export const useGetRecentActivities = (
//   type: RecentActivitiesTypeEnum = RecentActivitiesTypeEnum.BOTH,
//   userVitrinId?: string,
// ) => {
//   const accessToken = useAuthStore((state) => state.accessToken);

//   return useQuery({
//     queryKey: ["recent-activities", type, userVitrinId],
//     queryFn: () =>
//       getRecentActivitiesApi({ type, userVitrinId, offset: 0, size: 10 }),
//     enabled: !!accessToken,
//     staleTime: 1000 * 60 * 2,
//   });
// };
export const useGetRecentActivities = (
  type?: RecentActivitiesTypeEnum,
  userVitrinId?: string,
) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["recent-activities", type || "all", userVitrinId],
    queryFn: () =>
      getRecentActivitiesApi({ type, userVitrinId, offset: 0, size: 10 }),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 2,
  });
};
