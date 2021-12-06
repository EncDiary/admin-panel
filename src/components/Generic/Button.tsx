import { FC } from "react";

interface ButtonProps {
  content: string;
  theme?: "primary" | "success" | "danger" | "light";
  size?: "sm" | "lg";
  isOutline?: boolean;
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
}) => {
  return (
    <button
      className={`btn ${size && "btn-" + size} btn-${
        isOutline ? "outline-" : ""
      }${theme}`}
      type="submit"
    >
      {content}
    </button>
  );
};

export default Button;
