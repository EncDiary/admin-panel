import { FC } from "react";
import { Outlet } from "react-router";
import Header from "../Generic/Header";

const AdminTemplate: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AdminTemplate;
