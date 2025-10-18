"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Globe, Users, Heart, MapPin, Award, Target } from "lucide-react";
import { useTranslations } from "next-intl";

interface RegionData {
  name: string;
  countries: string;
  beneficiaries: number;
  projects: number;
  color: string;
  icon: React.ReactNode;
  gradient: string;
}

function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export function GlobalImpact() {
  const [activeRegion, setActiveRegion] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("common.globalImpact");

  const regions: RegionData[] = [
    {
      name: t("regions.northAfrica.name"),
      countries: t("regions.northAfrica.countries"),
      beneficiaries: 125000,
      projects: 450,
      color: "from-red-500 to-red-600",
      gradient: "from-red-500/20 to-red-600/20",
      icon: <MapPin className="w-8 h-8" />,
    },
    {
      name: t("regions.gulf.name"),
      countries: t("regions.gulf.countries"),
      beneficiaries: 89000,
      projects: 320,
      color: "from-[#2c7242] to-[#2c7242]/80",
      gradient: "from-[#2c7242]/20 to-[#2c7242]/10",
      icon: <Heart className="w-8 h-8" />,
    },
    {
      name: t("regions.levant.name"),
      countries: t("regions.levant.countries"),
      beneficiaries: 156000,
      projects: 580,
      color: "from-primary to-primary/80",
      gradient: "from-primary/20 to-primary/10",
      icon: <Users className="w-8 h-8" />,
    },
    {
      name: t("regions.peninsula.name"),
      countries: t("regions.peninsula.countries"),
      beneficiaries: 98000,
      projects: 410,
      color: "from-blue-500 to-blue-600",
      gradient: "from-blue-500/20 to-blue-600/20",
      icon: <Globe className="w-8 h-8" />,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-10 lg:mx-6 mx-1.5  overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#c48845]"></div>
              <Globe className="w-8 h-8 text-main" />

              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#c48845]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#202121] mb-2 font-arabic">
              {t("title")}
            </h2>
            <p className="text-[#6b7280] text-lg font-arabic">
              {t("subtitle")}
            </p>
          </div>
        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-18 mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-main/20 hover:-translate-y-2">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-main/10 rounded-full mb-6 group-hover:bg-main/20 transition-colors duration-300">
                <Users className="w-8 h-8 text-main" />
              </div>
              <div className="text-5xl font-bold text-main mb-3">
                <AnimatedCounter end={468000} suffix="+" />
              </div>
              <p className="text-gray-600 text-lg font-medium font-arabic">
                {t("beneficiaries")}
              </p>
            </div>
          </div>

          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/20 hover:-translate-y-2">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div className="text-5xl font-bold text-primary mb-3">
                <AnimatedCounter end={1760} suffix="+" />
              </div>
              <p className="text-gray-600 text-lg font-medium font-arabic">
                {t("projects")}
              </p>
            </div>
          </div>

          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-red-500/20 hover:-translate-y-2">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-6 group-hover:bg-red-500/20 transition-colors duration-300">
                <Target className="w-8 h-8 text-red-500" />
              </div>
              <div className="text-5xl font-bold text-red-500 mb-3">
                <AnimatedCounter end={16} suffix="+" />
              </div>
              <p className="text-gray-600 text-lg font-medium font-arabic">
                {t("countries")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {regions.map((region, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer border border-gray-100 hover:border-transparent transform hover:-translate-y-3 hover:scale-105 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onMouseEnter={() => setActiveRegion(index)}
              onMouseLeave={() => setActiveRegion(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${region.color} opacity-0 group-hover:opacity-100 transition-all duration-700`}
              ></div>

              <div className="relative p-8 h-full flex flex-col min-h-[320px]">
                <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <div className="text-gray-400 group-hover:text-white transition-colors duration-500">
                    {region.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors duration-500 font-arabic">
                  {region.name}
                </h3>

                <div className="mb-6 flex-grow">
                  <p className="text-sm text-gray-500 group-hover:text-white/90 transition-colors duration-500 leading-relaxed font-arabic">
                    {region.countries}
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-200 group-hover:border-white/30 transition-colors duration-500">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-500 font-arabic">
                      {t("beneficiariesLabel")}
                    </span>
                    <span className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500">
                      {activeRegion === index ? (
                        <AnimatedCounter
                          end={region.beneficiaries}
                          duration={1500}
                        />
                      ) : (
                        region.beneficiaries.toLocaleString("en-US")
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors duration-500 font-arabic">
                      {t("projectsLabel")}
                    </span>
                    <span className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500">
                      {activeRegion === index ? (
                        <AnimatedCounter
                          end={region.projects}
                          duration={1500}
                        />
                      ) : (
                        region.projects.toLocaleString("en-US")
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 delay-100">
                <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
