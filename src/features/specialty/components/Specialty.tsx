"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/shared/components/ui/card";

import giftImg from "@/src/assets/image/Gift.png";
import supportImg from "@/src/assets/image/support.png";
import rocketImg from "@/src/assets/image/rocket2.png";
import reportImg from "@/src/assets/image/report.png";
import calendarImg from "@/src/assets/image/calendar.png";
import usersImg from "@/src/assets/image/users.png";

import backLogoImg from "@/src/assets/image/GrayGift.png";

const specialtiesData = [
  {
    id: 1,
    title: "جوایز ویژه",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان.",
    frontImage: giftImg,
    backImage: backLogoImg,
    backTitle: "جوایز ویژه",
  },

  {
    id: 2,
    title: "پشتیبانی حرفه‌ای",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان.",
    frontImage: supportImg,
    backImage: backLogoImg,
    backTitle: "جوایز ویژه",
  },
  {
    id: 3,
    title: "ارسال رایگان",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان.",
    frontImage: rocketImg,
    backImage: backLogoImg,
    backTitle: "جوایز ویژه",
  },
  {
    id: 4,
    title: "گزارش فروش",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان.",
    frontImage: reportImg,
    backImage: backLogoImg,
    backTitle: "جوایز ویژه",
  },

  {
    id: 5,
    title: "رویدادهای ویژه",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان.",
    frontImage: calendarImg,
    backImage: backLogoImg,
    backTitle: "جوایز ویژه",
  },
  {
    id: 6,
    title: "شبکه همکاران",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان.",
    frontImage: usersImg,
    backImage: backLogoImg,
    backTitle: "جوایز ویژه",
  },
];

export default function Specialty() {
  return (
    <section
      aria-label="ویژگی‌های پاراف‌کلاب"
      className="h-auto lg:h-[633px] w-[95%] lg:w-[87.5%] mx-auto flex flex-col justify-between py-8 lg:py-0"
    >
      <header className="flex justify-start items-center mb-6 lg:mb-0">
        <h2 className="text-xl lg:text-[24px] font-bold  flex items-center gap-1.5">
          <span className="text-[#15181A]">ویژگی‌های</span>
          <span className="text-[#7C49F2]">پاراف‌کلاب</span>
        </h2>
      </header>

      <div className="w-full lg:w-[95.24%] h-auto lg:h-[564px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
        {specialtiesData.map((item) => (
          <SpecialtyCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function SpecialtyCard({ item }: { item: (typeof specialtiesData)[0] }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <article
      className="w-full h-[270px] [perspective:1000px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? -180 : 0 }}
        transition={{
          duration: isFlipped ? 0.6 : 0.4,
          ease: "easeInOut",
        }}
      >
        <Card className="absolute inset-0 w-full h-[270px] bg-white rounded-3xl shadow-sm shadow-[0_0_12px_0_#66788066] flex flex-col items-center justify-center p-6 text-center [backface-visibility:hidden]">
          <CardContent className="flex flex-col items-center justify-center p-0 space-y-3">
            <div className="w-[120px] h-[120px] relative flex items-center justify-center shrink-0">
              <Image
                src={item.frontImage}
                alt={item.title}
                width={120}
                height={120}
                className="object-contain"
              />
            </div>

            <h3 className="font-bold text-[#15181A]">{item.title}</h3>

            <p className="text-[14px] text-[#667880] leading-relaxed line-clamp-1 px-2">
              {item.description}
            </p>
          </CardContent>
        </Card>

        <Card className="absolute inset-0 w-full h-[270px] rounded-3xl border-2 border-[#7C49F280] shadow-[0_0_48px_0_#AE00FF66,0_2px_10px_0_#00000026] bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#E5DBFC_100%)] flex flex-col items-center justify-center p-6 text-center [backface-visibility:hidden] [transform:rotateY(-180deg)]">
          <CardContent className="flex flex-col items-center justify-center p-0 space-y-3">
            <div className="w-[80px] h-[80px] relative flex items-center justify-center shrink-0">
              <Image
                src={item.backImage}
                alt={`${item.title} - پشت`}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            <h3 className="text-[18px] font-bold text-[#E02D2D]">
              {item.backTitle}
            </h3>

            <p className="text-[14px] text-[#15181A] leading-relaxed px-2">
              {item.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </article>
  );
}
