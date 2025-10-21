"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScrollButtonsProps {
  className?: string;
  showThreshold?: number;
  smoothScrollDuration?: number;
}

export default function ScrollButtons({
  className,
  showThreshold = 300,
  smoothScrollDuration = 800,
}: ScrollButtonsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setIsVisible(scrollTop > showThreshold);

      setIsAtBottom(scrollTop + windowHeight >= documentHeight - 100);
    };

    window.addEventListener("scroll", toggleVisibility);

    toggleVisibility();

    // Cleanup
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [showThreshold]);

  const scrollToTop = () => {
    const startTime = performance.now();
    const startScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / smoothScrollDuration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentScrollTop = startScrollTop * (1 - easeOut);
      window.scrollTo(0, currentScrollTop);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed right-6 bottom-6 z-50 flex flex-col gap-3 transition-all duration-300",
        "animate-in slide-in-from-bottom-4 fade-in-0",
        className
      )}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
          "bg-[#2c7242] hover:bg-[#2c7242]/90 text-white",
          "hover:scale-110 active:scale-95",
          "group relative overflow-hidden"
        )}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />

        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200" />
      </Button>

      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#2c7242] to-transparent rounded-full opacity-50" />
    </div>
  );
}
