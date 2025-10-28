import React from "react";
import { Hero } from "./_components/hero";
import Countries from "./_components/countries";
import GazaEmergency from "./_components/gazaEmergency";
import { MapSection } from "./_components/mapSection";
import PageLoadAnimation, {
  SlideUpOnLoad,
  FadeInOnLoad,
} from "@/components/common/PageLoadAnimation";
import ScrollAnimation, {
  SlideUp,
  FadeIn,
  ScaleUp,
} from "@/components/common/ScrollAnimation";

export default function page() {
  return (
    <main className="w-full mx-auto">
      <PageLoadAnimation delay={100}>
        <Hero />
      </PageLoadAnimation>

      <ScrollAnimation animation="slideUp" delay={200}>
        <Countries />
      </ScrollAnimation>

      <MapSection />

      <ScrollAnimation animation="fadeIn" delay={300}>
        <GazaEmergency />
      </ScrollAnimation>
    </main>
  );
}
