import { FC } from "react";

const YearSection: FC<{ onChange: (val: string) => void }> = ({ onChange }) => {
  const years = Array.from({ length: 20 }, (_, i) => `${2024 - i}`);

  return (
    <div className="space-y-2 p-4">
      <h4 className="font-medium">Год выпуска</h4>
      <select
        className="w-full border rounded px-3 py-2"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Все</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSection;
