"use client";

import { useEffect, useState } from "react";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import PublicCard from "@/components/common/PublicCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "@/axios";

interface Car {
  id: number;
  model: string;
  mark: string;
  title: string;
  fuel_type: string;
  transmission: string;
  year: number;
  location: string;
  price_per_day: number;
  color?: string;
  images: {
    image_url: string;
  }[];
}

export default function ShopPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 10000000,
    condition: "",
    weight: "",
    fuel: "",
    transmission: "",
    year: "",
    location: "",
  });

  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  useEffect(() => {
    const filtered = cars.filter((car) => {
      return (
        (!filters.category || car.mark === filters.category) &&
        (!filters.fuel || car.fuel_type === filters.fuel) &&
        (!filters.transmission || car.transmission === filters.transmission) &&
        (!filters.location || car.location === filters.location) &&
        (!filters.year || car.year.toString() === filters.year) &&
        car.price_per_day >= filters.minPrice &&
        car.price_per_day <= filters.maxPrice &&
        (!filters.condition || car.transmission === filters.condition) &&
        (!filters.weight || car.year.toString() === filters.weight)
      );
    });

    setFilteredCars(filtered);
  }, [filters, cars]);

  const limit = 9;

  const fetchCars = (page: number) => {
    setLoading(true);
    const offset = (page - 1) * limit;

    axios
      .post("/api/v1/cars/search", { limit, offset })
      .then((res) => {
        setCars(res.data.data);
        setTotalCount(res.data.total);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке автомобилей:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCars(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / limit);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pageNumbers.map((page, index) =>
      page === "..." ? (
        <PaginationItem key={index}>
          <PaginationEllipsis className="text-black/50 font-medium text-sm" />
        </PaginationItem>
      ) : (
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            onClick={() => setCurrentPage(Number(page))}
            isActive={currentPage === page}
            className="text-black/50 font-medium text-sm"
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    );
  };

  return (
    <main className="min-h-screen px-6 py-20 md:py-28 container mx-auto max-w-5xl">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">Фильтры</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
            <Filters setFilters={setFilters} />
          </div>

          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl md:text-[32px]">
                  Автомобили
                </h1>
                <MobileFilters />
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Показано {cars.length} из {totalCount} машин
                </span>
                <div className="flex items-center">
                  Sort by:{" "}
                  <Select defaultValue="most-popular">
                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-popular">Most Popular</SelectItem>
                      <SelectItem value="low-price">Low Price</SelectItem>
                      <SelectItem value="high-price">High Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-10 text-black/50">
                Загрузка машин...
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                {filteredCars.map((car) => (
                  <PublicCard key={car.id} car={car} />
                ))}
              </div>
            )}

            <hr className="border-t-black/10" />

            {totalPages > 1 && (
              <Pagination className="justify-between">
                <PaginationPrevious
                  href="#"
                  className="border border-black/10"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
                <PaginationContent>{renderPageNumbers()}</PaginationContent>
                <PaginationNext
                  href="#"
                  className="border border-black/10"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
