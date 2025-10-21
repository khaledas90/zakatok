import ScrollAnimation from "@/components/common/ScrollAnimation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import React from "react";

export default function FindCountry() {
  const t = useTranslations("common.countries");
  return (
    <ScrollAnimation animation="fadeIn" delay={500}>
      <div className="bg-gradient-to-r from-[#2c7242] to-green-600 m-5 rounded-xl py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("notSeeCountry")}
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            {t("ctaDescription")}
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-[#2c7242] hover:bg-gray-50 px-8 py-3 text-lg"
          >
            {t("suggestNewCountry")}
          </Button>
        </div>
      </div>
    </ScrollAnimation>
  );
}
