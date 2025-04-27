"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";

export default function RegisterPage() {
  const [phone_number, setPhoneNumber] = useState("+77774442595");
  const [full_name, setFullName] = useState("Adilzhan");
  const [email, setEmail] = useState("babakhan.adilzhan@gmail.com");
  const [password, setPassword] = useState("Qwerty123");
  const [error, setError] = useState("");
  const router = useRouter();

  const registerUser = useUserStore((state) => state.registerUser);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result: any = await registerUser({
        phone_number,
        full_name,
        email,
        password,
      });

      if (result) {
        toast("Пользователь успешно зарегистрирован!", {
          duration: 5000,
        });

        setTimeout(() => {
          router.push("/");
        }, 5000);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          "Ошибка при регистрации. Попробуйте позже."
      );
    }
  };

  return (
    <section className="flex min-h-screen px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        onSubmit={handleRegister}
        className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="p-8 pb-6">
          <h1 className="mb-1 mt-4 text-xl font-semibold">Регистрация</h1>
          <p className="text-sm">Заполните данные, чтобы создать аккаунт</p>

          <div className="mt-6 space-y-4">
            <div className="space-y-2 mt-4">
              <Label htmlFor="full_name">Имя</Label>
              <Input
                id="full_name"
                type="text"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="phone">Номер телефона</Label>
              <Input
                id="phone"
                type="tel"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full mt-4">
              Зарегистрироваться
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
