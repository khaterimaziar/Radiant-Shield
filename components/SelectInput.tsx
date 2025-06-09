
import React from 'react';

interface SelectInputProps<T extends string | number> {
  id: string;
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  disabled?: boolean;
}

const SelectInput = <T extends string | number,>({
  id,
  label,
  value,
  onChange,
  options,
  disabled = false,
}: SelectInputProps<T>): React.ReactElement => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        disabled={disabled}
        className="w-full p-2.5 border border-slate-600 rounded-md bg-slate-700 text-slate-100 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {options.map((opt) => (
          <option key={opt.value.toString()} value={opt.value} className="bg-slate-700 text-slate-100">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
