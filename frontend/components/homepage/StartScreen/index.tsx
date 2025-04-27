"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as motion from "framer-motion/client";
import star from "@/public/icons/small-star.svg";
import starBig from "@/public/icons/big-star.svg";
import { CarFront } from "lucide-react";

const StartScreen = () => {
  return (
    <div className="bg-[#F0F0F0] pt-32 lg:pt-52 md:pb-32 overflow-hidden">
      <div className="container md:max-w-frame mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <section className="max-w-frame px-4">
          <motion.h2
            initial={{ y: "100px", opacity: 0, rotate: 10 }}
            whileInView={{ y: "0", opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn([
              "text-4xl lg:text-[48px] lg:leading-[56px] mb-5 lg:mb-8 font-semibold text-black",
            ])}
          >
            Арендуй авто за пару кликов
          </motion.h2>
          <motion.p
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-black/60 text-sm lg:text-base mb-6 lg:mb-8 max-w-[545px]"
          >
            Быстрый и удобный каршеринг по городу. Выбирай машину рядом,
            бронируй за секунды и отправляйся в путь. Без скрытых комиссий —
            только свобода движения.
          </motion.p>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link
              href="/cars"
              className="w-full md:w-64 mb-5 md:mb-12 inline-flex items-center justify-center gap-2 bg-black hover:bg-black/80 transition-all text-white px-14 py-4 rounded-full"
            >
              <CarFront className="w-5 h-5" />
              Найти авто
            </Link>
          </motion.div>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex md:h-full md:max-h-11 lg:max-h-[52px] xl:max-h-[68px] items-center justify-center md:justify-start flex-wrap sm:flex-nowrap md:space-x-3 lg:space-x-6 xl:space-x-8 sm:mb-[52px]"
          >
            <div className="flex flex-col">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                <AnimatedCounter from={0} to={12000} />+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap">
                Поездок в месяц
              </span>
            </div>
            <Separator
              className="ml-6 md:ml-0 h-12 md:h-full bg-black/10"
              orientation="vertical"
            />
            <div className="flex flex-col ml-6 md:ml-0">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                <AnimatedCounter from={0} to={3500} />+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap">
                Активных пользователей
              </span>
            </div>
            <Separator
              className="hidden sm:block sm:h-12 md:h-full ml-6 md:ml-0 bg-black/10"
              orientation="vertical"
            />
            <div className="flex flex-col w-full text-center sm:w-auto sm:text-left mt-3 sm:mt-0 sm:ml-6 md:ml-0">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                <AnimatedCounter from={0} to={20} />+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap">
                Городов покрытия
              </span>
            </div>
          </motion.div>
        </section>
        <motion.section
          initial={{ y: "100px", opacity: 0, rotate: 10 }}
          whileInView={{ y: "0", opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.3, duration: 0.8 }}
          className="relative min-h-[150px] sm:min-h-[150px] md:min-h-[280px] lg:min-h-[333px] xl:min-h-[448px] bg-cover bg-top xl:bg-[center_top_-1.6rem] bg-no-repeat bg-[url('/images/header-res-carsharing.png')] md:bg-[url('/images/header-carsharing.png')]"
        >
          <Image
            priority
            src={starBig}
            height={104}
            width={104}
            alt="big star"
            className="absolute right-7 xl:right-0 top-12 max-w-[76px] max-h-[76px] lg:max-w-24 xl:max-w-[104px] animate-[spin_4s_infinite]"
          />
          <Image
            priority
            src={star}
            height={56}
            width={56}
            alt="small star"
            className="absolute left-7 md:left-0 top-12 sm:top-22 md:top-44 lg:top-56 max-w-11 md:max-w-14 animate-[spin_3s_infinite]"
          />
        </motion.section>
      </div>
    </div>
  );
};

export default StartScreen;
