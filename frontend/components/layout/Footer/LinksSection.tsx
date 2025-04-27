import React from "react";
import { FooterLinks } from "./footer.types";
import Link from "next/link";
import { cn } from "@/lib/utils";

const footerLinksData: FooterLinks[] = [
  {
    id: 1,
    title: "Компания",
    children: [
      {
        id: 12,
        label: "Главная",
        url: "/",
      },
      {
        id: 13,
        label: "О компании",
        url: "#",
      },
    ],
  },
  {
    id: 3,
    title: "Информация",
    children: [
      {
        id: 31,
        label: "Автомобили",
        url: "#",
      },
      {
        id: 32,
        label: "Тарифы",
        url: "#",
      },
      {
        id: 33,
        label: "Как арендовать",
        url: "#",
      },
      {
        id: 34,
        label: "Заправка",
        url: "#",
      },
    ],
  },
  {
    id: 4,
    title: "Контакты",
    children: [
      {
        id: 41,
        label: "Позвонить нам",
        url: "#",
      },
      {
        id: 42,
        label: "Написать в WhatsApp",
        url: "#",
      },
      {
        id: 43,
        label: "Instagram",
        url: "#",
      },
    ],
  },
];

const LinksSection = () => {
  return (
    <>
      {footerLinksData.map((item) => (
        <section className="flex flex-col mt-5 " key={item.id}>
          <h3 className="font-medium text-sm md:text-base uppercase tracking-widest mb-6">
            {item.title}
          </h3>
          {item.children.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className={cn([
                link.id !== 41 && link.id !== 43 && "",
                "text-black/60 text-sm md:text-base mb-4 w-fit",
              ])}
            >
              {link.label}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
};

export default LinksSection;
