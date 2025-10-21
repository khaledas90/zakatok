"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

import logoVisa from "@/assets/visa.svg";
import logoMasterCard from "@/assets/mastercard.svg";
import logoAmericanBank from "@/assets/americanbank.svg";
import { getCurrentYear } from "@/lib/getCurrentYear";
import LanguageSwitcher from "../header/LanguageSwitcher";

export default function Footer() {
  const t = useTranslations("common.footer");
  const locale = useLocale();

  const quickLinks = [
    {
      label: t("sections.services.links.countries"),
      href: `/${locale}/countries`,
    },
    {
      label: t("sections.services.links.campaigns"),
      href: `/${locale}/campaigns`,
    },
    {
      label: t("sections.support.links.contactUs"),
      href: `/${locale}/contact-us`,
    },
    {
      label: t("sections.company.links.termsOfService"),
      href: `/${locale}/terms-of-service`,
    },
    {
      label: t("sections.company.links.privacyPolicy"),
      href: `/${locale}/privacy-policy`,
    },
  ];

  return (
    <footer className="bg-[#2c7242] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-3">{t("title")}</h3>
            <p className="text-white/80 text-sm mb-4">{t("description")}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Mail className="w-4 h-4" />
                <span>info@zakatok.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Phone className="w-4 h-4" />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Riyadh, Saudi Arabia</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("quickLinks.title")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("paymentMethods.title")}
            </h4>
            <p className="text-white/70 text-sm mb-4">
              {t("paymentMethods.description")}
            </p>
            <div className="flex gap-3">
              <Image
                src={logoAmericanBank}
                alt="American Express"
                width={55}
                height={24}
                className="object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
              <Image
                src={logoVisa}
                alt="Visa"
                width={55}
                height={24}
                className="object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
              <Image
                src={logoMasterCard}
                alt="MasterCard"
                width={55}
                height={24}
                className="object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm mb-1">
                © {getCurrentYear()} {t("copyright")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher isFooter />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
