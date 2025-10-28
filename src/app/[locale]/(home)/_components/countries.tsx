import { CountryCard } from "@/components/common/countryCard";
import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslations } from "next-intl";
import ImageEgypt from "@/assets/egypt.svg";
import ImageQater from "@/assets/qatar.svg";
import ImageSoudia from "@/assets/saudi-arabia.svg";
import ImageJordon from "@/assets/jordan.svg";
import ImageImarat from "@/assets/united-arab-emirates.svg";

export default function Countries() {
  const t = useTranslations("common.countries");

  return (
    <section className="container mx-auto px-4 py-16 bg-white">
      <div className="text-center mb-12">
        <div className="inline-block">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#c48845]"></div>
            <svg
              className="w-8 h-8 text-[#2c7242]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#c48845]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#202121] mb-2 font-arabic">
            {t("title")}
          </h2>
          <p className="text-[#6b7280] text-lg font-arabic">{t("subtitle")}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:max-w-7xl w-full mx-auto">
        <CountryCard name={t("countryNames.egypt")} flagElement={ImageEgypt} />
        <CountryCard
          name={t("countryNames.saudiArabia")}
          flagElement={ImageSoudia}
        />
        <CountryCard name={t("countryNames.uae")} flagElement={ImageImarat} />
        <CountryCard
          name={t("countryNames.jordan")}
          flagElement={ImageJordon}
        />
        <CountryCard name={t("countryNames.qatar")} flagElement={ImageQater} />
      </div>

      <div className="mt-12 text-center">
        <p className="text-[#6b7280] mb-4 font-arabic">{t("notSeeCountry")}</p>
        <Button className="bg-main hover:bg-main/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-arabic">
          {t("suggestNewCountry")}
        </Button>
      </div>
    </section>
  );
}
