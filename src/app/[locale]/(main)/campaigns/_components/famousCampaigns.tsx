import CampaignsCard from "@/components/common/campaignscard";
import { ChevronLeft } from "lucide-react";
import React from "react";
import image1 from "@/assets/CampaignsOne.svg";
import image2 from "@/assets/CampaignsTwo.svg";
import image3 from "@/assets/CampaignsThree.svg";
import FamousSlider from "./FamousSlider";
export default function FamousCampaigns() {
  const projects = [
    {
      id: "1",
      title: "هنا اسم الحملة بشكل كامل",
      description:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من",
      image: image1,
      rating: 5,
      ratingCount: 12339,
      beneficiaries: "12,234k",
      badges: ["verified", "trending"],
    },
    {
      id: "2",
      title: "هنا اسم الحملة بشكل كامل",
      description:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من",
      image: image2,
      rating: 5,
      ratingCount: 12339,
      beneficiaries: "12,234k",
      badges: [],
    },
    {
      id: "3",
      title: "هنا اسم الحملة بشكل كامل",
      description:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من",
      image: image3,
      rating: 5,
      ratingCount: 12339,
      beneficiaries: "12,234k",
      badges: [],
    },
    {
      id: "4",
      title: "هنا اسم الحملة بشكل كامل",
      description:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من",
      image: image2,
      rating: 5,
      ratingCount: 12339,
      beneficiaries: "12,234k",
      badges: ["urgent"],
    },
    {
      id: "5",
      title: "هنا اسم الحملة بشكل كامل",
      description:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من",
      image: image3,
      rating: 5,
      ratingCount: 12339,
      beneficiaries: "12,234k",
      badges: ["verified"],
    },
    {
      id: "6",
      title: "هنا اسم الحملة بشكل كامل",
      description:
        "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من",
      image: image1,
      rating: 5,
      ratingCount: 12339,
      beneficiaries: "12,234k",
      badges: ["verified"],
    },
  ];
  return (
    <div className="bg-[#d6efde] rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="lg:text-3xl md:text-xl sm:text-lg text-base font-bold text-[#202121]">
          مشهور في مصر
        </h1>
        <button className="text-[#2c7242] lg:text-base md:text-sm sm:text-xs text-xs hover:text-[#245a35] font-semibold flex items-center  transition-colors">
          <span className="lg:text-base md:text-sm sm:text-xs text-xs font-semibold">
            عرض المزيد
          </span>
          <ChevronLeft className="lg:w-5 lg:h-5 md:w-4 md:h-4 w-3 h-3" />
        </button>
      </div>
      <FamousSlider projects={projects} />
    </div>
  );
}
