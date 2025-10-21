"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Globe,
  Heart,
  Search,
  ArrowLeft,
  HelpCircle,
  MapPin,
  Users,
  ChevronRight,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLoadAnimation from "@/components/common/PageLoadAnimation";
import ScrollAnimation, {
  SlideUp,
  FadeIn,
  ScaleUp,
  RotateIn,
} from "@/components/common/ScrollAnimation";

export default function NotFoundPage() {
  const t = useTranslations("common.notFound");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();

  const helpfulLinks = [
    {
      icon: Home,
      label: t("helpfulLinks.home"),
      href: `/${locale}`,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Globe,
      label: t("helpfulLinks.countries"),
      href: `/${locale}/countries`,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Heart,
      label: t("helpfulLinks.campaigns"),
      href: `/${locale}/campaigns`,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: Users,
      label: t("helpfulLinks.contactUs"),
      href: `/${locale}/contact-us`,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const suggestions = [
    {
      icon: Search,
      text: t("suggestions.checkUrl"),
    },
    {
      icon: Home,
      text: t("suggestions.goHome"),
    },
    {
      icon: Globe,
      text: t("suggestions.browseCountries"),
    },
    {
      icon: Heart,
      text: t("suggestions.exploreCampaigns"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation animation="scaleUp" delay={200}>
            <div className="text-center mb-12">
              <div className="relative inline-block">
                <div className="text-9xl font-bold text-[#2c7242] mb-4 animate-pulse">
                  {t("errorCode")}
                </div>
                <div className="absolute -top-4 -right-4">
                  <RotateIn delay={400}>
                    <div className="w-16 h-16 bg-gradient-to-br from-[#2c7242] to-green-600 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                  </RotateIn>
                </div>
              </div>

              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {t("subtitle")}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                {t("description")}
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slideUp" delay={300}>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                {t("suggestions.title")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestions.map((suggestion, index) => (
                  <ScrollAnimation
                    key={index}
                    animation="fadeIn"
                    delay={400 + index * 100}
                  >
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="p-2 bg-white rounded-lg">
                        <suggestion.icon className="w-5 h-5 text-[#2c7242]" />
                      </div>
                      <span className="text-gray-700">{suggestion.text}</span>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slideUp" delay={500}>
            <div className="text-center mb-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}`}>
                  <Button
                    size="lg"
                    className="bg-[#2c7242] hover:bg-[#2c7242]/90 text-white px-8 py-3"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    {t("actions.goHome")}
                  </Button>
                </Link>

                <Link href={`/${locale}/countries`}>
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    <Globe className="w-5 h-5 mr-2" />
                    {t("actions.browseCountries")}
                  </Button>
                </Link>

                <Link href={`/${locale}/campaigns`}>
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    <Heart className="w-5 h-5 mr-2" />
                    {t("actions.exploreCampaigns")}
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeIn" delay={600}>
            <div className="bg-gradient-to-r from-[#2c7242]/5 to-green-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                {t("helpfulLinks.title")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {helpfulLinks.map((link, index) => (
                  <ScrollAnimation
                    key={index}
                    animation="scaleUp"
                    delay={700 + index * 100}
                  >
                    <Link href={link.href}>
                      <div className="group cursor-pointer">
                        <div
                          className={`p-6 rounded-xl ${link.bgColor} hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                        >
                          <div className="text-center">
                            <div
                              className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white mb-3 ${link.color}`}
                            >
                              <link.icon className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold text-gray-800 group-hover:text-[#2c7242] transition-colors">
                              {link.label}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slideUp" delay={800}>
            <div className="text-center mt-12">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <HelpCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t("help.title")}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">{t("help.description")}</p>
                <Link href={`/${locale}/contact-us`}>
                  <Button variant="outline" className="px-6 py-2">
                    <Users className="w-4 h-4 mr-2" />
                    {t("actions.contactSupport")}
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#2c7242]/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-green-500/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-500/10 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-purple-500/10 rounded-full animate-pulse delay-3000"></div>
      </div>
    </div>
  );
}
