import ScrollAnimation from "@/components/common/ScrollAnimation";
import { useTranslations } from "next-intl";
import React from "react";

export default function HowHelp() {
  const t = useTranslations("common.countries");
  return (
    <ScrollAnimation animation="slideUp" delay={400}>
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#202121] mb-4">
              {t("howItWorks.title")}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t("howItWorks.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((step) => (
              <ScrollAnimation
                key={step}
                animation="scaleUp"
                delay={step * 100}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2c7242]/10 rounded-full mb-4">
                    <span className="text-2xl font-bold text-[#2c7242]">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#202121] mb-2">
                    {t(`howItWorks.step${step}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(`howItWorks.step${step}.description`)}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
}
