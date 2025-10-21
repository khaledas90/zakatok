import React from "react";

import {
  Send,
  MessageCircle,
  Users,
  Shield,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { useTranslations } from "next-intl";
import ContactForm from "./_components/contactForm";
import PageLoadAnimation from "@/components/common/PageLoadAnimation";
import ScrollAnimation, {
  SlideUp,
  FadeIn,
  ScaleUp,
} from "@/components/common/ScrollAnimation";

export default function ContactUsPage() {
  const t = useTranslations("common.contactUs");

  const contactInfo = [
    {
      icon: Mail,
      title: t("email"),
      value: t("emailValue"),
      description: t("emailDescription"),
    },
    {
      icon: Phone,
      title: t("phone"),
      value: t("phoneValue"),
      description: t("phoneDescription"),
    },
    {
      icon: MapPin,
      title: t("address"),
      value: t("addressValue"),
      description: t("addressDescription"),
    },
    {
      icon: Clock,
      title: t("workingHours"),
      value: t("workingHoursValue"),
      description: t("workingHoursDescription"),
    },
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
                    <MessageCircle className="w-6 h-6 text-[#2c7242]" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-[#202121]">
                      {t("pageTitle")}
                    </h1>
                    <p className="text-gray-600 text-sm">{t("pageSubtitle")}</p>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{t("customerSupport")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>{t("quickResponse")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLoadAnimation>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollAnimation animation="slideLeft" delay={200}>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#2c7242]/10 rounded-lg">
                      <Building2 className="w-6 h-6 text-[#2c7242]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#202121]">
                      {t("contactInformation")}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <ScrollAnimation
                        key={index}
                        animation="fadeIn"
                        delay={index * 100}
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <info.icon className="w-5 h-5 text-[#2c7242]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-1">
                              {info.title}
                            </h3>
                            <p className="text-[#2c7242] font-medium mb-1">
                              {info.value}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {info.description}
                            </p>
                          </div>
                        </div>
                      </ScrollAnimation>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slideRight" delay={300}>
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#2c7242]/10 rounded-lg">
                      <Send className="w-6 h-6 text-[#2c7242]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#202121]">
                      {t("sendMessage")}
                    </h2>
                  </div>

                  <ScrollAnimation animation="scaleUp" delay={400}>
                    <ContactForm />
                  </ScrollAnimation>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  );
}
