"use client";

import { useState } from "react";
import axios from "@/axios";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

export default function BookingSection({
  carId,
  pricePerDay,
}: {
  carId: string;
  pricePerDay: number;
}) {
  const router = useRouter();
  const { user } = useUserStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = async () => {
    if (!user?.id) {
      toast.error("Вы не авторизованы");
      return;
    }

    setIsLoading(true);

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 3);

    const totalPrice = pricePerDay * 3;

    try {
      await axios.post("/api/v1/booking", {
        car_id: carId,
        renter_id: user.id,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        created_at: new Date().toISOString(),
        status: "pending",
        total_price: totalPrice,
      });

      toast.success("Вы успешно арендовали автомобиль!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Ошибка при бронировании:", error);
      toast.error("Ошибка при бронировании автомобиля. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-md rounded-lg border p-6 space-y-4">
      <h2 className="text-2xl font-bold">Забронировать автомобиль</h2>
      <button
        onClick={handleBooking}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? "Отправка..." : "Забронировать"}
      </button>
    </div>
  );
}
