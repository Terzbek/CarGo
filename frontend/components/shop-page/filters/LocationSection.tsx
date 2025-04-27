import { FC } from "react";

const LocationSection: FC<{ onChange: (val: string) => void }> = ({
  onChange,
}) => {
  const cities = ["Алматы", "Астана", "Шымкент", "Караганда", "Актобе"];

  return (
    <div className="space-y-2 p-4">
      <h4 className="font-medium">Город</h4>
      <select
        className="w-full border rounded px-3 py-2"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Все города</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSection;
