"use client";
import { StarRating } from "@/components/ui/star-rating";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function RatingOverview() {
  const [showDetails, setShowDetails] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        setShowDetails(false);
      }
    };

    if (showDetails) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDetails]);

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-center md:justify-start  gap-2  text-yellow-400">
        <StarRating rating={5} size="lg" />
        <ChevronDown
          className="w-5 h-5 mt-1 cursor-pointer text-white"
          onClick={() => setShowDetails(!showDetails)}
        />
        <span className="text-white text-md">12,339</span>
      </div>

      {showDetails && (
        <div
          ref={detailsRef}
          className={`absolute text-black z-50 ${"top-full w-full left-1/2 transform -translate-x-1/2 mt-2"}`}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-4 sm:p-6 ${
              isLargeScreen ? "mb-0" : "mb-8 min-w-[320px] sm:min-w-[400px]"
            }`}
          >
            <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-8">
              <div className="flex-shrink-0 text-center w-full lg:w-auto">
                <div className="mb-4">
                  <StarRating rating={5} size="lg" showValue isDir />
                </div>
                <div className="text-xs sm:text-sm text-[#5b5d6b]">
                  من 12,339 التقييمات
                </div>
              </div>

              <div className="flex-1 space-y-2 sm:space-y-3 w-full">
                <ProgressBar percentage={73} label="5 نجوم" color="#ffb600" />
                <ProgressBar percentage={16} label="4 نجوم" color="#ffb600" />
                <ProgressBar percentage={6} label="3 نجوم" color="#ffb600" />
                <ProgressBar percentage={2} label="نجمتان" color="#ffb600" />
                <ProgressBar percentage={3} label="نجمة" color="#ffb600" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
