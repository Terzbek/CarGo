import { FC } from "react";

const FuelSection: FC<{ onChange: (val: string) => void }> = ({ onChange }) => {
  const options = ["Бензин", "Дизель", "Электро", "Гибрид"];

  return (
    <div className="space-y-2 p-4">
      <h4 className="font-medium">Тип топлива</h4>
      {options.map((fuel) => (
        <label key={fuel} className="flex items-center gap-2">
          <input
            type="radio"
            name="fuel"
            value={fuel}
            onChange={() => onChange(fuel)}
          />
          {fuel}
        </label>
      ))}
    </div>
  );
};

export default FuelSection;
