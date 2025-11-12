"use client";

import Image from "next/image";
import { Eye, Star, Building2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Link as I18nLink } from "@/i18n/routing";

interface OrganizationCardProps {
  id: string;
  name: string;
  description: string;
  image: string | any;
  rating: number;
  ratingCount: number;
  campaignsCount: number;
  beneficiaries: string;
  badges?: Array<"verified" | "trending" | "featured">;
  slug: string;
}

export default function OrganizationCard({
  name,
  description,
  image,
  rating,
  ratingCount,
  campaignsCount,
  beneficiaries,
  badges = [],
  slug,
}: OrganizationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer h-[320px] sm:h-[360px] md:h-[400px] lg:h-[420px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40 sm:h-48 md:h-56 lg:h-60 overflow-hidden flex-shrink-0">
        <Image
          src={image?.src || image || "/placeholder.svg"}
          alt={name}
          fill
          className={`object-cover transition-transform duration-700 w-full h-full ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {badges.length > 0 && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1 sm:gap-2">
            {badges.includes("verified") && (
              <div className="bg-[#2c7242] text-white rounded-full p-1.5 sm:p-2 shadow-lg">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            {badges.includes("trending") && (
              <div className="bg-[#f79f1a] text-white rounded-full p-1.5 sm:p-2 shadow-lg">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            {badges.includes("featured") && (
              <div className="bg-[#3ABFF8] text-white rounded-full p-1.5 sm:p-2 shadow-lg">
                <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <I18nLink href={`/organizations/${slug}`}>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#202121] mb-2 sm:mb-3 line-clamp-2 group-hover:text-[#2c7242] transition-colors">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-[#6b7280] mb-3 sm:mb-4 line-clamp-3">
            {description}
          </p>
        </I18nLink>

        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-[#d9d9d9] mt-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm font-semibold text-[#202121]">
              {ratingCount.toLocaleString("en-US")}
            </span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    i < rating
                      ? "fill-[#f79f1a] text-[#f79f1a]"
                      : "fill-[#d9d9d9] text-[#d9d9d9]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 text-[#6b7280]">
            <div className="flex items-center gap-1">
              <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">{campaignsCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm">{beneficiaries}</span>
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

