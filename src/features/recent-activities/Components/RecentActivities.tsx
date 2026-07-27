"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Eye,
  Clock,
  Zap,
  Coins,
  RefreshCcw,
  ArrowLeftRight,
  Inbox,
  Loader2,
} from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { Badge } from "@/src/shared/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/shared/components/ui/chart";

import { useGetRecentActivities } from "../hooks/useGetRecentActivities";
import {
  RecentActivitiesTypeEnum,
  RecentActivityItem,
} from "../types/RecentActivities.types";

const filterTabs: {
  id: string;
  label: string;
  value?: RecentActivitiesTypeEnum;
}[] = [
  {
    id: "transfer",
    label: "انتقال سکه",
    value: RecentActivitiesTypeEnum.TRANSFERCOIN,
  },
  {
    id: "spent",
    label: "برداشت سکه",
    value: RecentActivitiesTypeEnum.SPENTCOIN,
  },
  { id: "both", label: "دوگانه", value: RecentActivitiesTypeEnum.BOTH },
  { id: "coin", label: "سکه", value: RecentActivitiesTypeEnum.COIN },
  { id: "score", label: "امتیاز", value: RecentActivitiesTypeEnum.SCORE },
  { id: "all", label: "نمایش همه", value: undefined },
];

const chartData = [
  { month: "اردیبهشت", score: 25 },
  { month: "خرداد", score: 30 },
  { month: "تیر", score: 85 },
  { month: "مرداد", score: 50 },
  { month: "شهریور", score: 55 },
  { month: "مهر", score: 20 },
];

const chartConfig = {
  score: {
    label: "امتیاز",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface RecentActivitiesProps {
  userVitrinId?: string;
}

export default function RecentActivities({
  userVitrinId,
}: RecentActivitiesProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTabId = searchParams.get("tab") || "all";

  const currentTab =
    filterTabs.find((t) => t.id === activeTabId) || filterTabs[0];

  const { data, isLoading, isError } = useGetRecentActivities(
    currentTab.value,
    userVitrinId,
  );
  const activities = data?.result || [];

  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "long",
      }).format(date);
    } catch {
      return isoString;
    }
  };

  const getActivityMeta = (item: RecentActivityItem) => {
    switch (item.type) {
      case RecentActivitiesTypeEnum.SCORE:
        return {
          icon: Zap,
          iconColor: "text-emerald-500",
          hoverBg: "hover:from-white hover:to-emerald-100",
          iconBgHover: "group-hover:bg-emerald-500",
          valueHover: "group-hover:text-emerald-500",
          valueText: item.scoreAmount
            ? `+${item.scoreAmount} امتیاز`
            : "امتیاز",
        };
      case RecentActivitiesTypeEnum.COIN:
        return {
          icon: Coins,
          iconColor: "text-sky-500",
          hoverBg: "hover:from-white hover:to-sky-100",
          iconBgHover: "group-hover:bg-sky-500",
          valueHover: "group-hover:text-sky-500",
          valueText: item.coinAmount ? `+${item.coinAmount} سکه` : "سکه",
        };
      case RecentActivitiesTypeEnum.SPENTCOIN:
        return {
          icon: Coins,
          iconColor: "text-amber-500",
          hoverBg: "hover:from-white hover:to-amber-100",
          iconBgHover: "group-hover:bg-amber-500",
          valueHover: "group-hover:text-amber-500",
          valueText: item.coinAmount ? `-${item.coinAmount} برداشت` : "برداشت",
        };
      case RecentActivitiesTypeEnum.TRANSFERCOIN:
        return {
          icon: ArrowLeftRight,
          iconColor: "text-red-500",
          hoverBg: "hover:from-white hover:to-red-100",
          iconBgHover: "group-hover:bg-red-500",
          valueHover: "group-hover:text-red-500",
          valueText: item.coinAmount ? `-${item.coinAmount} انتقال` : "انتقال",
        };
      case RecentActivitiesTypeEnum.BOTH:
      default:
        return {
          icon: RefreshCcw,
          iconColor: "text-emerald-500",
          hoverBg: "hover:from-white hover:to-emerald-100",
          iconBgHover: "group-hover:bg-emerald-500",
          valueHover: "group-hover:text-emerald-500",
          valueText:
            item.scoreAmount || item.coinAmount
              ? `${item.scoreAmount ? `+${item.scoreAmount} امتیاز\n` : ""}${
                  item.coinAmount ? `+${item.coinAmount} سکه` : ""
                }`
              : "فعالیت",
        };
    }
  };

  return (
    <section
      aria-label="فعالیت‌های اخیر و نمودار"
      className="h-auto lg:h-[392px] w-[95%] lg:w-[87.5%] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between py-10 lg:py-110 gap-6 lg:gap-0"
    >
      <article
        dir="ltr"
        className="bg-white rounded-3xl lg:rounded-xl h-[600px] lg:h-[752px] w-full lg:w-[60%] shadow-sm border border-gray-100 flex flex-col overflow-hidden"
      >
        <header className="p-6 border-b border-gray-50 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500 hover:text-gray-800 cursor-pointer transition-colors">
              <Eye className="w-[16px] h-[16px] text-[#15181A]" />
              <span className="text-[14px] font-bold text-[#15181A]">
                لیست کامل
              </span>
            </div>
            <div className="text-right">
              <h2 className="text-[24px] font-bold text-[#15181A]">
                فعالیت‌های اخیر {userVitrinId ? "ویترین" : ""}
              </h2>
              <p className="text-[14px] text-[#667880] mt-1">
                مروری بر آخرین فعالیت‌ها و دستاوردها
              </p>
            </div>
          </div>

          <>
            <nav className="hidden md:flex items-center justify-end gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`cursor-pointer whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTabId === tab.id
                      ? "border-2 border-gray-800 text-gray-800 bg-white shadow-sm"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="md:hidden pb-2">
              <Select
                value={String(activeTabId)}
                onValueChange={(value) => handleTabChange(value)}
              >
                <SelectTrigger className="w-full rounded-full border border-gray-200 bg-white px-4 py-5 text-xs font-bold text-gray-800 shadow-sm">
                  <SelectValue placeholder="انتخاب تب" />
                </SelectTrigger>

                <SelectContent>
                  {filterTabs.map((tab) => (
                    <SelectItem
                      key={tab.id}
                      value={String(tab.id)}
                      className="text-xs font-medium"
                    >
                      {tab.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        </header>

        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#7C49F2]" />
              <span className="text-xs font-medium">
                در حال دریافت فعالیت‌ها...
              </span>
            </div>
          ) : isError ? (
            <div className="h-full flex flex-col items-center justify-center gap-2 text-red-500">
              <span className="text-xs font-semibold">
                خطا در دریافت اطلاعات فعالیت‌ها
              </span>
            </div>
          ) : activities.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-gray-400">
              <Inbox className="w-10 h-10 text-gray-300" />
              <span className="text-xs font-semibold">
                هیچ فعالیتی ثبت نشده است.
              </span>
            </div>
          ) : (
            <ul className="space-y-1">
              {activities.map((activity) => {
                const meta = getActivityMeta(activity);
                const IconComponent = meta.icon;

                return (
                  <li
                    key={activity.id}
                    className={`group flex flex-col mb-1 sm:flex-row sm:items-center justify-between p-4 bg-[#F5F7F7] rounded-lg sm:rounded-full transition-all duration-300 gap-4 hover:bg-gradient-to-l ${meta.hoverBg}`}
                  >
                    <div className="flex items-center gap-4 w-full sm:w-[30%] text-gray-400 text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatDate(activity.createdAt)}</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-[#ECF0F2] text-[#15181A] rounded-md px-3 font-semibold border-none shadow-none text-[10px]"
                      >
                        موفق
                      </Badge>
                    </div>

                    <p className="text-[12px] text-[#15181A] text-right w-full sm:w-[50%] leading-relaxed transition-all duration-500 ease-in-out group-hover:scale-[1.03] group-hover:font-extrabold origin-right">
                      {activity.taskTitle || activity.taskDescription}
                    </p>

                    <div className="flex items-center justify-end gap-3 w-full sm:w-[20%] text-right">
                      <span
                        className={`text-[14px] font-bold text-[#15181A] whitespace-pre-line leading-tight transition-colors duration-300 ${meta.valueHover}`}
                      >
                        {meta.valueText}
                      </span>

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white transition-colors duration-500 ease-in-out ${meta.iconBgHover}`}
                      >
                        <IconComponent
                          className={`w-4 h-4 transition-colors duration-300 group-hover:text-white ${meta.iconColor}`}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </article>

      <aside className="bg-white rounded-3xl lg:rounded-xl h-[650px] lg:h-[752px] w-full lg:w-[38.7%] shadow-sm border border-gray-100 flex flex-col p-6">
        <header className="text-right mb-6">
          <h2 className="text-[24px] font-bold text-[#15181A]">
            نمودار فعالیت‌ها
          </h2>
        </header>

        <div className="bg-[#ECF0F2] rounded-2xl p-5 text-right flex flex-col space-y-4 mb-8">
          <p className="text-[14px] font-semibold text-[#15181A] leading-relaxed">
            اخیراً کم‌فعالیت بودی.
            <br />
            برای حفظ سطح برنزی، بیشتر مشارکت کن! 👀
          </p>
          <div className="flex items-center justify-end gap-3">
            <Button
              variant="outline"
              className="cursor-pointer text-[#19A7E5] border-[#19A7E5] hover:bg-sky-50 hover:text-[#19A7E5] rounded-md font-bold lg:px-6 lg:py-5"
            >
              دعوت دوستان
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer text-[#19A7E5] border-[#19A7E5] hover:bg-sky-50 hover:text-[#19A7E5] rounded-md font-bold lg:px-6 lg:py-5"
            >
              شرکت در نظرسنجی
            </Button>
          </div>
        </div>

        <div className="text-center space-y-2 mb-6">
          <p className="text-[14px] text-[#667880] text-start">
            نمودار تغییرات امتیاز بر اساس فعالیت ۶ ماهه شما
          </p>
          <p className="font-semibold text-[#15181A] text-start">
            فعالیت شما نسبت به ماه گذشته{" "}
            <span className="text-[#E02D2D] font-extrabold">۳۵٪ کاهش</span>{" "}
            یافته.
          </p>
        </div>

        <div className="flex-1 w-full min-h-[250px]">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12, top: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f3f4f6" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{ fontSize: 10, fill: "#222222", fontFamily: "inherit" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{ fontSize: 10, fill: "#222222" }}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="score"
                type="monotone"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </aside>
    </section>
  );
}
