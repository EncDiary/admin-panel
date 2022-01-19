import { FC } from "react";
import { Navigate, Outlet } from "react-router";
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
      <Outlet context={account} />
    </>
  );
};

export default AdminTemplate;
