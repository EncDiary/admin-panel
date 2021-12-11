import jwt from "jsonwebtoken";
import { NavigateFunction } from "react-router-dom";

export const checkJwtToken = (
  token: string | undefined,
  navigate: NavigateFunction
) => {
  if (!token) {
    navigate("/login");
    return;
  }
  const decodedToken = jwt.decode(token);

  if (
    !decodedToken ||
    typeof decodedToken === "string" ||
    typeof decodedToken.exp !== "number" ||
    Date.now() > (decodedToken.exp - 30) * 1000
  ) {
    navigate("/login");
    return;
  }
};
