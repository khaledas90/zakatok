"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface AlertBannerProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  dismissible?: boolean;
}

export function AlertBanner({
  message,
  type = "info",
  dismissible = true,
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const bgColors = {
    info: "bg-[#2c7242]",
    success: "bg-[#2c7242]",
    warning: "bg-[#f79f1a]",
    error: "bg-[#e52836]",
  };

  return (
    <div className={`${bgColors[type]} text-white py-3 px-4 animate-slideDown`}>
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm md:text-base text-center flex-1">{message}</p>
        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="mr-4 hover:opacity-80 transition-opacity"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
