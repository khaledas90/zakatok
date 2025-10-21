import CampaignsCard from "@/components/common/campaignscard";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { projects } from "../page";

export default function FamousCampaigns() {
  return (
    <div className="bg-[#d6efde] rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#202121]">مشهور في مصر</h1>
        <button className="text-[#2c7242] hover:text-[#245a35] font-semibold flex items-center  transition-colors">
          <span>عرض المزيد</span>
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {projects.slice(0, 5).map((project) => (
          <CampaignsCard
            key={project.id}
            {...project}
            badges={project.badges as ("verified" | "trending" | "urgent")[]}
          />
        ))}
      </div>
    </div>
  );
}
