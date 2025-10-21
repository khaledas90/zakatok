"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?:
    | "fadeIn"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "scaleUp"
    | "rotate"
    | "bounce";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean; // Only animate once
  stagger?: boolean; // For staggered animations in lists
}

const animationVariants = {
  fadeIn: {
    initial: "opacity-0",
    animate: "opacity-100",
    transition: "transition-opacity duration-700 ease-out",
  },
  slideUp: {
    initial: "opacity-0 translate-y-8",
    animate: "opacity-100 translate-y-0",
    transition: "transition-all duration-700 ease-out",
  },
  slideDown: {
    initial: "opacity-0 -translate-y-8",
    animate: "opacity-100 translate-y-0",
    transition: "transition-all duration-700 ease-out",
  },
  slideLeft: {
    initial: "opacity-0 translate-x-8",
    animate: "opacity-100 translate-x-0",
    transition: "transition-all duration-700 ease-out",
  },
  slideRight: {
    initial: "opacity-0 -translate-x-8",
    animate: "opacity-100 translate-x-0",
    transition: "transition-all duration-700 ease-out",
  },
  scaleUp: {
    initial: "opacity-0 scale-95",
    animate: "opacity-100 scale-100",
    transition: "transition-all duration-600 ease-out",
  },
  rotate: {
    initial: "opacity-0 rotate-12 scale-95",
    animate: "opacity-100 rotate-0 scale-100",
    transition: "transition-all duration-800 ease-out",
  },
  bounce: {
    initial: "opacity-0 -translate-y-4 scale-95",
    animate: "opacity-100 translate-y-0 scale-100",
    transition: "transition-all duration-600 ease-out animate-bounce",
  },
};

export default function ScrollAnimation({
  children,
  animation = "fadeIn",
  delay = 0,
  duration = 700,
  threshold = 0.1,
  className,
  once = true,
  stagger = false,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasAnimated || !once) {
            setTimeout(() => {
              setIsVisible(true);
              if (once) setHasAnimated(true);
            }, delay);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay, threshold, once, hasAnimated]);

  const variant = animationVariants[animation];
  const customDuration = duration !== 700 ? `duration-[${duration}ms]` : "";

  return (
    <div
      ref={elementRef}
      className={cn(
        variant.transition,
        customDuration,
        isVisible ? variant.animate : variant.initial,
        stagger && "animate-delay-100",
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Specialized components for common use cases
export function FadeIn({
  children,
  delay = 0,
  className,
}: Omit<ScrollAnimationProps, "animation">) {
  return (
    <ScrollAnimation animation="fadeIn" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

export function SlideUp({
  children,
  delay = 0,
  className,
}: Omit<ScrollAnimationProps, "animation">) {
  return (
    <ScrollAnimation animation="slideUp" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

export function SlideDown({
  children,
  delay = 0,
  className,
}: Omit<ScrollAnimationProps, "animation">) {
  return (
    <ScrollAnimation animation="slideDown" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

export function SlideLeft({
  children,
  delay = 0,
  className,
}: Omit<ScrollAnimationProps, "animation">) {
  return (
    <ScrollAnimation animation="slideLeft" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

export function SlideRight({
  children,
  delay = 0,
  className,
}: Omit<ScrollAnimationProps, "animation">) {
  return (
    <ScrollAnimation animation="slideRight" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

export function ScaleUp({
  children,
  delay = 0,
  className,
}: Omit<ScrollAnimationProps, "animation">) {
  return (
    <ScrollAnimation animation="scaleUp" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

export function RotateIn({
  children,
  delay = 0,
  className,
}: Omit<ScrollAnimationProps, "animation">) {
  return (
    <ScrollAnimation animation="rotate" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

export function BounceIn({
  children,
  delay = 0,
  className,
}: Omit<ScrollAnimationProps, "animation">) {
  return (
    <ScrollAnimation animation="bounce" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

// Staggered animation wrapper for lists
export function StaggeredAnimation({
  children,
  staggerDelay = 100,
  className,
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <ScrollAnimation
          key={index}
          delay={index * staggerDelay}
          stagger={true}
        >
          {child}
        </ScrollAnimation>
      ))}
    </div>
  );
}
