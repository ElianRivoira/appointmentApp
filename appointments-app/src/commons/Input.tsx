import React from 'react';

interface inputProps {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder?: string;
  pattern?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  width?: string;
}

const Input: React.FC<inputProps> = ({ label, type, name, id, placeholder, pattern, value, onChange, required, width }) => {
  return (
    <>
      <label htmlFor='username' className='text-sm font-medium'>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        pattern={pattern}
        value={value}
        onChange={onChange}
        required={required}
        className={`${width ? `w-${width}` : 'w-full'} border border-solid border-grey-500 hover:border-grey5 focus:border-cruce rounded-lg h-11 mb-3 outline-none p-3`}
      />
    </>
  );
};

export default Input;
