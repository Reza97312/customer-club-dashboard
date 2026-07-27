"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Zap, Check, CheckSquare, ArrowLeft, Loader2 } from "lucide-react";
import { useGetUserProfile } from "@/src/features/user/hooks/useGetUserProfile";
import { useGetLevels } from "../hooks/useLevel";

import flagImg from "@/src/assets/image/whiteFlag.png";
import bronzeTrophyImg from "@/src/assets/image/bronzeCup.png";
import silverTrophyImg from "@/src/assets/image/silverCup.png";
import goldTrophyImg from "@/src/assets/image/goldCup.png";
import diamondImg from "@/src/assets/image/diamond.png";

const DEFAULT_LEVELS = [
  { id: 1, name: "سطح برنزی", scores: "100" },
  { id: 2, name: " سطح نقره‌ای", scores: "200" },
  { id: 3, name: "سطح طلایی", scores: "300" },
  { id: 4, name: "  سطح الماس ", scores: "400" },
];

export default function Levels() {
  const { data: userData, isLoading: isUserLoading } = useGetUserProfile();
  const { data: levelsData, isLoading: isLevelsLoading } = useGetLevels();

  const user = userData;
  const userScore = Number(user?.scores ?? 110);

  const rawLevels =
    levelsData?.result && levelsData.result.length > 0
      ? levelsData.result
      : DEFAULT_LEVELS;

  const sortedLevels = [...rawLevels].sort(
    (a, b) => Number(a.scores) - Number(b.scores),
  );

  const allLevels = [
    { id: 0, name: "کاربر عادی", scores: "0" },
    ...sortedLevels,
  ];

  const getLevelStaticImage = (name: string): StaticImageData => {
    const cleanName = name ? name.trim() : "";
    if (cleanName.includes("عادی")) return flagImg;
    if (cleanName.includes("برنز")) return bronzeTrophyImg;
    if (cleanName.includes("نقره")) return silverTrophyImg;
    if (cleanName.includes("طلا")) return goldTrophyImg;
    if (cleanName.includes("الماس")) return diamondImg;
    return flagImg;
  };

  let currentLevelIndex = 0;
  for (let i = allLevels.length - 1; i >= 0; i--) {
    if (userScore >= Number(allLevels[i].scores)) {
      currentLevelIndex = i;
      break;
    }
  }

  let startIndex = Math.max(0, currentLevelIndex - 1);
  if (startIndex + 2 >= allLevels.length) {
    startIndex = Math.max(0, allLevels.length - 3);
  }
  const visibleLevels = allLevels.slice(startIndex, startIndex + 3);

  const nextLevelObj = allLevels[currentLevelIndex + 1] || null;
  const neededScore = nextLevelObj
    ? Math.max(0, Number(nextLevelObj.scores) - userScore)
    : 0;

  const s0 = Number(visibleLevels[0].scores);
  const s1 = Number(visibleLevels[1].scores);
  const s2 = Number(visibleLevels[2]?.scores ?? s1);

  let progressPercent = 0;
  if (userScore <= s0) {
    progressPercent = 0;
  } else if (userScore <= s1) {
    const range = s1 - s0 || 1;
    progressPercent = ((userScore - s0) / range) * 50;
  } else if (userScore <= s2) {
    const range = s2 - s1 || 1;
    progressPercent = 50 + ((userScore - s1) / range) * 50;
  } else {
    progressPercent = 100;
  }

  progressPercent = Math.min(100, Math.max(0, progressPercent));

  if (isUserLoading || isLevelsLoading) {
    return (
      <div className="w-full h-[392px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <section
      aria-label="وضعیت سطح کاربر"
      className="md:h-[392px] w-[95%] md:w-[87.5%] mx-auto flex flex-col md:flex-row items-center justify-evenly gap-6 md:gap-0 py-6 md:py-0"
    >
      <article className="w-full md:w-[52.62%] h-auto md:h-[312px] flex flex-col flex-wrap justify-between items-center gap-6 md:gap-0">
        <div className="rounded-3xl md:rounded-xl bg-[#7C49F214] w-full h-[280px] md:h-[239px] border border-[#FFFFFF33] relative p-4 md:p-6 flex flex-col justify-center overflow-hidden">
          <div className="absolute top-[60%] md:top-[65%] left-[5%] right-[5%] h-[2px] bg-white/30 z-0"></div>

          <div
            style={{ width: `${progressPercent * 0.9}%` }}
            className="absolute top-[60%] md:top-[65%] right-[5%] h-[4px] bg-gradient-to-l from-purple-400 to-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.5)] z-0 rounded-full transition-all duration-500 ease-out"
          ></div>

          <div className="relative z-10 w-full h-full flex items-center justify-between px-2 md:px-8 mt-12 md:mt-16">
            {visibleLevels.map((lvl, idx) => {
              const lvlScore = Number(lvl.scores);
              const isPassed = userScore >= lvlScore;
              const isCurrent =
                userScore >= lvlScore &&
                (idx === visibleLevels.length - 1 ||
                  userScore < Number(visibleLevels[idx + 1]?.scores));

              const imgSource = getLevelStaticImage(lvl.name);

              return (
                <div
                  key={lvl.id || idx}
                  className="flex flex-col items-center gap-2 relative"
                >
                  <Image
                    src={imgSource}
                    alt={lvl.name}
                    width={isCurrent ? 100 : 56}
                    height={isCurrent ? 100 : 56}
                    priority
                    className={`absolute ${
                      isCurrent ? "-top-20" : "-top-16"
                    } object-contain transition-all duration-300 ${
                      !isPassed ? "opacity-60 grayscale" : ""
                    }`}
                  />

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border-2 z-10 ${
                      isPassed
                        ? "bg-[#a78bfa] border-[#ede9fe]"
                        : "bg-white/60 border-white"
                    }`}
                  >
                    {isPassed && <Check className="w-3 h-3 text-white" />}
                  </div>

                  <motion.span
                    animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`text-[10px] md:text-xs font-bold mt-10 ${
                      isCurrent ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    {lvl.name}
                  </motion.span>

                  <span className="text-[9px] text-gray-400">
                    {lvlScore} امتیاز
                  </span>
                </div>
              );
            })}
          </div>

          <motion.div
            animate={{
              rotate: [-8, 8, -8],
              color: ["#ffffff", "#fde047", "#ffffff"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "top center",
              right: `calc(${5 + progressPercent * 0.9}% - 24px)`,
            }}
            className="absolute top-[55%] md:top-[60%] mt-5 bg-purple-500 rounded-full flex items-center px-3 py-1 shadow-md gap-1 z-20 border border-purple-400 transition-all duration-500 ease-out mr-3"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span className="font-extrabold text-xs pt-0.5">{userScore}</span>
          </motion.div>
        </div>

        <nav
          aria-label="ترتیب سطوح"
          className="h-auto py-3 md:py-0 md:h-[49px] w-full md:w-[85.18%] rounded-full md:rounded-sm bg-white mx-auto flex flex-wrap items-center justify-center md:justify-between px-2 md:px-6 shadow-sm border border-gray-100 gap-2 md:gap-0"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] md:text-[14px] font-bold text-[#15181A]">
              سطح برنزی
            </span>
            <Image src={bronzeTrophyImg} alt="برنز" width={28} height={28} />
          </div>

          <ArrowLeft className="w-3 h-3 text-[#ECF0F2] hidden md:block" />

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] md:text-[14px] font-bold text-[#15181A]">
              سطح نقره‌ای
            </span>
            <Image src={silverTrophyImg} alt="نقره" width={28} height={28} />
          </div>

          <ArrowLeft className="w-3 h-3 text-[#ECF0F2] hidden md:block" />

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] md:text-[14px] font-bold text-[#15181A]">
              سطح طلایی
            </span>
            <Image src={goldTrophyImg} alt="طلا" width={28} height={28} />
          </div>

          <ArrowLeft className="w-3 h-3 text-[#ECF0F2] hidden md:block" />

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] md:text-[14px] font-bold text-[#15181A]">
              سطح الماس
            </span>
            <Image src={diamondImg} alt="الماس" width={28} height={28} />
          </div>
        </nav>
      </article>

      <article className="border border-[#FFFFFF33] w-[80%] md:w-[25.43%] h-[157px] rounded-3xl md:rounded-[9999px] bg-[#7C49F214] flex flex-col items-center justify-center gap-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-[11px] md:text-[16px] text-[#15181A]">
            {nextLevelObj ? (
              <>
                امتیاز لازم تا{" "}
                <span className="font-bold">{nextLevelObj.name}</span>
              </>
            ) : (
              <span className="font-bold">شما در بالاترین سطح هستید</span>
            )}
          </span>
          {nextLevelObj && (
            <div className="bg-white rounded-full px-2 py-0.5 shadow-sm border border-gray-100 flex items-center gap-0.5">
              <span className="text-[#7C49F2] font-bold text-[14px]">
                +{neededScore}
              </span>
              <Zap className="w-[14px] h-[14px] text-[#7C49F2]" />
            </div>
          )}
        </div>

        <button className="bg-white cursor-pointer hover:bg-[#D1EDFA] transition-colors border border-[#19A7E5] text-[#19A7E5] rounded-md px-6 py-2.5 font-bold flex items-center gap-2 shadow-sm w-[75%] justify-center">
          <span>ماموریت‌ها</span>
          <CheckSquare className="w-[20px] h-[20px]" />
        </button>
      </article>
    </section>
  );
}
