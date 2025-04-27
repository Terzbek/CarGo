import { FC } from "react";

const TransmissionSection: FC<{ onChange: (val: string) => void }> = ({
  onChange,
}) => {
  const options = ["Автомат", "Механика"];

  return (
    <div className="space-y-2 p-4">
      <h4 className="font-medium">Трансмиссия</h4>
      {options.map((tr) => (
        <label key={tr} className="flex items-center gap-2">
          <input
            type="radio"
            name="transmission"
            value={tr}
            onChange={() => onChange(tr)}
          />
          {tr}
        </label>
      ))}
    </div>
  );
};

export default TransmissionSection;
