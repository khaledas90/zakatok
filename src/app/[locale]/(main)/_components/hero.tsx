"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import ImageOne from "@/assets/heart.jpg";
import ImageTwo from "@/assets/dirt-plants.jpg";
import ImageThree from "@/assets/kids-organising.jpg";
import ImageFour from "@/assets/man-holding.jpg";
export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const t = useTranslations("common.hero");

  const slides = [
    {
      image: ImageOne,
      title: t("slide1.title"),
      subtitle: t("slide1.subtitle"),
      cta: t("slide1.cta"),
    },
    {
      image: ImageTwo,
      title: t("slide2.title"),
      subtitle: t("slide2.subtitle"),
      cta: t("slide2.cta"),
    },
    {
      image: ImageThree,
      title: t("slide3.title"),
      subtitle: t("slide3.subtitle"),
      cta: t("slide3.cta"),
    },
    {
      image: ImageFour,
      title: t("slide4.title"),
      subtitle: t("slide4.subtitle"),
      cta: t("slide4.cta"),
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative lg:mx-6 mx-1.5 my-5 h-[calc(100vh-120px)] rounded-md overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 font-arabic">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 max-w-5xl leading-relaxed animate-fade-in">
              {slide.title}
            </h1>
            <p className="text-base md:text-lg opacity-90 mb-6 animate-fade-in-delay">
              {slide.subtitle}
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all animate-fade-in-delay-2"
            >
              {slide.cta}
            </Button>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 cursor-pointer top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full cursor-pointer ${
              index === currentSlide
                ? "bg-white w-12 h-3"
                : "bg-white/50 hover:bg-white/70 w-3 h-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-primary transition-all"
          style={{
            width: isAutoPlaying ? "100%" : "0%",
            transition: isAutoPlaying ? "width 5000ms linear" : "width 0.3s",
          }}
        />
      </div>
    </section>
  );
}
