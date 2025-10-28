"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Search,
  Filter,
  MapPin,
  Users,
  TrendingUp,
  Heart,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PageLoadAnimation from "@/components/common/PageLoadAnimation";
import ScrollAnimation, {
  StaggeredAnimation,
  SlideUp,
  FadeIn,
  ScaleUp,
} from "@/components/common/ScrollAnimation";
import { CountryDetailCard } from "@/components/common/CountryDetailCard";
import ImageEgypt from "@/assets/egypt.svg";
import ImageQater from "@/assets/qatar.svg";
import ImageSoudia from "@/assets/saudi-arabia.svg";
import ImageJordon from "@/assets/jordan.svg";
import ImageImarat from "@/assets/united-arab-emirates.svg";
import FindCountry from "./_components/findCountry";
import HowHelp from "./_components/howHelp";
import { MapSection } from "../../(home)/_components/mapSection";

interface Country {
  id: string;
  name: string;
  nameKey: string;
  flag: any;
  region: string;
  population: string;
  povertyRate: string;
  activeProjects: string;
  beneficiaries: string;
  description: string;
  focusAreas: string[];
  recentAchievements: string[];
}

export default function CountriesPage() {
  const t = useTranslations("common.countries");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const countries: Country[] = [
    {
      id: "egypt",
      nameKey: "egypt",
      flag: ImageEgypt,
      region: "northAfrica",
      population: t("countryDetails.egypt.population"),
      povertyRate: t("countryDetails.egypt.povertyRate"),
      activeProjects: t("countryDetails.egypt.activeProjects"),
      beneficiaries: t("countryDetails.egypt.beneficiaries"),
      description: t("countryDetails.egypt.description"),
      focusAreas: t.raw("countryDetails.egypt.focusAreas"),
      recentAchievements: t.raw("countryDetails.egypt.recentAchievements"),
      name: t("countryNames.egypt"),
    },
    {
      id: "saudiArabia",
      nameKey: "saudiArabia",
      flag: ImageSoudia,
      region: "gulf",
      population: t("countryDetails.saudiArabia.population"),
      povertyRate: t("countryDetails.saudiArabia.povertyRate"),
      activeProjects: t("countryDetails.saudiArabia.activeProjects"),
      beneficiaries: t("countryDetails.saudiArabia.beneficiaries"),
      description: t("countryDetails.saudiArabia.description"),
      focusAreas: t.raw("countryDetails.saudiArabia.focusAreas"),
      recentAchievements: t.raw(
        "countryDetails.saudiArabia.recentAchievements"
      ),
      name: t("countryNames.saudiArabia"),
    },
    {
      id: "uae",
      nameKey: "uae",
      flag: ImageImarat,
      region: "gulf",
      population: t("countryDetails.uae.population"),
      povertyRate: t("countryDetails.uae.povertyRate"),
      activeProjects: t("countryDetails.uae.activeProjects"),
      beneficiaries: t("countryDetails.uae.beneficiaries"),
      description: t("countryDetails.uae.description"),
      focusAreas: t.raw("countryDetails.uae.focusAreas"),
      recentAchievements: t.raw("countryDetails.uae.recentAchievements"),
      name: t("countryNames.uae"),
    },
    {
      id: "jordan",
      nameKey: "jordan",
      flag: ImageJordon,
      region: "levant",
      population: t("countryDetails.jordan.population"),
      povertyRate: t("countryDetails.jordan.povertyRate"),
      activeProjects: t("countryDetails.jordan.activeProjects"),
      beneficiaries: t("countryDetails.jordan.beneficiaries"),
      description: t("countryDetails.jordan.description"),
      focusAreas: t.raw("countryDetails.jordan.focusAreas"),
      recentAchievements: t.raw("countryDetails.jordan.recentAchievements"),
      name: t("countryNames.jordan"),
    },
    {
      id: "qatar",
      nameKey: "qatar",
      flag: ImageQater,
      region: "gulf",
      population: t("countryDetails.qatar.population"),
      povertyRate: t("countryDetails.qatar.povertyRate"),
      activeProjects: t("countryDetails.qatar.activeProjects"),
      beneficiaries: t("countryDetails.qatar.beneficiaries"),
      description: t("countryDetails.qatar.description"),
      focusAreas: t.raw("countryDetails.qatar.focusAreas"),
      recentAchievements: t.raw("countryDetails.qatar.recentAchievements"),
      name: t("countryNames.qatar"),
    },
  ];

  const regions = [
    { key: "all", name: t("allRegions") },
    { key: "northAfrica", name: t("regions.northAfrica") },
    { key: "gulf", name: t("regions.gulf") },
    { key: "levant", name: t("regions.levant") },
    { key: "peninsula", name: t("regions.peninsula") },
  ];

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "all" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const impactStats = [
    {
      icon: Globe,
      value: "16",
      label: t("totalCountries"),
      color: "text-blue-600",
    },
    {
      icon: Users,
      value: "6.5M+",
      label: t("totalBeneficiaries"),
      color: "text-green-600",
    },
    {
      icon: TrendingUp,
      value: "491",
      label: t("activeProjects"),
      color: "text-purple-600",
    },
    {
      icon: Heart,
      value: "100%",
      label: t("impactStats.transparency"),
      color: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <PageLoadAnimation delay={100}>
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#c48845]"></div>
                <div className="p-2 bg-[#2c7242]/10 rounded-lg">
                  <Globe className="w-8 h-8 text-[#2c7242]" />
                </div>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#c48845]"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#202121] mb-4">
                {t("pageTitle")}
              </h1>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                {t("pageSubtitle")}
              </p>
            </div>
          </div>
        </div>
      </PageLoadAnimation>

      <ScrollAnimation animation="slideUp" delay={200}>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <ScrollAnimation
                key={stat.label}
                animation="scaleUp"
                delay={index * 100}
              >
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 mb-4 ${stat.color}`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-[#202121] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </ScrollAnimation>

      <ScrollAnimation animation="fadeIn" delay={300}>
        <div className="container mx-auto px-4 py-8">
          <div className=" rounded-xl  border border-gray-100 p-2">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 p-5"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c7242] focus:border-transparent"
                >
                  {regions.map((region) => (
                    <option key={region.key} value={region.key}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      <div className="container mx-auto px-4 py-8">
        <StaggeredAnimation
          staggerDelay={100}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCountries.map((country) => (
            <ScrollAnimation key={country.id} animation="slideUp">
              <CountryDetailCard country={country} />
            </ScrollAnimation>
          ))}
        </StaggeredAnimation>

        {filteredCountries.length === 0 && (
          <ScrollAnimation animation="fadeIn">
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t("noResultsFound")}
              </h3>
              <p className="text-gray-500 mb-4">{t("noResultsDescription")}</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRegion("all");
                }}
              >
                {t("clearFilters")}
              </Button>
            </div>
          </ScrollAnimation>
        )}
      </div>
      <HowHelp />
      <MapSection />
      <FindCountry />
    </div>
  );
}
