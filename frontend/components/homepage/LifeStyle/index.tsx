import { cn } from "@/lib/utils";
import React from "react";
import * as motion from "framer-motion/client";
import GoldStyleCard from "./LifeStyleCard";

const LifeStyle = () => {
  return (
    <div className="px-4 xl:px-0 mt-8 md:mt-16">
      <section className="container max-w-frame mx-auto bg-[#F0F0F0] px-6 pb-6 pt-6 md:pt-14 md:p-[70px] rounded-[40px] text-center">
        <motion.h2
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn([
            "text-[24px] md:text-4xl lg:text-4xl mb-6 md:mb-14 capitalize ",
          ])}
        >
          Доступно для аренды
        </motion.h2>
        <div className="mx-auto">
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center flex-col sm:flex-row md:h-[289px] space-y-4 sm:space-y-0 sm:space-x-5 mb-4 sm:mb-5"
          >
            <GoldStyleCard
              title="Городские авто"
              description="Удобны для повседневных поездок и парковки"
              url="/catalog#city"
              className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-[url('/images/lifestyle-sedan.png')] bg-cover bg-center"
            />
            <GoldStyleCard
              title="Кроссоверы и внедорожники"
              description="Для путешествий, природы и бездорожья"
              url="/catalog#suv"
              className="md:max-w-[684px] h-[190px] bg-[url('/images/lifestyle-suv.png')] bg-cover bg-center"
            />
          </motion.div>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex justify-center flex-col sm:flex-row md:h-[289px] space-y-5 sm:space-y-0 sm:space-x-5"
          >
            <GoldStyleCard
              title="Премиум класс"
              description="Бизнес-седаны и спорткары без посредников"
              url="/catalog#premium"
              className="md:max-w-[684px] h-[190px] bg-[url('/images/lifestyle-business.png')] bg-cover bg-center"
            />
            <GoldStyleCard
              title="Электромобили"
              description="Современно, экологично, экономично"
              url="/catalog#electric"
              className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-[url('/images/lifestyle-electro.png')] bg-cover bg-center"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LifeStyle;
