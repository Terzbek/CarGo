"use client";

import React from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import ReviewCard from "@/components/common/ReviewCard";
import { Review } from "@/types/review.types";

const reviewsData: Review[] = [
  {
    id: 1,
    user: "Айгерим Т.",
    content: `"Сначала не верила в аренду без посредников, но всё прошло гладко. Машину нашла за 5 минут, оплата — через крипту. Очень удобно!"`,
    rating: 5,
    date: "10 февраля 2024",
  },
  {
    id: 2,
    user: "Даурен С.",
    content: `"Бронировал авто на 3 дня. Всё по смарт-контракту, без звонков, без кассиров. Это новый уровень аренды!"`,
    rating: 5,
    date: "3 марта 2024",
  },
  {
    id: 3,
    user: "Камила З.",
    content: `"Платформа понравилась. Указала локацию — сразу нашла машину рядом. Оплатила криптой, взяла ключи из бокса. Всё автоматически!"`,
    rating: 5,
    date: "15 марта 2024",
  },
  {
    id: 4,
    user: "Рустам Н.",
    content: `"Арендовал Tesla без посредников. Цена — ниже, чем у агрегаторов. Контракт — прозрачный, деньги держатся в эскроу. Топ!"`,
    rating: 5,
    date: "25 марта 2024",
  },
  {
    id: 5,
    user: "Алия К.",
    content: `"Удобно, что не нужно ни с кем созваниваться. Вся аренда — через приложение. Всё чётко, быстро, безопасно."`,
    rating: 5,
    date: "1 апреля 2024",
  },
  {
    id: 6,
    user: "Нуржан М.",
    content: `"Вернул машину, депозит вернулся сразу после проверки смарт-контрактом. Чисто, честно, без нервов. Буду пользоваться снова!"`,
    rating: 5,
    date: "4 апреля 2024",
  },
];

const Reviews = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isClient = useIsClient();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!isClient) return null;

  return (
    <section className="overflow-hidden mt-8 md:mt-16">
      <motion.div
        initial={{ x: "100px", opacity: 0 }}
        whileInView={{ x: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="relative w-full mb-6 md:mb-9"
        >
          <div className="container relative flex items-end sm:items-center max-w-frame mx-auto mb-6 md:mb-10 px-4 xl:px-0">
            <motion.h2
              initial={{ y: "100px", opacity: 0 }}
              whileInView={{ y: "0", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={cn([
                "text-[24px] md:text-4xl lg:text-4xl mb-8 md:mb-14 leading-[36px] mr-auto",
              ])}
            >
              Отзывы которые оставили наши клиенты
            </motion.h2>
            <div className="flex items-center space-x-1 ml-2">
              <CarouselPrevious variant="ghost" className="text-2xl">
                <FaArrowLeft />
              </CarouselPrevious>
              <CarouselNext variant="ghost" className="text-2xl">
                <FaArrowRight />
              </CarouselNext>
            </div>
          </div>
          <CarouselContent>
            {reviewsData.map((review, index) => (
              <CarouselItem
                key={review.id}
                className="w-full max-w-[358px] sm:max-w-[400px] pl-5"
              >
                <ReviewCard
                  className="h-full"
                  data={review}
                  blurChild={
                    reviewsData.length >= 6 && (
                      <div
                        className={cn([
                          isDesktop
                            ? (current + 1 === count
                                ? 0
                                : current + 1 > count
                                ? 1
                                : current + 1) === index &&
                              "backdrop-blur-[2px]"
                            : (current === count ? 0 : current) === index &&
                              "backdrop-blur-[2px]",
                          isDesktop
                            ? (current === 1
                                ? count - 2
                                : current === 2
                                ? count - 1
                                : current - 3) === index &&
                              "backdrop-blur-[2px]"
                            : (current === 1
                                ? count - 1
                                : current === 2
                                ? 0
                                : current - 2) === index &&
                              "backdrop-blur-[2px]",
                          "absolute bg-white/10 right-0 top-0 h-full w-full z-10",
                        ])}
                      />
                    )
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  );
};

export default Reviews;
