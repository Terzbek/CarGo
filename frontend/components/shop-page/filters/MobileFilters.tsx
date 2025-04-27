"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FiSliders } from "react-icons/fi";
import Filters from ".";

const MobileFilters = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="h-9 w-9 rounded-full bg-[#F5F5F5] text-black p-1 md:hidden shadow"
        >
          <FiSliders className="text-lg mx-auto" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="max-h-[90%] rounded-t-xl">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <span className="font-bold text-black text-xl">Фильтры</span>
            <FiSliders className="text-2xl text-black/40" />
          </div>
          <DrawerTitle className="hidden">Фильтры</DrawerTitle>
          <DrawerDescription className="hidden">
            Фильтры товаров
          </DrawerDescription>
        </DrawerHeader>

        <div className="max-h-[90%] overflow-y-auto w-full px-5 md:px-6 py-5 space-y-5 md:space-y-6">
          <Filters />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilters;
