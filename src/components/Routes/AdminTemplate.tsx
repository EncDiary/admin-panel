import { FC } from "react";
import { Navigate, Outlet } from "react-router";
import { Container } from "reactstrap";
import { updateJwtToken } from "../../modules/jwt";
import store from "../../store";
import Header from "../Generic/Header";

const AdminTemplate: FC = () => {
  const account = store.user.account;
  if (!account) {
    return <Navigate to="/login" />;
  }
  updateJwtToken(account);

  return (
    <>
      <Header />
      <Container style={{ maxWidth: 800 }}>
        <Outlet context={account} />
      </Container>
    </>
  );
};

export default AdminTemplate;
