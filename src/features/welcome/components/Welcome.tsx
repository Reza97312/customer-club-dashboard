"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import trophyImg from "@/src/assets/image/goldT.png";
import coinBagImg from "@/src/assets/image/coin.png";
import sparkleImg from "@/src/assets/image/rocket.png";
import { useUserStore } from "../../user/store/user.store";

export default function Welcome() {
  const user = useUserStore((state) => state.user);
  return (
    <section
      aria-label="Welcome Banner"
      className="relative h-[310px] md:h-[362px] w-[90%] md:w-[87.5%] mx-auto flex items-center justify-center overflow-visible"
    >
      <motion.div
        className="absolute left-[5%] md:left-[15%] z-0"
        animate={{
          x: [0, 60, 0],
          scale: [1, 0.4, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={sparkleImg}
          alt="فشفشه"
          width={220}
          height={220}
          className="w-[320px] md:w-[220px] object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute left-[40%] z-0"
        animate={{
          scale: [1, 0.2, 1],
          opacity: [0.8, 0.2, 0.8],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Image
          src={sparkleImg}
          alt="فشفشه"
          width={350}
          height={350}
          className="w-28 md:w-[350px] object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute right-[5%] md:right-[15%] z-0"
        animate={{
          x: [0, -60, 0],
          scale: [1, 0.4, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <Image
          src={sparkleImg}
          alt="فشفشه"
          width={220}
          height={220}
          className="w-14 md:w-[220px] object-contain"
        />
      </motion.div>

      <div className="relative z-10 w-[88%] md:w-[54.8%] h-auto md:h-[202px] rounded-xl lg:rounded-[9999px] bg-white flex flex-col justify-center shadow-sm border border-gray-50 px-6 sm:px-16 md:px-24 py-6 md:py-0">
        <p className="text-gray-600 text-sm md:text-base mb-1 font-medium">
          {user ? `${user.firstName} ${user.lastName}` : "کاربر"} عزیز
        </p>

        <motion.h1
          animate={{
            scale: [1, 0.9, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#7C49F2] font-bold md:font-extrabold text-lg md:text-2xl lg:text-3xl mb-3"
        >
          به پاراف‌کلاب{" "}
          <span className="font-normal text-[#7C49F2] text-base md:text-xl">
            (باشگاه مشتریان پاراف)
          </span>{" "}
          خوش اومدی!
        </motion.h1>

        <p className="text-gray-800 text-xs md:text-sm font-semibold">
          مأموریت‌هات رو انجام بده؛ هم <span className="font-bold">سطح</span>{" "}
          اعتبارت رو افزایش میدی، هم <span className="font-bold">سکه</span>{" "}
          میگیری.
        </p>
      </div>

      <motion.div
        className="hidden lg:flex absolute left-0 md:left-[16%] bottom-0 md:bottom-[12%] z-20 pointer-events-none"
        animate={{
          x: [-4, 4, -4],
          rotate: [-1.5, 1.5, -1.5],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={trophyImg}
          alt="جام طلایی"
          width={220}
          height={220}
          className="w-16 sm:w-24 md:w-56 object-contain"
        />
      </motion.div>

      <motion.div
        className="hidden lg:flex absolute left-[13%] md:left-[26%] bottom-0 md:bottom-[12%] z-30 pointer-events-none"
        animate={{
          x: [3, -3, 3],
          rotate: [2, -2, 2],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={coinBagImg}
          alt="کیسه سکه"
          width={110}
          height={110}
          className="w-12 sm:w-16 md:w-28 object-contain"
        />
      </motion.div>
    </section>
  );
}
