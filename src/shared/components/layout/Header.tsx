"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  ShoppingCart,
  LayoutGrid,
  Globe,
  ChevronDown,
  Menu,
  X,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import logo from "@/src/assets/image/logo.png";
import trophy from "@/src/assets/image/trophy.png";

import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import Image from "next/image";
import { useUserStore } from "@/src/features/user/store/user.store";
import { formatCurrency } from "../../utils/formatCurrency";
import { useAuthStore } from "@/src/features/auth/store/auth.store";
import { useDebounce } from "../../hooks/useDebounce";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
    }
  }, [debouncedSearchTerm]);

  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useUserStore((state) => state.user);

  const fullName = user ? `${user.firstName} ${user.lastName}` : "ورود";

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
            <div className="flex justify-between items-center gap-2">
              <Image
                src={logo}
                alt="logo"
                width={60}
                height={30}
                className="!w-20 !h-8 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="flex flex-col">
                <span className="text-[#0F6489]">بازار کالا و خدمات؛</span>

                <span className="text-[#0F6489]">ساده، امن، بی‌مرز</span>
              </div>
            </div>
            <Link
              href="#"
              className="flex items-center gap-1 text-[#667880] border-b-2 border-transparent hover:border-black hover:text-black transition-colors py-2"
            >
              کالا <ChevronDown className="h-4 w-4" />
            </Link>

            <Link
              href="#"
              className="flex items-center gap-1 text-[#667880] border-b-2 border-transparent hover:border-black hover:text-black transition-colors py-2"
            >
              خدمات <ChevronDown className="h-4 w-4" />
            </Link>

            <Link
              href="#"
              className="border-b-2 text-[#667880] border-transparent hover:border-black hover:text-black transition-colors py-2"
            >
              فروشندگان
            </Link>

            <Link
              href="#"
              className="border-b-2 text-[#667880] border-transparent hover:border-black hover:text-black transition-colors py-2"
            >
              نمایندگی‌ها
            </Link>
          </nav>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو در آگهی‌ها..."
                className="w-full pr-10 pl-4 py-2 bg-gray-50 border-gray-200 rounded-full text-sm focus-visible:ring-1 focus-visible:ring-[#7C49F2] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500 border-l pl-4 border-gray-200">
              <Globe className="h-4 w-4 text-gray-400" />
              <span>فارسی / IRT</span>
            </div>

            <Link href={accessToken ? "/" : "/login"}>
              <Button className="cursor-pointer bg-[#ECF0F2] hover:bg-gray-200 text-gray-800 font-medium rounded-xl text-sm px-4 py-3 shadow-none">
                {fullName}
              </Button>
            </Link>

            <button className="relative cursor-pointer transition-all duration-200 hover:bg-[#ECF0F2] hover:scale-[1.2] rounded-full p-2 hidden sm:block">
              <Bell className="h-5 w-5 text-[#15181A]" />
            </button>

            <button className="relative cursor-pointer transition-all duration-200 hover:bg-[#ECF0F2] hover:scale-[1.2] rounded-full p-2">
              <ShoppingCart className="h-5 w-5 text-[#15181A]" />
            </button>

            <button className=" cursor-pointer p-2 hidden sm:block transition-all duration-200 hover:bg-[#ECF0F2] hover:scale-[1.2] rounded-full">
              <LayoutGrid className="h-5 w-5 text-[#15181A]" />
            </button>
          </div>
        </div>

        <div className="py-2 md:hidden">
          <div className="relative w-full">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو در آگهی‌ها..."
              className="w-full pr-10 pl-4 py-2 bg-gray-50 border-gray-200 rounded-full text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50/80 border-t border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-between overflow-x-auto gap-4 md:px-45">
          <div className="hidden md:flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-[#15181A]" />

            <span className="text-sm text-[#15181A] ml-5">بازگشت</span>

            <span className="text-sm text-[#667880]">صفحه اصلی</span>

            <span className="text-[#A3AEB3] mx-1">&gt;</span>

            <span className="text-sm text-[#A3AEB3]">پاراف کلاب</span>
          </div>

          <div className="flex items-center justify-between gap-2 w-full md:w-auto">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-1.5 shadow-xs gap-2">
              <span className="text-xs font-medium text-gray-500 mr-2 pr-2">
                کیف پول:
              </span>

              <span className="text-sm font-bold text-gray-800" dir="ltr">
                {formatCurrency(user?.coins)}
              </span>

              <span className="text-xs text-gray-400 ml-2">تومان</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <div className="flex md:hidden items-center bg-[#7C49F2] border border-gray-200 rounded-full px-3 py-1 ">
                  <span className="text-xs font-bold text-[white] ml-2">
                    {user?.scores ?? "0"}
                  </span>
                  <div className=" text-white rounded-full p-1 flex items-center justify-center">
                    <Image
                      src={trophy}
                      alt="کاپ امتیاز"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="hidden md:flex relative w-62 h-7 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100 items-center mr-2">
                  <div className="absolute right-0 h-full w-[60%] bg-[#7C49F2] rounded-full flex items-center pr-8 pl-2">
                    <span className="text-white text-xs font-bold pt-0.5">
                      {user?.scores ?? "0"}
                    </span>
                  </div>

                  <div className="absolute -right-3 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-50 z-10">
                    <Image
                      src={trophy}
                      alt="کاپ امتیاز"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <HelpCircle className=" h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-b border-gray-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              <Link
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              >
                کالا
              </Link>
              <Link
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              >
                خدمات
              </Link>
              <Link
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              >
                فروشندگان
              </Link>
              <Link
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              >
                نمایندگی‌ها
              </Link>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between px-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Globe className="h-4 w-4" /> زبان: فارسی / IRT
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
