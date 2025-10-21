import React from "react";
import { Hero } from "./_components/hero";
import Countries from "./_components/countries";
import GazaEmergency from "./_components/gazaEmergency";
import { GlobalImpact } from "./_components/globalImpact";
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

      <ScrollAnimation animation="scaleUp" delay={100}>
        <GlobalImpact />
      </ScrollAnimation>

      <ScrollAnimation animation="fadeIn" delay={300}>
        <GazaEmergency />
      </ScrollAnimation>
    </main>
  );
}
