import { FC } from "react";

const Container: FC = ({ children }) => {
  return (
    <div className="container" style={{ maxWidth: 800 }}>
      {children}
    </div>
  );
};

export default Container;
