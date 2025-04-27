/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "@/axios";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/v1/cars/${id}`)
        .then((res) => setCar(res.data))
        .catch((err) => console.error("Ошибка загрузки машины:", err));
    }
  }, [id]);

  const handleUpdateStatus = async (booking, status) => {
    try {
      await axios.post(`/api/v1/booking/status/update`, {
        id: booking.id,
        status,
      });
      setCar((prev) => ({
        ...prev,
        bookings: prev.bookings.map((b) =>
          b.id === booking.id ? { ...b, status } : b
        ),
      }));
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };

  if (!car) return <p className="text-center py-10">Загрузка...</p>;

  return (
    <div className="min-h-screen px-6 py-20 md:py-28 container mx-auto max-w-5xl">
      <Breadcrumb className="mb-5 sm:mb-9">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard?tab=cars">Мои автомобили</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {car.mark} {car.model}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-5xl font-extrabold mb-8 tracking-tight text-center md:text-left">
        {car.title}
      </h1>
      <p className="text-lg text-muted-foreground mb-6 text-center md:text-left">
        {car.description}
      </p>
      <Separator className="mb-8" />

      <div className="flex flex-col gap-8">
        {/* Блок с авто */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Информация об автомобиле</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden border h-64">
                <img
                  src={car.images?.[0]?.image_url}
                  alt={car.model}
                  className="w-full h-full object-cover"
                />
              </div>
              <Badge variant={car.is_available ? "default" : "secondary"}>
                {car.is_available ? "Доступен" : "Недоступен"}
              </Badge>
            </div>

            <div className="space-y-3 text-base">
              <p>
                <strong>Марка:</strong> {car.mark}
              </p>
              <p>
                <strong>Модель:</strong> {car.model}
              </p>
              <p>
                <strong>Год выпуска:</strong> {car.year}
              </p>
              <p>
                <strong>Тип топлива:</strong> {car.fuel_type}
              </p>
              <p>
                <strong>Трансмиссия:</strong> {car.transmission}
              </p>
              <p>
                <strong>Мест:</strong> {car.seats}
              </p>
              <p>
                <strong>Цена/день:</strong> {car.price_per_day.toLocaleString()}{" "}
                ₸
              </p>
              <p>
                <strong>Город:</strong> {car.location}
              </p>
              <p>
                <strong>Добавлен:</strong>{" "}
                {new Date(car.created_at).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Владелец */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Владелец</CardTitle>
          </CardHeader>
          <CardContent className="text-base space-y-2">
            <p>
              <strong>ФИО:</strong> {car.owner?.full_name || "Не указано"}
            </p>
            <p>
              <strong>Телефон:</strong> {car.owner?.phone_number}
            </p>
            <p>
              <strong>ID владельца:</strong> {car.owner_id}
            </p>
          </CardContent>
        </Card>

        {/* Бронирования */}
        {car.bookings && car.bookings.length > 0 && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">История бронирований</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {car.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border rounded-lg p-4 grid md:grid-cols-2 gap-4 bg-muted/20"
                >
                  <div>
                    <p>
                      <strong>Дата начала:</strong>{" "}
                      {new Date(booking.start_date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Дата окончания:</strong>{" "}
                      {new Date(booking.end_date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Общая цена:</strong>{" "}
                      {booking.total_price.toLocaleString()} ₸
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Статус:</strong>{" "}
                      <Badge
                        variant={
                          booking.status === "pending" ? "secondary" : "default"
                        }
                      >
                        {booking.status === "pending"
                          ? "Ожидает подтверждения"
                          : booking.status}
                      </Badge>
                    </p>
                    <p>
                      <strong>ID арендатора:</strong> {booking.renter_id}
                    </p>
                    <p>
                      <strong>Бронирование создано:</strong>{" "}
                      {new Date(booking.created_at).toLocaleString()}
                    </p>
                    {booking.status === "cancelled" &&
                      user?.id !== car.owner_id && (
                        <Button
                          variant="outline"
                          onClick={() => handleUpdateStatus(booking, "pending")}
                        >
                          Отправить повторный запрос
                        </Button>
                      )}
                    {booking.status === "confirmed" &&
                      user?.id === car.owner_id && (
                        <Button
                          variant="destructive"
                          onClick={() =>
                            handleUpdateStatus(booking, "cancelled")
                          }
                        >
                          Отменить
                        </Button>
                      )}
                    {booking.status === "pending" && (
                      <div className="mt-3 flex gap-2">
                        {user?.id === car.owner_id && (
                          <>
                            <Button
                              variant="default"
                              onClick={() =>
                                handleUpdateStatus(booking, "confirmed")
                              }
                            >
                              Подтвердить
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() =>
                                handleUpdateStatus(booking, "cancelled")
                              }
                            >
                              Отменить
                            </Button>
                          </>
                        )}

                        {user?.id === booking.renter_id &&
                          user?.id !== car.owner_id && (
                            <Button
                              variant="destructive"
                              onClick={() =>
                                handleUpdateStatus(booking, "cancelled")
                              }
                            >
                              Отменить
                            </Button>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CarDetailsPage;
