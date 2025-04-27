"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function LoginPage() {
  const [phone_number, setPhoneNumber] = useState("+77774442595");
  const [password, setPassword] = useState("Qwerty123");
  const [error, setError] = useState("");
  const router = useRouter();

  const loginUser = useUserStore((state) => state.loginUser);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result: any = await loginUser({
        phone_number,
        password,
      });

      if (result) {
        router.push("/");
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
          <h1 className="mb-1 mt-4 text-xl font-semibold">Вход</h1>
          <p className="text-sm">Заполните данные, чтобы войти в аккаунт</p>

          <div className="mt-6 space-y-4">
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
              Войти
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
