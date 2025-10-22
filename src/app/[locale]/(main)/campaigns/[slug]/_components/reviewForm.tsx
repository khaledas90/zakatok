"use client";

import type React from "react";

import { useState } from "react";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import placeholder from "@/assets/placehold.jpg";

export function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Review submitted:", { rating, comment });
    // Reset form
    setRating(0);
    setComment("");
  };

  return (
    <div className="bg-[#f2f2f2] rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={placeholder}
          alt="User"
          width={48}
          height={48}
          className="rounded-full"
        />
        <span className="font-medium text-[#2c7242]">صناع اليمن بكيت</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="اكتب تعليق ..."
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c7242] min-h-[100px] resize-none"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#5b5d6b]">تقييم</span>
            <StarRating
              rating={rating}
              interactive
              onRatingChange={setRating}
              size="md"
            />
          </div>

          <Button
            type="submit"
            className="bg-[#2c7242] hover:bg-[#235a35] text-white px-8"
            disabled={rating === 0 || comment.trim() === ""}
          >
            تعليق
          </Button>
        </div>
      </form>
    </div>
  );
}
