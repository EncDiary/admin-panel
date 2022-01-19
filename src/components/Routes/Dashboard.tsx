import { FC } from "react";
import H1 from "../Generic/Title";
import { useOutletContext } from "react-router-dom";
import { IAccount } from "../../types/user";
import Statistic from "../Statistic/Statistic";
import { Container } from "reactstrap";

const Dashboard: FC = () => {
  const account: IAccount = useOutletContext();

  return (
    <Container>
      <H1>Dashboard</H1>
      <Statistic account={account} />
    </Container>
  );
};

export default Dashboard;
