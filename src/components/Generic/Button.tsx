import { FC } from "react";

interface ButtonProps {
  content: string;
  theme?: "primary" | "success" | "danger" | "light" | "secondary";
  size?: "sm" | "lg";
  isOutline?: boolean;
  onClick?: () => void;
}

export const WideButton: FC<ButtonProps> = ({ content, theme = "primary" }) => {
  return (
    <button className={`w-100 btn btn-lg btn-${theme}`} type="submit">
      {content}
    </button>
  );
};

const Button: FC<ButtonProps> = ({
  content,
  theme = "primary",
  size,
  isOutline,
  onClick,
}) => {
  return (
    <button
      className={`btn ${size && "btn-" + size} btn-${
        isOutline ? "outline-" : ""
      }${theme}`}
      type="submit"
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
