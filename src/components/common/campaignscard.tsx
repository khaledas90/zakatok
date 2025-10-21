"use client";

import Image from "next/image";
import { Eye, Star } from "lucide-react";
import { useState } from "react";

interface CampaignscardProps {
  id: string;
  title: string;
  description: string;
  image: string | any; // Allow both string paths and imported images
  rating: number;
  ratingCount: number;
  beneficiaries: string;
  badges?: Array<"verified" | "trending" | "urgent">;
}

export default function CampaignsCard({
  title,
  description,
  image,
  rating,
  ratingCount,
  beneficiaries,
  badges = [],
}: CampaignscardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer h-[350px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <Image
          src={image?.src || image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-fill transition-transform duration-700 w-full h-full ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {badges.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-2">
            {badges.includes("verified") && (
              <div className="bg-[#2c7242] text-white rounded-full p-1.5 shadow-lg">
                <svg
                  className="w-4 h-4"
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
              <div className="bg-[#f79f1a] text-white rounded-full p-1.5 shadow-lg">
                <svg
                  className="w-4 h-4"
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
            {badges.includes("urgent") && (
              <div className="bg-[#e52836] text-white rounded-full p-1.5 shadow-lg animate-pulse">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        )}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#2c7242]/90 to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute bottom-4 right-4 left-4">
            <button className="w-full bg-white text-[#2c7242] py-2 rounded-lg font-semibold hover:bg-[#f5f5f5] transition-colors">
              تبرع الآن
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-[#202121] mb-2 line-clamp-2 group-hover:text-[#2c7242] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-[#6b7280] mb-2 line-clamp-2 ">
          {description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-[#d9d9d9] mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#202121]">
              {ratingCount.toLocaleString()}
            </span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating
                      ? "fill-[#f79f1a] text-[#f79f1a]"
                      : "fill-[#d9d9d9] text-[#d9d9d9]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[#6b7280]">
            <span className="text-sm">{beneficiaries}</span>
            <Eye className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
