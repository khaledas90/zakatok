"use client";

import { useRef, useState, useEffect } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import MapProvider from "@/lib/mapbox/provider";
import MapSearch from "@/components/map/map-search";
import MapStyles from "@/components/map/map-styles";
import MapControls from "@/components/map/map-controls";
import Marker from "@/components/map/map-marker";

interface Country {
  name: string;
  nameAr: string;
  lat: number;
  lng: number;
  capital: string;
  population: string;
  description: string;
  projects: number;
  beneficiaries: number;
}

const COUNTRIES: Country[] = [
  {
    name: "Egypt",
    nameAr: "مصر",
    lat: 30.0444,
    lng: 31.2357,
    capital: "Cairo",
    population: "104.3M",
    description:
      "The largest Arab country by population, Egypt faces significant challenges in healthcare, education, and poverty alleviation.",
    projects: 156,
    beneficiaries: 2300000,
  },
  {
    name: "Saudi Arabia",
    nameAr: "السعودية",
    lat: 24.7136,
    lng: 46.6753,
    capital: "Riyadh",
    population: "35.3M",
    description:
      "A key regional power with diverse humanitarian needs, particularly in supporting vulnerable communities and refugees.",
    projects: 89,
    beneficiaries: 1800000,
  },
  {
    name: "United Arab Emirates",
    nameAr: "الإمارات",
    lat: 25.2048,
    lng: 55.2708,
    capital: "Dubai",
    population: "9.9M",
    description:
      "A modern nation with significant expatriate populations requiring support in various social services.",
    projects: 67,
    beneficiaries: 890000,
  },
  {
    name: "Qatar",
    nameAr: "قطر",
    lat: 25.2854,
    lng: 51.531,
    capital: "Doha",
    population: "2.9M",
    description:
      "A wealthy nation with significant migrant worker populations requiring social support and protection.",
    projects: 45,
    beneficiaries: 320000,
  },
  {
    name: "Jordan",
    nameAr: "الأردن",
    lat: 31.9539,
    lng: 35.9106,
    capital: "Amman",
    population: "11.2M",
    description:
      "A stable nation hosting large refugee populations, requiring extensive humanitarian support.",
    projects: 134,
    beneficiaries: 1200000,
  },
];

export function MapSection() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const t = useTranslations("map");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMarkerClick = ({ data }: { data: any; marker: any }) => {
    const country = COUNTRIES.find(
      (c) => c.lat === data?.lat && c.lng === data?.lng
    );
    if (country) {
      setSelectedCountry(country);
    }
  };

  if (!isClient) {
    return (
      <div className="relative w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-main animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full max-w-7xl mx-auto h-[600px] rounded-2xl overflow-hidden shadow-xl mb-20">
        <div
          id="map-container"
          ref={mapContainerRef}
          className="absolute inset-0 h-full w-full"
        />

        <MapProvider
          mapContainerRef={mapContainerRef}
          initialViewState={{
            longitude: 45,
            latitude: 28,
            zoom: 5,
          }}
        >
          {COUNTRIES.map((country, index) => (
            <Marker
              key={index}
              latitude={country.lat}
              longitude={country.lng}
              data={country as any}
              onClick={handleMarkerClick}
            >
              <div className="relative cursor-pointer group">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-[#333] text-white px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap font-arabic">
                  {country.nameAr}
                </div>
                <MapPin className="w-8 h-8 text-[#2c7242] fill-[#fff] animate-bounce" />
              </div>
            </Marker>
          ))}

          <MapSearch />
          <MapControls />
          <MapStyles />
        </MapProvider>
      </div>

      {selectedCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 font-arabic">
                  {selectedCountry.nameAr}
                </h3>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="cursor-pointer rounded-full transition-colors"
                  aria-label={t("close")}
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-6 font-arabic">
                {selectedCountry.description}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-main/10 p-4 rounded-lg">
                  <h4 className="text-xs font-semibold text-main mb-2 font-arabic">
                    {t("capital")}
                  </h4>
                  <p className="text-base font-medium text-gray-700">
                    {selectedCountry.capital}
                  </p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h4 className="text-xs font-semibold text-primary mb-2 font-arabic">
                    {t("population")}
                  </h4>
                  <p className="text-base font-medium text-gray-700">
                    {selectedCountry.population}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <div className="flex-1 bg-secondary p-4 rounded-lg text-center">
                  <h4 className="text-xs font-semibold text-gray-800 mb-2 font-arabic">
                    {t("activeProjects")}
                  </h4>
                  <p className="text-2xl font-bold text-main">
                    {selectedCountry.projects}
                  </p>
                </div>
                <div className="flex-1 bg-secondary p-4 rounded-lg text-center">
                  <h4 className="text-xs font-semibold text-gray-800 mb-2 font-arabic">
                    {t("beneficiaries")}
                  </h4>
                  <p className="text-2xl font-bold text-main">
                    {selectedCountry.beneficiaries.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
