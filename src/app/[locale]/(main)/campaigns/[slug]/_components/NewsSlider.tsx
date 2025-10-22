"use client";
import React from "react";
import { useLocale } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import NewsCard from "@/components/common/newsCard";

export default function NewsSlider({ news }: { news: any[] }) {
  const locale = useLocale();
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    direction:
      typeof locale === "string" && locale.startsWith("en") ? "ltr" : "rtl",
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 1 },
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });
  return (
    <div ref={emblaRef} className="overflow-hidden px-2 sm:px-4 lg:px-6 pb-8">
      <div className="flex">
        {news.map((card, index) => (
          <div
            key={index}
            className="flex-[0_0_100%] xs:flex-[0_0_50%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] px-1 sm:px-2"
          >
            <NewsCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
}
