import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { CarFront } from "lucide-react";

interface Car {
  id: number;
  model: string;
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

const PublicCard = ({ car }: { car: Car }) => {
  console.log(car);
  return (
    <Card
      onClick={() => (window.location.href = `/cars/${car.id}`)}
      className="cursor-pointer hover:shadow-lg transition-all shadow-md border"
    >
      <CardContent className="pt-6 px-6 pb-8 space-y-4">
        <Image
          src={car.images?.[0]?.image_url || "/placeholder.jpg"}
          alt={car.model}
          width={500}
          height={300}
          quality={100}
          className="w-full h-48 object-cover rounded-lg border"
        />

        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CarFront size={20} />
            {car.model}
          </h2>
          <p className="text-sm text-muted-foreground">{car.location}</p>

          <div className="flex items-center flex-wrap text-sm text-muted-foreground mt-1 gap-2">
            <span>{car.year}</span>
            <span>•</span>
            <span>{car.fuel_type}</span>
            <span>•</span>
            <span>{car.transmission}</span>
            {car.color && (
              <>
                <span>•</span>
                <span>Цвет: {car.color}</span>
              </>
            )}
          </div>

          <div className="mt-2 text-lg font-bold text-black">
            {car.price_per_day.toLocaleString()} ₸{" "}
            <span className="text-sm font-normal text-black/50">/ день</span>
          </div>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `/cars/${car.id}`;
          }}
          className="w-full mt-4"
        >
          Взять в аренду
        </Button>
      </CardContent>
    </Card>
  );
};

export default PublicCard;
