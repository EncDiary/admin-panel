import { FC } from "react";

interface FloatingInputProps {
  type: "text" | "password";
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloatingInput: FC<FloatingInputProps> = ({
  type,
  name,
  label,
  value,
  onChange,
}) => {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className="form-control"
        id={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        name={name}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default FloatingInput;
