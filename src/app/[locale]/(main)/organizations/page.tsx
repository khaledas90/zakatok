"use client";

import { useState } from "react";
import Image from "next/image";
import { Pagination } from "@/components/common/pagination";
import OrganizationCard from "@/components/common/organizationCard";
import { AlertBanner } from "@/components/ui/alert-banner";
import image1 from "@/assets/CampaignsOne.svg";
import image2 from "@/assets/CampaignsTwo.svg";
import image3 from "@/assets/CampaignsThree.svg";
import OrganizationsFilter from "./_components/organizationsFilter";
import AdsBanner from "@/components/common/AdsBanner";
import PageLoadAnimation from "@/components/common/PageLoadAnimation";
import ScrollAnimation, {
  StaggeredAnimation,
} from "@/components/common/ScrollAnimation";
import { useTranslations } from "next-intl";

export default function OrganizationsPage() {
  const t = useTranslations("common.organizations");
  const organizations = [
    {
      id: "1",
      name: "مؤسسة مستشفى سرطان الأطفال 57357",
      description:
        "أحد أكبر مستشفيات الأطفال في العالم يقع في القاهرة بمصر ويختص في علاج سرطانات الأطفال",
      image: image1,
      rating: 5,
      ratingCount: 12339,
      campaignsCount: 15,
      beneficiaries: "12,234k",
      badges: ["verified", "trending"],
      slug: "children-cancer-hospital-57357",
    },
    {
      id: "2",
      name: "جمعية البر الخيرية",
      description:
        "منظمة خيرية رائدة في المملكة العربية السعودية تعمل على دعم المحتاجين والأسر المتعففة",
      image: image2,
      rating: 4.8,
      ratingCount: 8567,
      campaignsCount: 23,
      beneficiaries: "8,500k",
      badges: ["verified", "featured"],
      slug: "al-birr-charity",
    },
    {
      id: "3",
      name: "مؤسسة الإمارات للأعمال الخيرية",
      description:
        "مؤسسة إنسانية تعمل على تقديم المساعدات للمحتاجين في دولة الإمارات العربية المتحدة",
      image: image3,
      rating: 4.9,
      ratingCount: 9876,
      campaignsCount: 18,
      beneficiaries: "9,200k",
      badges: ["verified"],
      slug: "emirates-charity-foundation",
    },
    {
      id: "4",
      name: "جمعية قطر الخيرية",
      description:
        "منظمة خيرية قطرية تعمل على دعم المشاريع الإنسانية والتنموية في قطر والعالم",
      image: image1,
      rating: 4.7,
      ratingCount: 6543,
      campaignsCount: 12,
      beneficiaries: "6,100k",
      badges: ["trending"],
      slug: "qatar-charity",
    },
    {
      id: "5",
      name: "مؤسسة الأردن الخيرية",
      description:
        "مؤسسة أردنية تعمل على تقديم المساعدات الإنسانية والتنموية للمحتاجين في الأردن",
      image: image2,
      rating: 4.6,
      ratingCount: 5432,
      campaignsCount: 9,
      beneficiaries: "5,300k",
      badges: ["verified"],
      slug: "jordan-charity-foundation",
    },
    {
      id: "6",
      name: "جمعية الكويت الخيرية",
      description:
        "منظمة خيرية كويتية رائدة في مجال العمل الإنساني والتنموي في الكويت والمنطقة",
      image: image3,
      rating: 4.8,
      ratingCount: 7890,
      campaignsCount: 14,
      beneficiaries: "7,800k",
      badges: ["verified", "featured"],
      slug: "kuwait-charity",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="container mx-auto px-4 pt-5">
        <ScrollAnimation animation="slideUp" delay={200}>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2c7242] mb-2 text-center">
              {t("pageTitle")}
            </h1>
            <p className="text-lg text-[#6b7280] text-center max-w-2xl mx-auto">
              {t("pageSubtitle")}
            </p>
          </div>
        </ScrollAnimation>

        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <ScrollAnimation animation="slideLeft" delay={300}>
            <div className="lg:w-[350px] mt-6">
              <AdsBanner
                width="100%"
                height="900px"
                orientation="vertical"
                bgColor="#2c7242"
                text={t("adSpace")}
              />
            </div>
          </ScrollAnimation>

          <div className="flex-1">
            <ScrollAnimation animation="fadeIn" delay={400}>
              <OrganizationsFilter />
            </ScrollAnimation>

            <StaggeredAnimation
              staggerDelay={100}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {organizations.map((org) => (
                <OrganizationCard
                  key={org.id}
                  {...org}
                  badges={
                    org.badges as ("verified" | "trending" | "featured")[]
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

