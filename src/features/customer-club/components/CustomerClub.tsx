"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  Info,
  AlertCircle,
  CheckSquare,
  Coins,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs";
import { Button } from "@/src/shared/components/ui/button";
import { Card, CardContent } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { formatCurrency } from "@/src/shared/utils/formatCurrency";
import { useGetUserProfile } from "@/src/features/user/hooks/useGetUserProfile";
import { useCustomerClubData } from "../hooks/useCustomerClub";
import {
  EndUserRoleEnum,
  type VitrinListItem,
} from "../types/CustomerClub.types";

import userAvatarImg from "@/src/assets/image/NoImage.png";
import coinsImg from "@/src/assets/image/coins.png";
import ticketImg from "@/src/assets/image/ticket.png";
import empty from "@/src/assets/image/NoImage.png";
import trophyImg from "@/src/assets/image/trophy.png";

const ROLE_LABELS: Record<string, string> = {
  [EndUserRoleEnum.USER]: "کاربر",
  [EndUserRoleEnum.RETAILER]: "خرده‌فروش",
  [EndUserRoleEnum.WHOLESALER]: "عمده‌فروش",
  [EndUserRoleEnum.MARKETER]: "بازاریاب",
  [EndUserRoleEnum.PRODUCER]: "تولیدکننده",
  [EndUserRoleEnum.IMPORTER]: "واردکننده",
  [EndUserRoleEnum.MERCHANT]: "بازرگان",
  [EndUserRoleEnum.DISTRIBUTOR]: "توزیع‌کننده",
  [EndUserRoleEnum.BANK]: "بانک",
  [EndUserRoleEnum.GOVERNMENT]: "سازمان یا نهاد دولتی",
  [EndUserRoleEnum.INSTITUTE]: "موسسه",
};

const getRoleLabel = (role?: string | null) => {
  if (!role) return "کاربر";
  return ROLE_LABELS[role] ?? role;
};

const formatFullName = (firstName?: string | null, lastName?: string | null) =>
  [firstName, lastName].filter(Boolean).join(" ").trim();

export default function CustomerClub() {
  const [activeTab, setActiveTab] = useState<string | number>("personal");

  const { data: userProfile } = useGetUserProfile();
  const { vitrins, personalSummary, vitrinDetail, vitrinSummary } =
    useCustomerClubData(activeTab);

  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? "";

  const visibleVitrins = useMemo<VitrinListItem[]>(() => {
    return (vitrins ?? []).filter(
      (vitrin) => vitrin.role !== EndUserRoleEnum.USER,
    );
  }, [vitrins]);

  const isPersonal = activeTab === "personal";

  const currentSummary = isPersonal ? personalSummary : vitrinSummary;

  const currentName = isPersonal
    ? formatFullName(userProfile?.firstName, userProfile?.lastName) ||
      "بدون نام"
    : vitrinDetail?.companyName?.trim() || "بدون نام";

  const currentRole = isPersonal
    ? getRoleLabel(userProfile?.defaultRole)
    : getRoleLabel(vitrinDetail?.role);

  const currentLocation = isPersonal
    ? [userProfile?.city?.name, userProfile?.country?.name]
        .filter(Boolean)
        .join("، ")
    : vitrinDetail?.citiesRow?.map((item) => item.name).join("، ") ||
      [vitrinDetail?.user?.city?.name, vitrinDetail?.user?.country?.name]
        .filter(Boolean)
        .join("، ");

  const currentLevel = isPersonal ? userProfile?.level : vitrinDetail?.level;

  const currentScores = Number(
    isPersonal ? (userProfile?.scores ?? 0) : (vitrinDetail?.scores ?? 0),
  );

  const currentCoins = isPersonal ? Number(userProfile?.coins ?? 0) : null;

  const currentTasksCount = Number(currentSummary?.numberTasksCompleted ?? 0);

  const monthlyScore = Number(currentSummary?.totalScoreMonthly ?? 0);

  const monthlyCoin =
    currentSummary?.totalCoinMonthly !== undefined &&
    currentSummary?.totalCoinMonthly !== null
      ? Number(currentSummary.totalCoinMonthly)
      : null;

  const currentAvatar = isPersonal
    ? userProfile?.file?.link
      ? `${imageBaseUrl}/${userProfile.file.link}`
      : userAvatarImg
    : vitrinDetail?.logo?.link
      ? `${imageBaseUrl}/${vitrinDetail.logo.link}`
      : userAvatarImg;

  const currentLevelIcon = currentLevel?.file?.link
    ? `${imageBaseUrl}/${currentLevel.file.link}`
    : empty;

  const hasMonthlyCoin =
    currentSummary?.totalCoinMonthly !== undefined &&
    currentSummary?.totalCoinMonthly !== null;

  return (
    <section
      aria-label="بخش باشگاه مشتریان"
      className="mx-auto flex min-h-[288px] w-[87.5%] flex-col justify-center space-y-3 py-4"
    >
      <header className="flex flex-col items-center justify-between gap-4 px-2 sm:flex-row">
        <div className="flex w-full flex-col items-center justify-between gap-3 md:flex-row md:justify-start md:gap-3 sm:w-auto">
          <span className="text-[14px] font-semibold text-[#15181A]">
            انتخاب باشگاه مشتریان:
          </span>

          <Tabs
            value={activeTab.toString()}
            onValueChange={(val) =>
              setActiveTab(val === "personal" ? "personal" : Number(val))
            }
            className="w-auto"
          >
            <TabsList className="flex h-9 gap-2 rounded-lg bg-gray-100/80 py-5">
              {visibleVitrins.map((vitrin) => (
                <TabsTrigger
                  key={vitrin.id}
                  value={vitrin.id.toString()}
                  className="cursor-pointer rounded-md px-3 py-4 text-[16px] font-bold transition-all hover:bg-[#ECF0F2] data-[state=active]:border-2 data-[state=active]:border-[#19A7E5] data-[state=active]:bg-white data-[state=active]:text-[#15181A] shadow-xs"
                >
                  {vitrin.companyName?.trim() || "ویترین من"}
                </TabsTrigger>
              ))}

              <TabsTrigger
                value="personal"
                className="cursor-pointer rounded-md px-3 py-4 text-[16px] font-bold transition-all hover:bg-[#ECF0F2] data-[state=active]:border-2 data-[state=active]:border-[#19A7E5] data-[state=active]:bg-white data-[state=active]:text-[#15181A] shadow-xs"
              >
                پروفایل شخصی
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <nav className="flex items-center gap-6 text-xs font-bold text-gray-700">
          <Link
            href="#"
            className="rounded-xs p-3 text-[14px] font-bold text-[#15181A] transition-all duration-300 hover:bg-[#ECF0F2]"
          >
            قوانین و مقررات
          </Link>
          <Link
            href="#"
            className="rounded-xs p-3 text-[14px] font-bold text-[#15181A] transition-all duration-300 hover:bg-[#ECF0F2]"
          >
            سوالات متداول شما
          </Link>
        </nav>
      </header>

      <Card className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white py-4 px-2 shadow-xs min-h-[224px]">
        <CardContent className="flex h-full flex-col items-center justify-between gap-6 p-2 sm:p-4 lg:flex-row lg:gap-0">
          <article className="flex w-full items-center gap-4 lg:w-[35%] lg:pl-6">
            <div className="relative h-[104px] w-[104px] shrink-0">
              <Image
                src={currentAvatar}
                alt="تصویر پروفایل"
                fill
                className="rounded-2xl object-cover"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center gap-1.5">
                <h2 className="text-[24px] font-semibold text-[#15181A]">
                  {currentName}
                </h2>
                <CheckCircle2 className="h-4 w-4 fill-sky-500 text-sky-500 stroke-white" />
              </div>

              <p className="text-xs font-medium text-[#667880]">
                {currentRole}
                {currentLocation ? (
                  <>
                    {" / "}
                    <span>{currentLocation}</span>
                  </>
                ) : null}
              </p>

              <p className="flex items-center gap-1 pt-1 text-xs text-gray-500">
                <CheckSquare className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-[13px] text-[#667880]">
                  ماموریت انجام‌شده{" "}
                  <strong className="text-[14px] font-bold text-[#15181A]">
                    {currentTasksCount}
                  </strong>
                </span>
              </p>
            </div>
          </article>

          <div className="hidden h-28 w-px bg-gray-100 lg:block" />

          <article className="flex w-full flex-col justify-center space-y-3 px-4 lg:w-[30%]">
            <div className="bg-[#F9D5D5] flex items-center gap-1.5 rounded-full border border-red-100/60 px-4 py-2 text-xs font-semibold text-red-500">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span className="text-[14px] text-[#E02D2D]">
                وقت کمی مونده، ماموریت رو همین الان انجام بده.
              </span>
            </div>

            <Button className="flex h-[44px] w-[55%] mx-auto cursor-pointer items-center gap-2 rounded-md bg-[#19A7E5] px-6 py-2.5 font-bold text-white shadow-xs transition-all hover:border-[#19A7E5] hover:bg-[#1486B7]">
              <span className="font-bold">مشاهده ماموریت</span>
              <CheckSquare className="h-[20px] w-[20px]" />
            </Button>
          </article>

          <div className="hidden h-28 w-px bg-gray-100 lg:block" />

          <article className="flex w-full flex-col justify-center space-y-3 lg:w-[35%] lg:pr-2">
            <div className="flex items-center gap-3 w-full">
              <div className="relative flex-1 rounded-2xl border border-gray-100 bg-[#FFFFFF33] p-3 shadow-[0_0_12px_0_#66788066] flex items-center justify-evenly">
                <div className="relative h-[64px] w-[64px] shrink-0">
                  <Image
                    src={currentLevelIcon}
                    alt="جام"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-[16px] font-bold text-gray-800">
                    {currentLevel?.name?.trim() || "بدون سطح"}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#15181A]">
                    <span className="text-[16px] font-bold text-[#15181A]">
                      {formatCurrency(currentScores)}
                    </span>
                    <span className="text-[12px] text-[#A3AEB3]">امتیاز</span>
                  </div>
                </div>

                <Info className="absolute left-2 bottom-2 h-3.5 w-3.5 cursor-pointer text-gray-300 hover:text-gray-400" />
              </div>

              {currentCoins !== null && currentCoins !== undefined && (
                <div className="relative flex-1 rounded-2xl bg-[#D9A30014] p-3 shadow-[0_0_12px_0_#66788066] flex items-center justify-evenly">
                  <div className="flex flex-col items-end space-y-0.5">
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-800">
                      <span className="text-[16px] text-[#15181A]">
                        {formatCurrency(currentCoins)}
                      </span>
                      <span className="text-[10px] font-normal text-[16px] text-[#667880]">
                        سکه
                      </span>
                      <Coins className="h-[16px] w-[16px] text-gray-300" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[16px] text-[#A3AEB3]">
                        {formatCurrency(currentCoins)}
                      </span>
                      <span className="text-[12px] text-[#A3AEB3]">تومان</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Image
                      src={coinsImg}
                      alt="سکه‌ها"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-1 pt-1 text-[10px] text-gray-500">
              <div className="flex items-center gap-1">
                <Badge
                  variant="outline"
                  className="flex items-center gap-0.5 rounded-full bg-[#ECF0F2] px-2 py-0.5 text-[10px] font-normal text-[#15181A]"
                >
                  <span className="text-[12px]">۳۰ روز اخیر</span>
                  <ChevronLeft className="h-3 w-3 text-gray-400" />
                </Badge>

                {hasMonthlyCoin && (
                  <div className="mr-1 flex items-center gap-1">
                    <Image
                      src={ticketImg}
                      alt="آیکون تیکت"
                      width={32}
                      height={32}
                    />
                    <span className="text-[#667880] text-[10px]">
                      سکه دریافتی از طرح تخفیف سکه‌ای:
                    </span>
                    <strong className="text-[#667880] text-[14px]">
                      {formatCurrency(Number(currentSummary.totalCoinMonthly))}{" "}
                      <span className="text-[10px]">سکه</span>
                    </strong>
                  </div>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <Image src={trophyImg} alt="آیکون جام" width={32} height={32} />
                <span className="text-[10px] text-[#667880]">معادل:</span>
                <strong className="text-[14px] font-bold text-[#15181A]">
                  {formatCurrency(monthlyScore)}{" "}
                  <span className="!text-[10px]">امتیاز</span>
                </strong>
              </div>
            </div>
          </article>
        </CardContent>
      </Card>
    </section>
  );
}
