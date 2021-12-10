import { observer } from "mobx-react-lite";
import { FC } from "react";
import store from "../../store";
import DemoNoteItem from "./DemoNoteItem";

const DemoNoteList: FC = observer(() => {
  const notes = store.demo.notes;

  return (
    <div className="demo-notes">
      {notes.map((note) => {
        return <DemoNoteItem note={note} key={note.id} />;
      })}
    </div>
  );
});

export default DemoNoteList;
