"use client";

import { useState } from "react";
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

import userAvatarImg from "@/src/assets/image/NoImage.png";
import coinsImg from "@/src/assets/image/coins.png";
import ticketImg from "@/src/assets/image/ticket.png";
import empty from "@/src/assets/image/NoImage.png";
import trophyImg from "@/src/assets/image/trophy.png";

export default function CustomerClub() {
  const [activeTab, setActiveTab] = useState<string | number>("personal");

  const { data: userProfile } = useGetUserProfile();
  const { vitrins, personalSummary, vitrinDetail, vitrinSummary } =
    useCustomerClubData(activeTab);

  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  const isPersonal = activeTab === "personal";

  const currentMonthlyCoins = isPersonal
    ? personalSummary?.totalCoinMonthly
    : null;
  const currentMonthlyScores = isPersonal
    ? personalSummary?.totalScoreMonthly
    : vitrinSummary?.totalScoreMonthly;

  const currentLocation = isPersonal
    ? `${userProfile?.city?.name ?? ""}، ${userProfile?.country?.name ?? ""}`
    : `${vitrinDetail?.user?.city?.name ?? ""}، ${vitrinDetail?.user?.country?.name ?? ""}`;

  const currentName = isPersonal
    ? `${userProfile?.firstName || ""} ${userProfile?.lastName || ""}`
    : vitrinDetail?.companyName || "بدون نام";
  const currentRole = isPersonal
    ? userProfile?.defaultRole === "user"
      ? "کاربر"
      : "همکار"
    : vitrinDetail?.fieldOfActivity?.name;
  const currentLevel = isPersonal ? userProfile?.level : vitrinDetail?.level;
  const currentScores = isPersonal ? userProfile?.scores : vitrinDetail?.scores;
  const currentCoins = isPersonal ? userProfile?.coins : null;
  const currentTasksCount = isPersonal
    ? personalSummary?.numberTasksCompleted
    : vitrinSummary?.numberTasksCompleted;

  const currentAvatar =
    !isPersonal && vitrinDetail?.logo?.link
      ? `${imageBaseUrl}/${vitrinDetail.logo.link}`
      : userAvatarImg;

  const currentLevelIcon = currentLevel?.file?.link
    ? `${imageBaseUrl}/${currentLevel.file.link}`
    : empty;

  return (
    <section
      aria-label="بخش باشگاه مشتریان"
      className="w-[87.5%] min-h-[288px] mx-auto flex flex-col justify-center py-4 space-y-3"
    >
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <div className="flex flex-col md:flex-row items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
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
            <TabsList className="bg-gray-100/80 py-5 flex gap-2 rounded-lg h-9 ">
              {vitrins?.map((vitrin) => (
                <TabsTrigger
                  key={vitrin.id}
                  value={vitrin.id.toString()}
                  className="cursor-pointer text-[16px] hover:bg-[#ECF0F2] font-bold px-3 py-4 rounded-md data-[state=active]:bg-white data-[state=active]:text-[#15181A] data-[state=active]:border-2 data-[state=active]:border-[#19A7E5] shadow-xs transition-all"
                >
                  {vitrin.companyName || "ویترین من"}
                </TabsTrigger>
              ))}
              <TabsTrigger
                value="personal"
                className="cursor-pointer text-[16px] hover:bg-[#ECF0F2] font-bold px-3 py-4 rounded-md data-[state=active]:bg-white data-[state=active]:text-[#15181A] data-[state=active]:border-2 data-[state=active]:border-[#19A7E5] shadow-xs transition-all"
              >
                پروفایل شخصی
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <nav className="flex items-center gap-6 text-xs font-bold text-gray-700">
          <Link
            href="#"
            className="text-[#15181A] font-bold text-[14px] hover:bg-[#ECF0F2] transition-all duration-300 p-3 rounded-xs"
          >
            قوانین و مقررات
          </Link>
          <Link
            href="#"
            className="text-[#15181A] font-bold text-[14px] hover:bg-[#ECF0F2] transition-all duration-300 p-3 rounded-xs"
          >
            سوالات متداول شما
          </Link>
        </nav>
      </header>

      <Card className="w-full min-h-[224px] rounded-2xl bg-white shadow-xs border border-gray-100 overflow-hidden py-4 px-2">
        <CardContent className="p-2 sm:p-4 h-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
          <article className="flex items-center gap-4 w-full lg:w-[35%] lg:pl-6">
            <div className="relative shrink-0 w-[104px] h-[104px]">
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
                <CheckCircle2 className="w-4 h-4 text-sky-500 fill-sky-500 stroke-white" />
              </div>

              <p className="text-xs text-[#667880] font-medium">
                {currentRole}
                {currentLocation && (
                  <>
                    {" / "}
                    <span>{currentLocation}</span>
                  </>
                )}
              </p>

              {isPersonal ? (
                <div>
                  <Badge
                    variant="secondary"
                    className="bg-[#ECF0F2] text-gray-500 text-[12px] font-normal px-2 py-0.5 rounded-md"
                  >
                    {userProfile?.defaultRole === "retailer"
                      ? "خرده فروش"
                      : "کاربر عادی"}
                  </Badge>
                </div>
              ) : (
                vitrinDetail?.typeGuild && (
                  <div>
                    <Badge
                      variant="secondary"
                      className="bg-[#ECF0F2] text-gray-500 text-[12px] font-normal px-2 py-0.5 rounded-md uppercase"
                    >
                      {vitrinDetail.typeGuild}
                    </Badge>
                  </div>
                )
              )}

              <p className="text-xs text-gray-500 flex items-center gap-1 pt-1">
                <CheckSquare className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[#667880] text-[13px]">
                  ماموریت انجام‌شده{" "}
                  <strong className="text-[#15181A] font-bold text-[14px]">
                    {currentTasksCount || 0}
                  </strong>
                </span>
              </p>
            </div>
          </article>

          <div className="hidden lg:block w-px h-28 bg-gray-100" />

          <article className="flex flex-col items-center justify-center space-y-3 w-full lg:w-[30%] px-4">
            <div className="bg-[#F9D5D5] text-red-500 text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 border border-red-100/60">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-[#E02D2D] text-[14px]">
                وقت کمی مونده، ماموریت رو همین الان انجام بده.
              </span>
            </div>

            <Button className="cursor-pointer bg-[#19A7E5] hover:bg-[#1486B7] hover:border-[#19A7E5] h-[44px] text-white rounded-md px-6 py-2.5 font-bold flex items-center gap-2 shadow-xs transition-all">
              <span className="font-bold">مشاهده ماموریت</span>
              <CheckSquare className="w-[20px] h-[20px]" />
            </Button>
          </article>

          <div className="hidden lg:block w-px h-28 bg-gray-100" />

          <article className="flex flex-col justify-center space-y-3 w-full lg:w-[35%] lg:pr-2">
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 bg-[#FFFFFF33] border border-gray-100 shadow-[0_0_12px_0_#66788066] rounded-2xl p-3 flex items-center justify-evenly relative">
                <div className="shrink-0 relative w-[64px] h-[64px] ">
                  {currentLevelIcon && (
                    <Image
                      src={currentLevelIcon}
                      alt="جام"
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-[16px] font-bold text-gray-800">
                    {currentLevel?.name || "بدون سطح"}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#15181A]">
                    <span className="font-bold text-[#15181A] text-[16px]">
                      {formatCurrency(currentScores)}
                    </span>
                    <span className="text-[12px] text-[#A3AEB3]">امتیاز</span>
                  </div>
                </div>
                <Info className="w-3.5 h-3.5 text-gray-300 absolute left-2 bottom-2 cursor-pointer hover:text-gray-400" />
              </div>

              {currentCoins !== null && currentCoins !== undefined && (
                <div className="flex-1 bg-[#D9A30014] shadow-[0_0_12px_0_#66788066] rounded-2xl p-3 flex items-center justify-evenly relative">
                  <div className="flex flex-col items-end space-y-0.5">
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-800">
                      <span className="text-[#15181A] text-[16px]">
                        {formatCurrency(currentCoins)}
                      </span>
                      <span className="text-[10px] font-normal text-[#667880] text-[16px]">
                        سکه
                      </span>
                      <Coins className="w-[16px] h-[16px] text-gray-300" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[#A3AEB3] text-[16px]">
                        {formatCurrency(Number(currentCoins))}
                      </span>
                      <span className="text-[#A3AEB3] text-[12px]">تومان</span>
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

            <div className="flex items-center justify-between text-[10px] text-gray-500 px-1 pt-1">
              <div className="flex items-center gap-1">
                <Badge
                  variant="outline"
                  className="text-[10px] font-normal text-[#15181A] px-2 py-0.5 rounded-full flex items-center gap-0.5 bg-[#ECF0F2]"
                >
                  <span className="text-[12px]">۳۰ روز اخیر</span>
                  <ChevronLeft className="w-3 h-3 text-gray-400" />
                </Badge>

                {currentMonthlyCoins !== null &&
                  currentMonthlyCoins !== undefined && (
                    <div className="flex items-center gap-1 mr-1">
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
                        {currentMonthlyCoins}{" "}
                        <span className="text-[10px]">سکه</span>{" "}
                      </strong>
                    </div>
                  )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Image src={trophyImg} alt="آیکون جام" width={32} height={32} />

                <span className="text-[#667880] text-[10px]">معادل:</span>

                <strong className="text-[#15181A] font-bold text-[14px]">
                  {currentMonthlyScores || 0}{" "}
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
