"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  isDir?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  interactive = false,
  isDir = false,
  onRatingChange,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {isDir ? (
        <>
          {Array.from({ length: maxRating }, (_, i) => i + 1).map((value) => (
            <Star
              key={value}
              className={`${sizeClasses[size]} ${
                value <= rating
                  ? "fill-[#ffb600] text-[#ffb600]"
                  : "fill-gray-300 text-gray-300"
              } ${
                interactive
                  ? "cursor-pointer hover:scale-110 transition-transform"
                  : ""
              }`}
              onClick={() => handleClick(value)}
            />
          ))}

          {showValue && (
            <span className="text-lg font-bold ml-2">
              {rating} من {maxRating}
            </span>
          )}
        </>
      ) : (
        <>
          {showValue && (
            <span className="text-lg font-bold ml-2">
              {rating} من {maxRating}
            </span>
          )}
          {Array.from({ length: maxRating }, (_, i) => i + 1).map((value) => (
            <Star
              key={value}
              className={`${sizeClasses[size]} ${
                value <= rating
                  ? "fill-[#ffb600] text-[#ffb600]"
                  : "fill-gray-300 text-gray-300"
              } ${
                interactive
                  ? "cursor-pointer hover:scale-110 transition-transform"
                  : ""
              }`}
              onClick={() => handleClick(value)}
            />
          ))}
        </>
      )}
    </div>
  );
}
