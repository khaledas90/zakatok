"use client";
import React from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Download,
  Printer,
  CheckCircle2,
  Scale,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLoadAnimation from "@/components/common/PageLoadAnimation";
import ScrollAnimation, {
  SlideUp,
  FadeIn,
  ScaleUp,
} from "@/components/common/ScrollAnimation";

export default function TermsOfServicePage() {
  const t = useTranslations("common.termsAndPrivacy");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const termsSections = [
    "acceptance",
    "description",
    "userResponsibilities",
    "prohibitedUses",
    "intellectualProperty",
    "limitationOfLiability",
    "modifications",
    "termination",
    "governingLaw",
    "contact",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <PageLoadAnimation delay={100}>
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-6 w-px bg-gray-300" />
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#2c7242]/10 rounded-lg">
                    <Scale className="w-6 h-6 text-[#2c7242]" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-[#202121]">
                      {t("termsOfService.title")}
                    </h1>
                    <p className="text-gray-600 text-sm">
                      {t("termsOfService.subtitle")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{t("lastUpdated")}: 15 يناير 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLoadAnimation>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <ScrollAnimation animation="slideLeft" delay={200}>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-8">
                  <h3 className="font-bold text-lg text-[#202121] mb-4">
                    {t("termsOfService.title")}
                  </h3>
                  <nav className="space-y-2">
                    {termsSections.map((section, index) => (
                      <ScrollAnimation
                        key={section}
                        animation="fadeIn"
                        delay={index * 50}
                      >
                        <button
                          onClick={() => {
                            const element = document.getElementById(section);
                            element?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="w-full text-right p-3 rounded-lg hover:bg-gray-50 transition-all text-sm text-gray-700 hover:text-[#2c7242]"
                        >
                          {t(`termsOfService.sections.${section}.title`)}
                        </button>
                      </ScrollAnimation>
                    ))}
                  </nav>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slideRight" delay={300}>
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-8">
                    <ScrollAnimation animation="scaleUp" delay={400}>
                      <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2c7242]/10 rounded-full mb-4">
                          <Scale className="w-8 h-8 text-[#2c7242]" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#202121] mb-4">
                          {t("termsOfService.title")}
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                          {t("termsOfService.subtitle")}
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{t("effectiveDate")}: 15 يناير 2024</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>محدث</span>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>

                    <div className="space-y-8">
                      {termsSections.map((section, index) => (
                        <ScrollAnimation
                          key={section}
                          animation="slideUp"
                          delay={index * 100}
                        >
                          <div
                            id={section}
                            className="border-l-4 border-[#2c7242] pl-6"
                          >
                            <h3 className="text-xl font-bold text-[#202121] mb-4">
                              {t(`termsOfService.sections.${section}.title`)}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                              {t(`termsOfService.sections.${section}.content`)}
                            </p>
                          </div>
                        </ScrollAnimation>
                      ))}
                    </div>

                    <ScrollAnimation animation="fadeIn" delay={500}>
                      <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="bg-gradient-to-r from-[#2c7242]/5 to-green-50 rounded-xl p-6">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#2c7242]/10 rounded-lg">
                              <Mail className="w-6 h-6 text-[#2c7242]" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-[#202121] mb-2">
                                أسئلة حول الشروط؟
                              </h4>
                              <p className="text-gray-600 text-sm">
                                تواصل معنا على:{" "}
                                <a
                                  href="mailto:legal@zakatok.com"
                                  className="text-[#2c7242] hover:underline"
                                >
                                  legal@zakatok.com
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  );
}
