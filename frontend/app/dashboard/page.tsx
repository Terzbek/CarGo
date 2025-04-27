"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarCard } from "@/components/dashboard/CarCard";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { Wallet } from "@/components/dashboard/Wallet";
import { RatingReviews } from "@/components/dashboard/RatingReviews";
import { useUserStore } from "@/store/userStore";
import { useSearchParams } from "next/navigation";
import axios from "@/axios";

export default function UserDashboardPage() {
  const { user } = useUserStore((state) => state);
  const [cars, setCars] = useState([]);
  const [rentedCars, setRentedCars] = useState([]);
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "profile";

  const fetchMyCars = () => {
    axios
      .get(`/api/v1/user/${user.id}`)
      .then((res) => {
        setCars(res.data.cars || []);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке автомобилей:", err);
      });
  };

  const fetchRentedCars = () => {
    axios
      .post(`/api/v1/booking/search`, {
        renter_id: user.id,
        limit: 0,
        offset: 0,
      })
      .then((res) => {
        const bookings = res.data?.data || [];
        setRentedCars(
          bookings.map((b: any) => ({
            ...b.car,
            bookingId: b.id,
            status: b.status,
          }))
        );
      })
      .catch((err) => {
        console.error("Ошибка при загрузке арендованных авто:", err);
      });
  };

  useEffect(() => {
    if (!user?.id) return;

    fetchMyCars();
    fetchRentedCars();
  }, [user]);

  const handleDelete = async (carId: number) => {
    try {
      await axios.delete(`/api/v1/cars/${carId}`);
      setCars((prev) => prev.filter((car: any) => car.id !== carId));
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  const handleDeleteBooking = async (bookingId: number) => {
    try {
      await axios.delete(`/api/v1/booking/${bookingId}`);
      setRentedCars((prev) =>
        prev.filter((car: any) => car.bookingId !== bookingId)
      );
    } catch (error) {
      console.error("Ошибка при удалении брони:", error);
    }
  };

  return (
    <div className="min-h-screen px-6 py-20 md:py-28 container mx-auto max-w-5xl">
      <h1 className="text-4xl font-extrabold mb-10 tracking-tight text-center md:text-left">
        Личный кабинет
      </h1>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="cars">Мои автомобили</TabsTrigger>
          <TabsTrigger value="rented">Арендованные</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="flex flex-col gap-4">
          <UserProfile user={user} />
          <Wallet />
          <RatingReviews />
        </TabsContent>

        <TabsContent value="cars">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car: any) => (
              <CarCard
                key={car.id}
                car={car}
                onDelete={handleDelete}
                isRenterView={false}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rented">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rentedCars.map((car: any, i) => (
              <CarCard
                key={i}
                car={car}
                onDelete={() => handleDeleteBooking(car.bookingId)}
                isRenterView={true}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
