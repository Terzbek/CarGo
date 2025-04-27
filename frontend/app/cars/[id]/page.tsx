import { notFound } from "next/navigation";
import axios from "@/axios";
import { Car } from "@/types/car.types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BookingSection from "@/components/dashboard/booking/BookingSection";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  let productData: Car | null = null;

  try {
    const res = await axios.get(`/api/v1/cars/${id}`);
    productData = res.data;
  } catch (err) {
    console.error("Ошибка при получении авто:", err);
    notFound();
  }

  if (!productData?.title) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-20 md:py-28 container mx-auto max-w-5xl">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <Breadcrumb className="mb-5 sm:mb-9">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/cars">Автомобили</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{productData.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-5xl font-extrabold mb-8 tracking-tight text-center md:text-left">
          {productData.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-6 text-center md:text-left">
          {productData.description}
        </p>
        <Separator className="mb-8" />

        <div className="flex flex-col gap-8">
          {/* Карточка автомобиля */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">
                Информация об автомобиле
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border h-64">
                  <img
                    src={productData.images?.[0]?.image_url}
                    alt={productData.model}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge
                  variant={productData.is_available ? "default" : "secondary"}
                >
                  {productData.is_available ? "Доступен" : "Недоступен"}
                </Badge>
              </div>

              <div className="space-y-3 text-base">
                <p>
                  <strong>Марка:</strong> {productData.mark}
                </p>
                <p>
                  <strong>Модель:</strong> {productData.model}
                </p>
                <p>
                  <strong>Год выпуска:</strong> {productData.year}
                </p>
                <p>
                  <strong>Тип топлива:</strong> {productData.fuel_type}
                </p>
                <p>
                  <strong>Трансмиссия:</strong> {productData.transmission}
                </p>
                <p>
                  <strong>Мест:</strong> {productData.seats}
                </p>
                <p>
                  <strong>Цена/день:</strong>{" "}
                  {productData.price_per_day.toLocaleString()} ₸
                </p>
                <p>
                  <strong>Город:</strong> {productData.location}
                </p>
                <p>
                  <strong>Добавлен:</strong>{" "}
                  {new Date(productData.created_at).toLocaleDateString()}
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
                <strong>ФИО:</strong>{" "}
                {productData.owner?.full_name || "Не указано"}
              </p>
              <p>
                <strong>Телефон:</strong> {productData.owner?.phone_number}
              </p>
              <p>
                <strong>ID владельца:</strong> {productData.owner_id}
              </p>
            </CardContent>
          </Card>

          <BookingSection
            carId={productData.id}
            pricePerDay={productData.price_per_day}
          />
        </div>
      </div>
    </main>
  );
}
