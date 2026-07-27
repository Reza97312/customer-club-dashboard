"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/src/shared/components/layout/Header";
import { useGetUserProfile } from "@/src/features/user/hooks/useGetUserProfile";
import { useAuthStore } from "@/src/features/auth/store/auth.store";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  const { isLoading } = useGetUserProfile();

  useEffect(() => {
    if (!hasHydrated) return;

    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, hasHydrated, router]);

  if (!hasHydrated) {
    return null;
  }

  if (!accessToken) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
