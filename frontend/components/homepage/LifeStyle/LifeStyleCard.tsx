import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type LifeStyleCardProps = {
  title: string;
  description?: string;
  url: string;
  className?: string;
};

const LifeStyleCard = ({
  title,
  description,
  url,
  className,
}: LifeStyleCardProps) => {
  return (
    <div
      className={cn([
        "w-full md:h-full rounded-[20px] bg-white bg-top text-left py-4 md:py-[25px] px-6 md:px-9 bg-no-repeat bg-cover flex flex-col justify-end relative",
        className,
      ])}
    >
      {/* Псевдоэлемент для градиента */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent rounded-[20px]" />
      <h3 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md z-10">
        {title}
      </h3>
      {description && (
        <p className="text-sm md:text-base text-blue-50 mt-1 z-10">
          {description}
        </p>
      )}
    </div>
  );
};

export default LifeStyleCard;
