import { FC } from "react";

interface ButtonProps {
  content: string;
}

const Button: FC<ButtonProps> = ({ content }) => {
  return (
    <button className="w-100 btn btn-lg btn-primary" type="submit">
      {content}
    </button>
  );
};

export default Button;
