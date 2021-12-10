import { FC } from "react";
import DemoNoteList from "../Demo/DemoNoteList";
import Container from "../Generic/Container";
import H1 from "../Generic/Title";

const Demo: FC = () => {
  return (
    <Container>
      <H1>Demo</H1>
      <DemoNoteList />
    </Container>
  );
};

export default Demo;
