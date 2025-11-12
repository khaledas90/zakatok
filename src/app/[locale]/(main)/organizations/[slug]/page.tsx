"use client";

import ReviewCard from "@/components/common/reviewCard";
import { ReviewForm } from "@/app/[locale]/(main)/campaigns/[slug]/_components/reviewForm";
import AsideDetails from "@/app/[locale]/(main)/campaigns/[slug]/_components/asideDetails";
import OrganizationBanner from "./_components/organizationBanner";
import NewsSlider from "@/app/[locale]/(main)/campaigns/[slug]/_components/NewsSlider";
import CampaignsCard from "@/components/common/campaignscard";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import image1 from "@/assets/CampaignsOne.svg";
import image2 from "@/assets/CampaignsTwo.svg";
import image3 from "@/assets/CampaignsThree.svg";
import ScrollAnimation, {
  StaggeredAnimation,
} from "@/components/common/ScrollAnimation";

export default function OrganizationDetails() {
  const t = useTranslations("common.organizations.details");

  const contentCards = [
    {
      imageUrl: "",
      title: t("news1.title"),
      description: t("news1.description"),
    },
    {
      imageUrl: "",
      title: t("news2.title"),
      description: t("news2.description"),
    },
    {
      imageUrl: "",
      title: t("news3.title"),
      description: t("news3.description"),
    },
  ];

  const organizationCampaigns = [
    {
      id: "1",
      title: t("campaign1.title"),
      description: t("campaign1.description"),
      image: image1,
      rating: 5,
      ratingCount: 12339,
      beneficiaries: "12,234k",
      badges: ["verified", "trending"],
    },
    {
      id: "2",
      title: t("campaign2.title"),
      description: t("campaign2.description"),
      image: image2,
      rating: 4.8,
      ratingCount: 8567,
      beneficiaries: "8,500k",
      badges: ["verified"],
    },
    {
      id: "3",
      title: t("campaign3.title"),
      description: t("campaign3.description"),
      image: image3,
      rating: 4.9,
      ratingCount: 9876,
      beneficiaries: "9,200k",
      badges: ["urgent"],
    },
  ];

  const reviews = [
    {
      userName: t("review1.userName"),
      userAvatar: "",
      date: t("review1.date"),
      rating: 5,
      comment: t("review1.comment"),
      likes: 21,
      dislikes: 2,
      replies: [
        {
          userName: t("review1.reply1.userName"),
          userAvatar: "",
          date: t("review1.reply1.date"),
          comment: t("review1.reply1.comment"),
          likes: 5,
          dislikes: 0,
        },
      ],
    },
    {
      userName: t("review2.userName"),
      userAvatar: "",
      date: t("review2.date"),
      rating: 5,
      comment: t("review2.comment"),
      likes: 21,
      dislikes: 0,
      replies: [],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <OrganizationBanner />

      <main className="lg:container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="block lg:hidden">
            <AsideDetails />
          </div>
          <div className="flex-1">
            {/* Campaigns Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#2c7242]">
                  {t("ourCampaigns")}
                </h2>
                <Link
                  href="/campaigns"
                  className="text-[#c48845] hover:text-[#2c7242] transition-colors"
                >
                  {t("viewAll")}
                </Link>
              </div>
              <StaggeredAnimation
                staggerDelay={100}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {organizationCampaigns.map((campaign) => (
                  <CampaignsCard
                    key={campaign.id}
                    {...campaign}
                    badges={
                      campaign.badges as ("verified" | "trending" | "urgent")[]
                    }
                  />
                ))}
              </StaggeredAnimation>
            </div>

            {/* News Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#2c7242]">
                  {t("latestNews")}
                </h2>
                <Link
                  href="/news"
                  className="text-[#c48845] hover:text-[#2c7242] transition-colors"
                >
                  {t("viewAll")}
                </Link>
              </div>
              <NewsSlider news={contentCards} />
            </div>

            {/* Reviews Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#2c7242]">
                  {t("donorReviews")}
                </h2>
                <Link
                  href="#"
                  className="text-[#c48845] hover:text-[#2c7242] transition-colors"
                >
                  {t("viewAll")}
                </Link>
              </div>
              {reviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </div>

            <ReviewForm />
          </div>

          <div className="lg:w-80 hidden lg:block">
            <AsideDetails />
          </div>
        </div>
      </main>
    </div>
  );
}

