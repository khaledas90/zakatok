"use client";

import { useState } from "react";
import { StarRating } from "@/components/ui/star-rating";
import { ThumbsUp, ThumbsDown, MessageCircle, Flag } from "lucide-react";
import Image from "next/image";
import placeholder from "@/assets/placehold.jpg";
import ReplyForm from "./replyForm";

interface Reply {
  userName: string;
  userAvatar: string;
  date: string;
  comment: string;
  likes: number;
  dislikes: number;
}

interface ReviewCardProps {
  userName: string;
  userAvatar: string;
  date: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes?: number;
  replies?: Reply[];
}

export default function ReviewCard({
  userName,
  userAvatar,
  date,
  rating,
  comment,
  likes,
  dislikes = 0,
  replies = [],
}: ReviewCardProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      if (isDisliked) {
        setDislikeCount(dislikeCount - 1);
        setIsDisliked(false);
      }
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleDislike = () => {
    if (isDisliked) {
      setDislikeCount(dislikeCount - 1);
    } else {
      if (isLiked) {
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      }
      setDislikeCount(dislikeCount + 1);
    }
    setIsDisliked(!isDisliked);
  };

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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center cursor-pointer gap-2 text-[#2c7242] hover:text-[#235a35] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>رد ({replies.length})</span>
          </button>
          <button
            onClick={handleLike}
            className={`flex items-center cursor-pointer gap-2 transition-colors ${
              isLiked
                ? "text-[#2c7242] hover:text-[#235a35]"
                : "text-[#5b5d6b] hover:text-[#2c7242]"
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{likeCount}</span>
          </button>
          <button
            onClick={handleDislike}
            className={`flex items-center cursor-pointer gap-2 transition-colors ${
              isDisliked
                ? "text-[#e52836] hover:text-[#cb2026]"
                : "text-[#5b5d6b] hover:text-[#e52836]"
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
            <span>{dislikeCount}</span>
          </button>
        </div>
        <button className="flex items-center cursor-pointer gap-2 text-[#e52836] hover:text-[#cb2026] transition-colors text-sm">
          <Flag className="w-4 h-4" />
          <span>الإبلاغ</span>
        </button>
      </div>

      {showReplyForm && (
        <div className="mt-4 pt-4 border-t">
          <ReplyForm />
        </div>
      )}

      {replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {replies.map((reply, index) => (
            <div key={index} className="pl-6 pr-4 py-3 bg-[#f2f2f2] rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={reply.userAvatar || placeholder}
                  alt={reply.userName}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <h5 className="text-sm font-medium text-[#2c7242]">
                    {reply.userName}
                  </h5>
                  <p className="text-xs text-[#858d9d]">{reply.date}</p>
                </div>
              </div>
              <p className="text-sm text-[#5b5d6b] leading-relaxed">
                {reply.comment}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs">
                <button className="flex items-center cursor-pointer gap-1 text-[#2c7242] hover:text-[#235a35] transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{reply.likes}</span>
                </button>
                <button className="flex items-center cursor-pointer gap-1 text-[#e52836] hover:text-[#cb2026] transition-colors">
                  <ThumbsDown className="w-3 h-3" />
                  <span>{reply.dislikes}</span>
                </button>
                <button className="flex items-center cursor-pointer gap-1 text-[#e52836] hover:text-[#cb2026] transition-colors">
                  <Flag className="w-3 h-3" />
                  <span>الإبلاغ</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
