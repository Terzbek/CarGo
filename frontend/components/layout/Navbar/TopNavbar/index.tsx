"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";

import { NavMenu } from "../navbar.types";
import logo from "@/public/icons/logo1.svg";
import logoMobil from "@/public/icons/logo.svg";
import ResTopNavbar from "./ResTopNavbar";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useUserStore } from "@/store/userStore";
import { Plus } from "lucide-react";

const data: NavMenu = [
  {
    id: 1,
    label: "Как арендовать",
    type: "MenuList",
    children: [
      {
        id: 11,
        label: "Пошаговая инструкция",
        url: "#",
        description: "Узнайте, как арендовать авто за 5 минут",
      },
      {
        id: 12,
        label: "Условия аренды",
        url: "#",
        description: "Права, возраст, лимиты и требования",
      },
      {
        id: 13,
        label: "Способы оплаты",
        url: "#",
        description: "Все варианты пополнения и оплаты",
      },
    ],
  },
  {
    id: 2,
    label: "Автомобили",
    type: "MenuItem",
    url: "/cars",
    children: [],
  },
  {
    id: 3,
    label: "Тарифы",
    type: "MenuItem",
    url: "#",
    children: [],
  },
  {
    id: 5,
    label: "Вопрос-Ответ",
    type: "MenuItem",
    url: "#",
    children: [],
  },
  {
    id: 6,
    label: "Заправка",
    type: "MenuItem",
    url: "#",
    children: [],
  },
];

const TopNavbar = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { user } = useUserStore((state) => state);

  React.useEffect(() => {
    console.log("user", user);
  }, [user]);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header>
      <div className="w-full sm:w-fit flex items-center "></div>

      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            "container mx-auto mt-2  px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex items-center justify-between gap-6 py-4 lg:gap-0 lg:py-4">
            <div className="block lg:hidden mr-4">
              <ResTopNavbar data={data} />
            </div>
            <Link
              href="/"
              className={cn([
                "hidden absolute left-1/2 -translate-x-1/2 sm:relative sm:left-auto sm:translate-x-0",
              ])}
            >
              {/* <Image src={logo} alt="logo" height={30} /> */}
              CarGO
            </Link>
            {/* <Link
            href="/"
            className={cn([
              "block sm:hidden  text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10",
            ])}
          >
            <Image src={logoMobil} alt="logo" height={60} width={60} />
          </Link> */}
            <Link
              href="/"
              className={cn([
                " absolute left-1/2 -translate-x-1/2 sm:relative sm:left-auto sm:translate-x-0 font-bold text-3xl",
              ])}
            >
              {/* <Image src={logo} alt="logo" height={30} /> */}
              CarGO
            </Link>

            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {data.map((menu) => (
                  <NavigationMenuItem key={menu.id}>
                    {menu.type === "MenuList" ? (
                      <>
                        <NavigationMenuTrigger>
                          {menu.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {menu.children.map((child) => (
                              <ListItem
                                key={child.id}
                                title={child.label}
                                href={child.url}
                              >
                                {child.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link href={menu.url} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {menu.label}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div
              className={cn(
                "hidden sm:flex lg:hidden xl:flex gap-2 items-center"
              )}
            >
              {/* <LanguageSelect /> */}

              {user ? (
                <>
                  <Link
                    href="/dashboard/car/create"
                    className="flex items-center justify-center w-10 h-9 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={20} />
                  </Link>

                  <Link
                    href="/dashboard"
                    className="border border-black text-black px-4 py-1.5 rounded-md text-sm hover:scale-105 transition-transform"
                  >
                    Личный кабинет
                  </Link>
                  <button
                    onClick={() => {
                      useUserStore.getState().setUser(null);
                    }}
                    className="bg-black text-white px-4 py-1.5 rounded-md text-sm hover:scale-105 transition-transform"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="border border-black text-black px-4 py-1.5 rounded-md text-sm hover:scale-105 transition-transform"
                  >
                    Вход
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-black text-white px-4 py-1.5 rounded-md text-sm hover:scale-105 transition-transform"
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-md font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default TopNavbar;
