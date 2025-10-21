import Image from "next/image";
import React from "react";
import ImageGaza from "@/assets/gaza-emergency.jpg";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function GazaEmergency() {
  const t = useTranslations("common.gazaEmergency");

  return (
    <section className="mx-auto  lg:mx-6   py-12">
      <div className="relative h-[500px] rounded-lg overflow-hidden">
        <Image
          src={ImageGaza}
          alt="Gaza Emergency"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 font-arabic">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-base md:text-lg max-w-3xl leading-relaxed">
            {t("description")}
          </p>

          <Button className="bg-main mt-6 hover:bg-main/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-arabic">
            {t("donateNow")}
          </Button>
        </div>
      </div>
    </section>
  );
}
