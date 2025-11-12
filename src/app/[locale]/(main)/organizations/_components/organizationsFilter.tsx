"use client";

import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

export default function OrganizationsFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const t = useTranslations("common.organizations");

  return (
    <div className="flex my-5 flex-wrap items-center gap-4">
      <div className="relative flex-1 max-w-3xl">
        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
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
          <option value="all">{t("allCategories")}</option>
          <option value="health">{t("health")}</option>
          <option value="education">{t("education")}</option>
          <option value="emergency">{t("emergency")}</option>
          <option value="social">{t("social")}</option>
        </select>
        <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858d9d] pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="appearance-none bg-white border border-[#d9d9d9] rounded-lg px-4 py-2 pr-10 text-[#202121] cursor-pointer hover:border-[#2c7242] focus:outline-none focus:border-[#2c7242] transition-colors"
        >
          <option value="all">{t("allCountries")}</option>
          <option value="saudi">{t("saudiArabia")}</option>
          <option value="egypt">{t("egypt")}</option>
          <option value="uae">{t("uae")}</option>
          <option value="jordan">{t("jordan")}</option>
        </select>
        <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858d9d] pointer-events-none" />
      </div>
    </div>
  );
}

