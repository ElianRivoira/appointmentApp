import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  style?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, style, disabled, children, onClick }) => {
  return (
    <button
      type={type}
      className={`${
        disabled ? 'bg-grey3 text-grey6' : 'bg-cruce hover:bg-cruceHover text-white'
      } font-semibold text-lb rounded-lg h-10 w-full ${style}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
