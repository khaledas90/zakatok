import type React from "react";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

interface CountryCardProps {
  name: string;
  flagElement: StaticImageData;
}

export function CountryCard({ name, flagElement }: CountryCardProps) {
  const t = useTranslations("common.countries");

  return (
    <div
      className="group relative h-[220px] rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl "
      style={{
        backgroundImage: `url(${flagElement.src})`,
        backgroundSize: "cover",
        objectFit: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-[#f5f5f5] transition-opacity duration-500 opacity-0 group-hover:opacity-1"></div>

      <div className=" absolute inset-0  rounded-xl  border border-white/20  bg-white/10  group-hover:backdrop-blur-sm transition-all duration-500  group-hover:bg-white/20  group-hover:border-[#2c7242]/40"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500">
        <h3 className="text-xl font-bold text-[#202121] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 text-center mb-2 relative z-10">
          {name}
        </h3>

        <p className="text-sm text-[#000000] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 text-center relative z-10 font-arabic">
          {t("donateNow")}
        </p>

        <div className="mt-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 relative z-10">
          <svg
            className="w-6 h-6 text-black animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );
}
