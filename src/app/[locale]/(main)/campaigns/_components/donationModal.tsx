"use client";

import { useState } from "react";
import { Building2, Wallet, CreditCard, MapPin, Phone, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocale } from "next-intl";

export function DonationModal() {
  const [activeTab, setActiveTab] = useState("bank");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="bg-[#2c7242] hover:bg-[#1e5a32] transition-colors cursor-pointer  text-white px-4 py-2 rounded text-sm sm:text-base mt-2 w-full"
        >
          تبرع الآن
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl p-0 overflow-hidden animate-modal-in">
        <DialogHeader className="bg-gradient-to-r from-[#2c7242] to-[#1e5a32] flex flex-row items-center justify-between text-white px-4 sm:px-6 py-3 sm:py-4 rounded-t-lg m-0 animate-slide-down">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            تبرع الآن
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant="secondary"
              size="icon"
              className="cursor-pointer hover:bg-white/20 transition-colors"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] animate-fade-in-delay">
          <Tabs>
            <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6 animate-slide-up delay-200">
              <TabsTrigger
                active={activeTab === "bank"}
                onClick={() => setActiveTab("bank")}
                className="cursor-pointer text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 transition-all duration-300 hover:scale-105"
              >
                <Building2 className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                <span className="hidden xs:inline">تحويل بنكي</span>
                <span className="xs:hidden">بنكي</span>
              </TabsTrigger>
              <TabsTrigger
                active={activeTab === "cash"}
                onClick={() => setActiveTab("cash")}
                className="cursor-pointer text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 transition-all duration-300 hover:scale-105"
              >
                <Wallet className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                <span className="hidden xs:inline">كاش</span>
                <span className="xs:hidden">كاش</span>
              </TabsTrigger>
              <TabsTrigger
                active={activeTab === "card"}
                onClick={() => setActiveTab("card")}
                className="cursor-pointer text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 transition-all duration-300 hover:scale-105"
              >
                <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                <span className="hidden xs:inline">فيزا / ماستر</span>
                <span className="xs:hidden">بطاقة</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent
              hidden={activeTab !== "bank"}
              className="animate-slide-up delay-300"
            >
              <div className="bg-gradient-to-br from-[#2c7242]/5 to-[#c48845]/5 rounded-xl p-3 sm:p-4 md:p-6 border border-[#2c7242]/20 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 md:gap-6">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-[#c41e5a] rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                      <div className="text-white text-center">
                        <div className="text-xs sm:text-sm font-bold mb-1">
                          بنك فلسطين
                        </div>
                        <div className="text-xs">BANK OF PALESTINE</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 sm:space-y-4 w-full">
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-[#5b5d6b] block mb-1">
                        اسم البنك
                      </label>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-[#2c7242]">
                        Mashriq bank
                      </p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-[#5b5d6b] block mb-1">
                        رقم الحساب
                      </label>
                      <p className="text-xs sm:text-sm md:text-lg font-mono font-bold text-[#000000] bg-white px-2 sm:px-3 md:px-4 py-2 rounded-lg border border-[#2c7242]/20 break-all">
                        EG003457493857439857
                      </p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-[#5b5d6b] block mb-1">
                        Swift Code
                      </label>
                      <p className="text-xs sm:text-sm md:text-lg font-mono font-bold text-[#000000] bg-white px-2 sm:px-3 md:px-4 py-2 rounded-lg border border-[#2c7242]/20 break-all">
                        EG003457493857439857
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#ffb600]/10 rounded-lg border border-[#ffb600]/30 animate-slide-up delay-500">
                  <p className="text-xs sm:text-sm text-[#5b5d6b] leading-relaxed">
                    <strong className="text-[#2c7242]">ملاحظة:</strong> بعد
                    إتمام التحويل البنكي، يرجى إرسال إيصال التحويل عبر البريد
                    الإلكتروني أو الواتساب لتأكيد التبرع.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              hidden={activeTab !== "cash"}
              className="animate-slide-up delay-300"
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-gradient-to-br from-[#2c7242]/5 to-[#c48845]/5 rounded-xl p-3 sm:p-4 md:p-6 border border-[#2c7242]/20 hover:shadow-lg transition-all duration-300 animate-slide-up delay-400">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-[#2c7242] flex items-center gap-2">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#c48845]" />
                      القاهرة
                    </h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#858d9d] flex-shrink-0 mt-1" />
                      <p className="text-xs sm:text-sm text-[#5b5d6b] leading-relaxed">
                        العنوان: اسم الشارع، اسم المنطقة، اسم المدينة.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#858d9d] flex-shrink-0" />
                      <p
                        className="text-xs sm:text-sm text-[#5b5d6b] font-mono"
                        dir="ltr"
                      >
                        +20 0097123456789
                      </p>
                    </div>
                    <Button className="w-full bg-[#c48845] hover:bg-[#2c7242] text-white mt-3 sm:mt-4 text-xs sm:text-sm py-2 sm:py-3 transition-all duration-300 hover:scale-105">
                      عرض على الخريطة
                    </Button>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#2c7242]/5 to-[#c48845]/5 rounded-xl p-3 sm:p-4 md:p-6 border border-[#2c7242]/20 hover:shadow-lg transition-all duration-300 animate-slide-up delay-500">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-[#2c7242] flex items-center gap-2">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#c48845]" />
                      الجيزة
                    </h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#858d9d] flex-shrink-0 mt-1" />
                      <p className="text-xs sm:text-sm text-[#5b5d6b] leading-relaxed">
                        العنوان: اسم الشارع، اسم المنطقة، اسم المدينة.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#858d9d] flex-shrink-0" />
                      <p
                        className="text-xs sm:text-sm text-[#5b5d6b] font-mono"
                        dir="ltr"
                      >
                        +20 0097123456789
                      </p>
                    </div>
                    <Button className="w-full bg-[#c48845] hover:bg-[#2c7242] text-white mt-3 sm:mt-4 text-xs sm:text-sm py-2 sm:py-3 transition-all duration-300 hover:scale-105">
                      عرض على الخريطة
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              hidden={activeTab !== "card"}
              className="animate-slide-up delay-300"
            >
              <div className="bg-gradient-to-br from-[#2c7242]/5 to-[#c48845]/5 rounded-xl p-4 sm:p-6 md:p-8 border border-[#2c7242]/20 hover:shadow-lg transition-all duration-300">
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-center gap-3 sm:gap-4 animate-slide-up delay-400">
                    <div className="w-12 h-8 sm:w-14 sm:h-10 md:w-16 md:h-12 bg-white rounded-lg shadow-md flex items-center justify-center hover:scale-105 transition-transform duration-300">
                      <svg
                        viewBox="0 0 48 32"
                        className="w-8 h-5 sm:w-10 sm:h-6 md:w-12 md:h-8"
                      >
                        <rect width="48" height="32" rx="4" fill="#1434CB" />
                        <text
                          x="24"
                          y="20"
                          textAnchor="middle"
                          fill="white"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          VISA
                        </text>
                      </svg>
                    </div>
                    <div className="w-12 h-8 sm:w-14 sm:h-10 md:w-16 md:h-12 bg-white rounded-lg shadow-md flex items-center justify-center hover:scale-105 transition-transform duration-300">
                      <svg
                        viewBox="0 0 48 32"
                        className="w-8 h-5 sm:w-10 sm:h-6 md:w-12 md:h-8"
                      >
                        <circle cx="18" cy="16" r="10" fill="#EB001B" />
                        <circle cx="30" cy="16" r="10" fill="#F79E1B" />
                      </svg>
                    </div>
                  </div>
                  <div className="animate-slide-up delay-500">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2c7242] mb-2">
                      الدفع الإلكتروني
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5b5d6b] leading-relaxed">
                      يمكنك التبرع بأمان باستخدام بطاقة الفيزا أو الماستركارد
                    </p>
                  </div>
                  <div className="space-y-3 animate-slide-up delay-600">
                    <Button className="w-full bg-[#c48845] hover:bg-[#2c7242] text-white text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-6 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                      دفع الآن
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#858d9d]">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>الدفع آمن ومشفر بالكامل</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
