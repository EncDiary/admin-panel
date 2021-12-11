import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Container } from "reactstrap";
import { checkJwtToken } from "../../modules/jwt";
import store from "../../store";
import Header from "../Generic/Header";

const AdminTemplate: FC = () => {
  const token = store.user.token;
  const navigate = useNavigate();

  useEffect(() => {
    checkJwtToken(token, navigate);
  });

  return (
    <>
      <Header />
      <Container style={{ maxWidth: 800 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default AdminTemplate;
