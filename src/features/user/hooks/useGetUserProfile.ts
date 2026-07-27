import { useQuery } from "@tanstack/react-query";
import { getUserProfileApi } from "../services/user.api";
import { useUserStore } from "../store/user.store";
import { useAuthStore } from "@/src/features/auth/store/auth.store";

export const useGetUserProfile = () => {
  const setUser = useUserStore((state) => state.setUser);
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const data = await getUserProfileApi();
      setUser(data);
      return data;
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
};
