import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { NavMenu } from "../navbar.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logoMobil from "@/public/icons/logo1.svg";
import menu from "@/public/icons/menu.svg";
import { useUserStore } from "@/store/userStore";
import { Plus } from "lucide-react";

const ResTopNavbar = ({ data }: { data: NavMenu }) => {
  const { user } = useUserStore((state) => state);
  const setUser = useUserStore((state) => state.setUser);

  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Image
          priority
          src={menu}
          height={100}
          width={100}
          alt="menu"
          className="max-w-[22px] max-h-[22px]"
        />
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader className="mb-10">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link href="/">
                <span className="font-bold text-3xl">CarGO</span>
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-start mb-6">
          {data.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === "MenuItem" && (
                <SheetClose asChild>
                  <Link href={item.url ?? "/"} className="mb-4">
                    {item.label}
                  </Link>
                </SheetClose>
              )}
              {item.type === "MenuList" && (
                <div className="mb-4 w-full">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={item.label} className="border-none">
                      <AccordionTrigger className="text-left p-0 py-0.5 font-normal text-base">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="p-4 pb-0 border-l flex flex-col">
                        {item.children.map((itemChild) => (
                          <SheetClose
                            key={itemChild.id}
                            asChild
                            className="w-fit py-2 text-base"
                          >
                            <Link href={itemChild.url ?? "/"}>
                              {itemChild.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Кнопки авторизации */}
        <div className="flex flex-col gap-3">
          {user ? (
            <>
              <SheetClose asChild>
                <Link
                  href="/add-car"
                  className="flex items-center justify-center  text-sm  h-9 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  Разместить автомобиль
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href="/dashboard"
                  className="border border-black text-black px-4 py-1.5 rounded-md text-sm text-center"
                >
                  Личный кабинет
                </Link>
              </SheetClose>

              <button
                onClick={() => {
                  setUser(null);
                }}
                className="bg-black text-white px-4 py-1.5 rounded-md text-sm"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <SheetClose asChild>
                <Link
                  href="/auth/login"
                  className="border border-black text-black px-4 py-1.5 rounded-md text-sm text-center"
                >
                  Вход
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/auth/signup"
                  className="bg-black text-white px-4 py-1.5 rounded-md text-sm text-center"
                >
                  Регистрация
                </Link>
              </SheetClose>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;
