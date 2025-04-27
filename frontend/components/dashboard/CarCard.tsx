import { FC } from "react";
import { useRouter } from "next/navigation";
import { CarFront, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

interface CarCardProps {
  car: any;
  onDelete: (id: number) => void;
  selectedStatuses: { [key: number]: string };
  setSelectedStatuses: React.Dispatch<
    React.SetStateAction<{ [key: number]: string }>
  >;
  isRenterView?: boolean;
}

export const CarCard: FC<CarCardProps> = ({
  car,
  onDelete,
  isRenterView = false,
}) => {
  const router = useRouter();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(isRenterView ? "Удалить бронь на авто?" : "Удалить машину?")) {
      onDelete(car.id || car.bookingId);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "cancelled":
        return "Отменен";
      case "pending":
        return "В ожидании";
      case "confirmed":
        return "Подтвержден";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cancelled":
        return "text-red-500";
      case "pending":
        return "text-yellow-500";
      case "confirmed":
        return "text-blue-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card
      onClick={() => router.push(`/dashboard/car/${car.id}`)}
      className="cursor-pointer hover:shadow-lg transition-all shadow-md border"
    >
      <CardContent className="pt-6 px-6 pb-8 space-y-6">
        <Image
          src={car?.images?.image_url?.[0] || "/images/lifestyle-suv.png"}
          alt={car.model}
          width={500}
          height={300}
          className="w-full h-48 object-cover rounded-lg border"
        />

        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <CarFront size={22} />
              {car.model} {car.year}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 capitalize">
              {car.fuel_type}, {car.transmission}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Цена в день: {car.price_per_day} ₸
            </p>
          </div>
        </div>
        {!isRenterView ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/dashboard/car/${car.id}/edit`);
              }}
            >
              <Pencil size={16} />
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash size={16} />
            </Button>
          </div>
        ) : (
          <Button variant="destructive" onClick={handleDelete}>
            <Trash size={16} />
          </Button>
        )}
        {isRenterView && (
          <div className="text-sm font-medium text-right text-muted-foreground">
            Статус:
            <span className={getStatusColor(car.status)}>
              {getStatusLabel(car.status)}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
