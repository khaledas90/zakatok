"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PageLoadAnimationProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export default function PageLoadAnimation({
  children,
  className,
  duration = 1000,
  delay = 0,
}: PageLoadAnimationProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        "transition-all ease-out",
        isLoaded
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95",
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Specialized page load animations
export function FadeInOnLoad({
  children,
  className,
  delay = 0,
}: Omit<PageLoadAnimationProps, "duration">) {
  return (
    <PageLoadAnimation
      className={cn("transition-opacity duration-700", className)}
      duration={700}
      delay={delay}
    >
      {children}
    </PageLoadAnimation>
  );
}

export function SlideUpOnLoad({
  children,
  className,
  delay = 0,
}: Omit<PageLoadAnimationProps, "duration">) {
  return (
    <PageLoadAnimation
      className={cn("transition-all duration-800", className)}
      duration={800}
      delay={delay}
    >
      {children}
    </PageLoadAnimation>
  );
}

export function ScaleUpOnLoad({
  children,
  className,
  delay = 0,
}: Omit<PageLoadAnimationProps, "duration">) {
  return (
    <PageLoadAnimation
      className={cn("transition-all duration-600", className)}
      duration={600}
      delay={delay}
    >
      {children}
    </PageLoadAnimation>
  );
}
