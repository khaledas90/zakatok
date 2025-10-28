"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import placeholder from "@/assets/placehold.jpg";

export default function ReplyForm() {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reply submitted:", { comment });
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={placeholder}
          alt="User"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-sm font-medium text-[#2c7242]">
          صناع اليمن بكيت
        </span>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="اكتب ردك..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c7242] min-h-[80px] resize-none text-sm"
      />

      <div className="flex items-center justify-end">
        <Button
          type="submit"
          className="bg-[#2c7242] hover:bg-[#235a35] text-white px-6 text-sm"
          disabled={comment.trim() === ""}
        >
          إرسال
        </Button>
      </div>
    </form>
  );
}
