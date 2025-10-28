"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CampaignsCard from "@/components/common/campaignscard";

export default function FamousSlider({ projects }: { projects: any[] }) {
  const locale = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    direction:
      typeof locale === "string" && locale.startsWith("en") ? "ltr" : "rtl",
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 1 },
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 4 },
    },
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative group">
      <div ref={emblaRef} className="overflow-hidden px-2 sm:px-4 lg:px-6 pb-8">
        <div className="flex">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] xs:flex-[0_0_50%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] px-1 sm:px-2"
            >
              <CampaignsCard
                key={project.id}
                {...project}
                badges={
                  project.badges as ("verified" | "trending" | "urgent")[]
                }
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        className="absolute left-2 top-1/2 cursor-pointer -translate-y-1/2 z-20 bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        className="absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 z-20 bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
