"use client";

import CarFormPage from "@/components/dashboard/car/CarFormPage";
import { useParams } from "next/navigation";

const CarEditPage = () => {
  const { id } = useParams();
  return <CarFormPage id={id} />;
};

export default CarEditPage;
