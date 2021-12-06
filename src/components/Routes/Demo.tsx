import { FC } from "react";
import DemoNotes from "../DemoNotes";
import Container from "../Generic/Container";
import H1 from "../Generic/Title";

const Demo: FC = () => {
  return (
    <Container>
      <H1>Demo</H1>
      <DemoNotes />
    </Container>
  );
};

export default Demo;
