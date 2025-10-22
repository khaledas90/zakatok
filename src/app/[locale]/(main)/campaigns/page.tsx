"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, ChevronDown, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/common/pagination";
import Link from "next/link";
import CampaignsCard from "@/components/common/campaignscard";
import { AlertBanner } from "@/components/ui/alert-banner";
import image1 from "@/assets/CampaignsOne.svg";
import image2 from "@/assets/CampaignsTwo.svg";
import image3 from "@/assets/CampaignsThree.svg";
import CompaignsFillter from "./_components/compaignsFillter";
import AdsBanner from "@/components/common/AdsBanner";
import FamousCampaigns from "./_components/famousCampaigns";
import PageLoadAnimation from "@/components/common/PageLoadAnimation";
import ScrollAnimation, {
  StaggeredAnimation,
} from "@/components/common/ScrollAnimation";
import SuccessModal from "./[slug]/_components/successModal";

export default function campaigns() {
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
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="container mx-auto px-4 pt-5">
        <ScrollAnimation animation="slideUp" delay={200}>
          <FamousCampaigns />
        </ScrollAnimation>
        {/* <SuccessModal isOpen={true} onClose={() => {}} /> */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <ScrollAnimation animation="slideLeft" delay={300}>
            <div className="lg:w-[350px] mt-6">
              <AdsBanner
                width="100%"
                height="900px"
                orientation="vertical"
                bgColor="#2c7242"
                text="مساحة إعلانية"
              />
            </div>
          </ScrollAnimation>

          <div className="flex-1">
            <ScrollAnimation animation="fadeIn" delay={400}>
              <CompaignsFillter />
            </ScrollAnimation>

            <StaggeredAnimation
              staggerDelay={100}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {projects.map((project) => (
                <CampaignsCard
                  key={project.id}
                  {...project}
                  badges={
                    project.badges as ("verified" | "trending" | "urgent")[]
                  }
                />
              ))}
            </StaggeredAnimation>

            <ScrollAnimation animation="scaleUp" delay={500}>
              <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={setCurrentPage}
              />
            </ScrollAnimation>
          </div>
        </div>
      </main>
    </div>
  );
}
