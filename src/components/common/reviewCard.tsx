import { StarRating } from "@/components/ui/star-rating";
import { ThumbsUp, Flag } from "lucide-react";
import Image from "next/image";
import placeholder from "@/assets/placehold.jpg";
interface ReviewCardProps {
  userName: string;
  userAvatar: string;
  date: string;
  rating: number;
  comment: string;
  likes: number;
}

export default function ReviewCard({
  userName,
  userAvatar,
  date,
  rating,
  comment,
  likes,
}: ReviewCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Image
            src={userAvatar || placeholder}
            alt={userName}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h4 className="font-medium text-[#2c7242]">{userName}</h4>
            <p className="text-xs text-[#858d9d]">{date}</p>
          </div>
        </div>
        <StarRating rating={rating} size="sm" />
      </div>

      <p className="text-sm text-[#5b5d6b] leading-relaxed mb-4">{comment}</p>

      <div className="flex items-center justify-end gap-4 text-sm">
        <button className="flex items-center cursor-pointer gap-2 text-[#e52836] hover:text-[#cb2026] transition-colors">
          <Flag className="w-4 h-4" />
          <span>الإبلاغ</span>
        </button>
        <button className="flex items-center cursor-pointer gap-2 text-[#2c7242] hover:text-[#235a35] transition-colors">
          <ThumbsUp className="w-4 h-4" />
          <span>إعجاب ({likes})</span>
        </button>
      </div>
    </div>
  );
}
