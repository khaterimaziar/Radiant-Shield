
import React from 'react';
import { UnitOption } from '../types';

interface InputWithUnitProps {
  id: string;
  label: string;
  value: number | string; // Allow string for initial empty or invalid states
  onValueChange: (value: number) => void;
  unit: string;
  onUnitChange: (unit: string) => void;
  unitOptions: UnitOption[];
  placeholder?: string;
  min?: number;
  step?: number;
}

const InputWithUnit: React.FC<InputWithUnitProps> = ({
  id,
  label,
  value,
  onValueChange,
  unit,
  onUnitChange,
  unitOptions,
  placeholder = "0.0",
  min = 0,
  step = 0.01
}) => {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseFloat(e.target.value);
    if (!isNaN(numValue)) {
      onValueChange(numValue);
    } else if (e.target.value === "") {
        onValueChange(0); // Or handle as an empty state
    }
  };
  
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <div className="flex">
        <input
          type="number"
          id={id}
          name={id}
          value={value === 0 && placeholder === "0.0" ? "" : value} // Show placeholder if value is 0 and it's the default
          onChange={handleValueChange}
          placeholder={placeholder}
          min={min}
          step={step}
          className="flex-grow p-2.5 border border-slate-600 rounded-l-md bg-slate-700 text-slate-100 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors"
        />
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className="p-2.5 border border-l-0 border-slate-600 rounded-r-md bg-slate-600 text-slate-100 hover:bg-slate-500 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors"
        >
          {unitOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-700 text-slate-100">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputWithUnit;
