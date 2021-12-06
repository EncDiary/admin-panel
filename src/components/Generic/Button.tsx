import { FC } from "react";

interface ButtonProps {
  content: string;
  theme?: "primary" | "success" | "danger";
  size?: "sm" | "lg";
}

export const WideButton: FC<ButtonProps> = ({ content, theme = "primary" }) => {
  return (
    <button className={`w-100 btn btn-lg btn-${theme}`} type="submit">
      {content}
    </button>
  );
};

const Button: FC<ButtonProps> = ({ content, theme = "primary", size }) => {
  return (
    <button
      className={`btn ${size && "btn-" + size} btn-${theme}`}
      type="submit"
    >
      {content}
    </button>
  );
};

export default Button;
