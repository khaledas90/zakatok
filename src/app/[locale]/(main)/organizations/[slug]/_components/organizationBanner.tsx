"use client";

import { Calendar, ChevronDown, Phone, Users, MapPin, Globe, Building2 } from "lucide-react";
import Image from "next/image";
import campaignsTwo from "@/assets/CampaignsTwo.svg";
import { RatingOverview } from "@/app/[locale]/(main)/campaigns/[slug]/_components/ratingOverview";
import { DonationModal } from "@/app/[locale]/(main)/campaigns/_components/donationModal";
import { useTranslations } from "next-intl";

export default function OrganizationBanner() {
  const t = useTranslations("common.organizations.details");

  return (
    <div className="bg-[#bb7b2f] text-white py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-28">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 w-full lg:w-auto">
            <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
              <div className="flex-shrink-0">
                <Image
                  src={campaignsTwo}
                  alt="Organization logo"
                  width={300}
                  height={300}
                  className="w-32 h-32 md:w-60 md:h-60 lg:w-80 lg:h-80 object-contain"
                />
              </div>
              <div className="text-center md:text-right flex flex-col gap-3 max-w-md lg:max-w-lg">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white">
                  {t("organizationName")}
                </h2>
                <RatingOverview />
                <div className="flex flex-col gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-white">
                    {t("about")}
                  </h1>
                  <p className="text-xs sm:text-sm text-white text-justify leading-relaxed">
                    {t("description")}
                  </p>
                </div>
                <DonationModal />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-3 text-xs sm:text-sm text-white w-full lg:w-auto lg:min-w-[280px]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{t("establishedDate")}: {t("establishedDateValue")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{t("phone")}: {t("phoneValue")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span>{t("members")}: {t("membersValue")}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{t("address")}: {t("addressValue")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 flex-shrink-0" />
              <span>{t("campaigns")}: {t("campaignsValue")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span>{t("website")}:</span>
              <a
                href="https://www.example.com"
                className="underline text-white hover:text-gray-200 transition-colors break-all"
              >
                www.example.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <a
                href="https://www.google.com/maps"
                className="underline text-white hover:text-gray-200 transition-colors"
              >
                {t("viewOnMap")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

