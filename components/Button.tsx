import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  ...props 
}) => {
  const baseStyles = "transition-all duration-300 ease-out font-bold tracking-wide rounded-none flex items-center justify-center";
  
  const variants = {
    primary: "bg-mos-primary text-white hover:bg-mos-dark",
    outline: "bg-transparent border-2 border-mos-dark text-mos-dark hover:bg-mos-dark hover:text-white",
    ghost: "bg-transparent text-mos-dark hover:text-mos-primary",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs uppercase tracking-wider",
    md: "px-8 py-3 text-sm uppercase tracking-wider",
    lg: "px-10 py-4 text-sm uppercase tracking-[0.15em]",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};