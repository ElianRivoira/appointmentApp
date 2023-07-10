import React from 'react';

interface selectProps {
  label: string;
  name: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  data: any[] | undefined;
  dataType?: string;
  width: string;
  style?: string;
}

const Select: React.FC<selectProps> = ({
  label,
  name,
  id,
  value,
  onChange,
  required,
  data,
  dataType,
  width,
  style,
}) => {
  console.log(data);
  return (
    <>
      <label htmlFor={id} className='text-sm font-medium'>
        {label}
      </label>
      <select
        name={name}
        id={id}
        className={`w-${width} rounded-lg text-sm font-semibold h-11 p-3 border border-grey3 hover:border-grey5 focus:border-cruce outline-none ${style}`}
        value={value}
        required={required}
        onChange={onChange}
      >
        {data?.map(item => {
          if (dataType === 'object') {
            return (
              <option value={item.name} key={item._id} hidden={item.name === 'Todas' || item.name === ''}>
                {item.name}
              </option>
            );
          } else {
            return (
              <option value={item} key={item} hidden={item === 'Todas' || item === ''}>
                {item}
              </option>
            );
          }
        })}
      </select>
    </>
  );
};

export default Select;
