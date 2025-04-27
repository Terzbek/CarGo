"use client";

import React, { useEffect, useState } from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import axios from "@/axios";
import PublicCard from "@/components/common/PublicCard";
import Link from "next/link";

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

const CarsListSec = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("/api/v1/cars/search", {
        limit: 10,
        offset: 0,
      })
      .then((res) => {
        setCars(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке автомобилей:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Загрузка машин...</div>;
  }

  return (
    <section className="container max-w-frame mx-auto text-center mt-8 md:mt-16">
      <motion.h2
        initial={{ y: "100px", opacity: 0 }}
        whileInView={{ y: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={cn([
          "text-[24px] md:text-4xl lg:text-4xl mb-8 md:mb-14 capitalize",
        ])}
      >
        Популярные авто
      </motion.h2>

      <motion.div
        initial={{ y: "100px", opacity: 0 }}
        whileInView={{ y: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full mb-6 md:mb-9"
        >
          <CarouselContent className="mx-4 xl:mx-0 space-x-4 sm:space-x-5">
            {cars.map((car) => (
              <CarouselItem key={car.id} className="w-full max-w-[340px] pl-0">
                <PublicCard car={car} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="w-full px-4 sm:px-0 text-center">
          <Link
            href="/cars"
            className="w-full inline-block sm:w-[218px] px-[54px] py-4 border rounded-[40px] lg:rounded-[20px] hover:bg-black hover:text-white text-black transition-all font-medium text-sm sm:text-base border-black/10"
          >
            Открыть все
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CarsListSec;
