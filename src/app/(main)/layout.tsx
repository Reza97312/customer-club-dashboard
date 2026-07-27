"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetUserProfile } from "@/src/features/user/hooks/useGetUserProfile";
import { useAuthStore } from "@/src/features/auth/store/auth.store";
import { Header } from "@/src/shared/components/layout/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const { isLoading } = useGetUserProfile();

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, router]);

  if (!accessToken || isLoading) {
    return null;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
