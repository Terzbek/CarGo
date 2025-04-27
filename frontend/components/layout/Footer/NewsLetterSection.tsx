import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import search from "@/public/icons/envelope.svg";

const NewsLetterSection = () => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 py-9 md:py-11 px-6 md:px-16 max-w-frame mx-auto bg-black border backdrop-blur-lg rounded-[20px]">
      <p
        className={cn([
          "text-[24px] md:text-4xl lg:text-4xl font-bold  text-white mb-9 md:mb-0",
        ])}
      >
        ОСТАНЬТЕСЬ В КУРСЕ НАШИХ ЛУЧШИХ ПРЕДЛОЖЕНИЙ
      </p>
      <div className="flex items-center">
        <div className="flex flex-col w-full max-w-[349px] mx-auto">
          <InputGroup className="flex bg-white mb-[14px] rounded-[10px]">
            <InputGroup.Text>
              <Image
                priority
                src={search}
                height={20}
                width={20}
                alt="email"
                className="min-w-5 min-h-5"
              />
            </InputGroup.Text>
            <InputGroup.Input
              type="email"
              name="email"
              placeholder="Введите ваш email для получения информации"
              className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
            />
          </InputGroup>
          <Button
            variant="secondary"
            className="text-sm sm:text-base font-medium bg-white h-12 rounded-[10px] px-4 py-3"
            aria-label="Подписаться на новости ломбарда"
            type="button"
          >
            Подписаться на новости
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
