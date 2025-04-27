"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import LinksSection from "./LinksSection";
import Image from "next/image";
import NewsLetterSection from "./NewsLetterSection";
import LayoutSpacing from "./LayoutSpacing";
import logo from "@/public/icons/logo1.svg";
import instagram from "@/public/icons/inst.svg";
import whatsapp from "@/public/icons/whatsapp.svg";
import telegram from "@/public/icons/tg.svg";

const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="relative">
        <div className="absolute bottom-0 w-full h-1/2 bg-[#F0F0F0]"></div>
        <div className="px-4 container mx-auto">
          <NewsLetterSection />
        </div>
      </div>
      <div className="pt-8 md:pt-[50px] bg-[#F0F0F0] px-4 pb-4">
        <div className="container max-w-frame mx-auto">
          <nav className="lg:grid lg:grid-cols-12 mb-8">
            <div className="flex flex-col lg:col-span-3 lg:max-w-[248px]">
              <Link
                href="/"
                className={cn(["text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10"])}
              >
                {/* <Image src={logo} alt="logo" /> */}
                CarGO
              </Link>
              <p className="text-black/60 text-sm mb-9">
                Честная аренда, умные контракты. Все права защищены.
              </p>
              <div className="flex items-center mb-4">
                <Image
                  src={instagram}
                  width={30}
                  height={30}
                  className="bg-white hover:text-white transition-all mr-3 w-7 h-7 rounded-full border border-black/20"
                  alt=""
                />
                <Image
                  src={whatsapp}
                  width={30}
                  height={30}
                  className="bg-white hover:text-white transition-all mr-3 w-7 h-7 rounded-full border border-black/20"
                  alt=""
                />
                <Image
                  src={telegram}
                  width={30}
                  height={30}
                  className="bg-white hover:text-white transition-all mr-3 w-7 h-7 rounded-full border border-black/20"
                  alt=""
                />
              </div>
            </div>

            <div className="hidden lg:grid col-span-9 lg:grid-cols-3 lg:pl-10">
              <LinksSection />
            </div>
            <div className="grid lg:hidden grid-cols-2 sm:grid-cols-4">
              <LinksSection />
            </div>
          </nav>

          <hr className="h-[1px] border-t-black/10 mb-6" />
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;
