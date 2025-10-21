"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  MapPin,
  Users,
  TrendingUp,
  Heart,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

interface CountryDetailCardProps {
  country: {
    id: string;
    name: string;
    nameKey: string;
    flag: StaticImageData;
    region: string;
    population: string;
    povertyRate: string;
    activeProjects: string;
    beneficiaries: string;
    description: string;
    focusAreas: string[];
    recentAchievements: string[];
  };
  className?: string;
}

export function CountryDetailCard({
  country,
  className,
}: CountryDetailCardProps) {
  const t = useTranslations("common.countries");

  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group",
        className
      )}
    >
      <div className="h-60 bg-cover bg-center relative overflow-hidden">
        <Image
          src={country.flag}
          alt={country.name}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                {country.name}
              </h3>
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
              >
                {t(`regions.${country.region}`)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
          {country.description}
        </p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#2c7242] rounded-full"></div>
            {t("focusAreas")}:
          </h4>
          <div className="flex flex-wrap gap-1">
            {country.focusAreas.slice(0, 3).map((area, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-[#2c7242]/5 border-[#2c7242]/20 text-[#2c7242]"
              >
                {area.trim()}
              </Badge>
            ))}
            {country.focusAreas.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{country.focusAreas.length - 3} {t("more")}
              </Badge>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {t("recentAchievements")}:
          </h4>
          <ul className="space-y-1">
            {country.recentAchievements
              .slice(0, 2)
              .map((achievement, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-xs text-gray-600"
                >
                  <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{achievement.trim()}</span>
                </li>
              ))}
          </ul>
        </div>

        <Button className="w-full bg-[#2c7242] hover:bg-[#2c7242]/90 text-white group-hover:shadow-lg transition-all duration-300">
          {t("donateNow")}
        </Button>
      </div>
    </div>
  );
}
