"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import Link from "next/link";
import axios from "axios";
import { useUserStore } from "@/store/userStore";

const CarFormPage = ({ id }: { id?: string }) => {
  const { user } = useUserStore((state) => state);
  console.log(user);
  const [formData, setFormData] = useState({
    title: "Toyota Camry",
    description: "Комфортный седан для поездок",
    fuel_type: "Бензин",
    transmission: "Автомат",
    year: 2020,
    location: "Алматы",
    mark: "Toyota",
    model: "Camry",
    price_per_day: 15000,
    seats: 5,
    owner_id: user?.id,
    is_available: true,
    images: [
      {
        image_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPejzO2Y84BWm3nueYdwtzUfRt6tnLirmsEg&s",
      },
    ],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/v1/cars/${id}`)
        .then((response) => {
          setFormData({
            ...response.data,
            images: [
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPejzO2Y84BWm3nueYdwtzUfRt6tnLirmsEg&s",
            ],
          });
        })
        .catch((error) => {
          console.error("Ошибка загрузки данных:", error);
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = id
      ? `http://localhost:8080/api/v1/cars/${id}`
      : `http://localhost:8080/api/v1/cars`;

    const method = id ? "put" : "post";

    axios({
      method,
      url,
      data: formData,
    })
      .then(() => {
        alert(id ? "Автомобиль обновлен!" : "Автомобиль добавлен!");
      })
      .catch((error) => {
        console.error("Ошибка отправки данных:", error);
        alert("Произошла ошибка при сохранении данных.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen px-6 py-20 md:py-28 container mx-auto max-w-5xl">
      <h1 className="text-5xl font-extrabold mb-8 tracking-tight text-center md:text-left">
        {id ? "Редактировать автомобиль" : "Добавить новый автомобиль"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8">
          {/* Информация об автомобиле */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">
                Информация об автомобиле
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Название автомобиля"
                    className="w-full"
                  />
                </div>
                <div>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Описание автомобиля"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-4">
                  <Input
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Модель"
                    className="w-full"
                  />
                  <Input
                    name="mark"
                    value={formData.mark}
                    onChange={handleChange}
                    placeholder="Марка"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-4">
                  <Input
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="Год выпуска"
                    className="w-full"
                  />
                  <Select
                    value={formData.fuel_type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, fuel_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Тип топлива" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Бензин">Бензин</SelectItem>
                      <SelectItem value="Дизель">Дизель</SelectItem>
                      <SelectItem value="Электрический">
                        Электрический
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-4">
                  <Select
                    value={formData.transmission}
                    onValueChange={(value) =>
                      setFormData({ ...formData, transmission: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Трансмиссия" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Автомат">Автомат</SelectItem>
                      <SelectItem value="Механика">Механика</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    name="seats"
                    type="number"
                    value={formData.seats}
                    onChange={handleChange}
                    placeholder="Мест"
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Доступность и цена */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">Цена и доступность</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input
                    name="price_per_day"
                    type="number"
                    value={formData.price_per_day}
                    onChange={handleChange}
                    placeholder="Цена за день"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_available}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          is_available: !formData.is_available,
                        })
                      }
                    />
                    Доступен
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Кнопка для отправки */}
          <div className="flex justify-center gap-4">
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={loading}
            >
              {loading
                ? "Загрузка..."
                : id
                ? "Сохранить изменения"
                : "Добавить автомобиль"}
            </Button>
            <Link href="/dashboard?tab=cars">
              <Button variant="outline" className="w-full md:w-auto">
                Отменить
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CarFormPage;
