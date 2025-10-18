import React from "react";
import { Hero } from "./_components/hero";
import Countries from "./_components/countries";
import GazaEmergency from "./_components/gazaEmergency";
import { GlobalImpact } from "./_components/globalImpact";

export default function page() {
  return (
    <main className="w-full mx-auto">
      <Hero />
      <Countries />
      <GlobalImpact />
      <GazaEmergency />
    </main>
  );
}
