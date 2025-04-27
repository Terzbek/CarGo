import React from "react";
import FuelSection from "@/components/shop-page/filters/FuelSection";
import YearSection from "@/components/shop-page/filters/YearSection";
import TransmissionSection from "@/components/shop-page/filters/TransmissionSection";
import LocationSection from "@/components/shop-page/filters/LocationSection";
import { Button } from "@/components/ui/button";

const Filters = ({ setFilters }) => {
  return (
    <>
      <hr className="border-t-black/10" />
      <FuelSection
        onChange={(val) => setFilters((prev) => ({ ...prev, fuel: val }))}
      />
      <hr className="border-t-black/10" />
      <YearSection
        onChange={(val) => setFilters((prev) => ({ ...prev, year: val }))}
      />
      <hr className="border-t-black/10" />
      <TransmissionSection
        onChange={(val) =>
          setFilters((prev) => ({ ...prev, transmission: val }))
        }
      />
      <hr className="border-t-black/10" />
      <LocationSection
        onChange={(val) => setFilters((prev) => ({ ...prev, location: val }))}
      />
      <hr className="border-t-black/10" />
      <Button
        type="button"
        className="bg-black w-full rounded-full text-sm font-medium py-4 h-12"
      >
        Применить фильтры
      </Button>
    </>
  );
};

export default Filters;
