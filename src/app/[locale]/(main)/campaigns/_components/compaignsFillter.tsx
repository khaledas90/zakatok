import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";
import React, { useState } from "react";

export default function CompaignsFillter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedPayment, setSelectedPayment] = useState("الكل");

  return (
    <div className="flex my-5 flex-wrap items-center gap-4">
      <div className="relative flex-1 max-w-3xl">
        <Input
          type="text"
          placeholder="ابحث"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pr-10 text-right border-[#d9d9d9] focus:border-[#2c7242]"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858d9d]" />
      </div>
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="appearance-none bg-white border border-[#d9d9d9] rounded-lg px-4 py-2 pr-10 text-[#202121] cursor-pointer hover:border-[#2c7242] focus:outline-none focus:border-[#2c7242] transition-colors"
        >
          <option value="الكل">التصنيفات</option>
          <option value="صحة">صحة</option>
          <option value="تعليم">تعليم</option>
          <option value="طوارئ">طوارئ</option>
        </select>
        <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858d9d] pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
          className="appearance-none bg-white border border-[#d9d9d9] rounded-lg px-4 py-2 pr-10 text-[#202121] cursor-pointer hover:border-[#2c7242] focus:outline-none focus:border-[#2c7242] transition-colors"
        >
          <option value="الكل">طريقة الدفع</option>
          <option value="بطاقة">بطاقة ائتمان</option>
          <option value="فوري">فوري</option>
          <option value="محفظة">محفظة إلكترونية</option>
        </select>
        <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858d9d] pointer-events-none" />
      </div>
    </div>
  );
}
