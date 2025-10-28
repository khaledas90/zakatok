"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { MapContext } from "@/context/map-context";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type MapComponentProps = {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  initialViewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  children?: React.ReactNode;
};

export default function MapProvider({
  mapContainerRef,
  initialViewState,
  children,
}: MapComponentProps) {
  const map = useRef<mapboxgl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: [initialViewState.longitude, initialViewState.latitude],
      zoom: initialViewState.zoom,
      attributionControl: false,
      logoPosition: "bottom-right",
    });

    map.current.on("load", () => {
      setLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [
    initialViewState.longitude,
    initialViewState.latitude,
    initialViewState.zoom,
    mapContainerRef,
  ]);

  return (
    <div className="z-[1000]">
      {loaded && map.current && (
        <MapContext.Provider value={{ map: map.current }}>
          {children}
        </MapContext.Provider>
      )}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-[1000]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-main/30 border-t-main rounded-full animate-spin"></div>
            <div className="text-lg font-medium font-arabic">
              جاري تحميل الخريطة...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
