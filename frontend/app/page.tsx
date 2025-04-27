import CarsListSec from "@/components/common/PublicListSec";
import AccordionList from "@/components/homepage/Accordion/AccordionList";
import GoldStyle from "@/components/homepage/LifeStyle";
import Reviews from "@/components/homepage/Reviews";
import StartScreen from "@/components/homepage/StartScreen";

export default function Home() {
  return (
    <>
      <StartScreen />
      <GoldStyle />
      <CarsListSec />
      <Reviews />
      <AccordionList />
    </>
  );
}
