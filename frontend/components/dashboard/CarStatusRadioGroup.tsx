import { FC } from "react";
import { Car, Power, Ban } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  carId: number;
  selectedStatus: string;
  onChange: (value: string) => void;
}

export const CarStatusRadioGroup: FC<Props> = ({
  carId,
  selectedStatus,
  onChange,
}) => {
  const options = [
    {
      value: "active",
      label: "Свободен",
      checkedClass:
        "data-[state=checked]:bg-green-100 data-[state=checked]:border-green-400",
    },
    {
      value: "rented",
      label: "В аренде",
      checkedClass:
        "data-[state=checked]:bg-yellow-100 data-[state=checked]:border-yellow-400",
    },
    {
      value: "inactive",
      label: "Неактивен",
      checkedClass:
        "data-[state=checked]:bg-gray-200 data-[state=checked]:border-gray-400",
    },
  ];

  return (
    <>
      <Label className="block mb-3 text-lg font-medium">
        Статус автомобиля
      </Label>
      <RadioGroup
        defaultValue={selectedStatus}
        onValueChange={onChange}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {options.map(({ value, label, icon, checkedClass }) => (
          <div
            key={value}
            className={`flex items-center justify-center rounded-lg border p-1 hover:bg-muted ${checkedClass} transition`}
          >
            <RadioGroupItem
              value={value}
              id={`${value}-${carId}`}
              className="sr-only"
            />
            <Label
              htmlFor={`${value}-${carId}`}
              className="cursor-pointer font-medium text-base flex items-center gap-1"
            >
              {icon} {label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </>
  );
};
