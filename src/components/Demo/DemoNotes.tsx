import { FC } from "react";
import Button from "../Generic/Button";

const DemoNotes: FC = () => {
  const notes = [
    {
      id: 123,
      datetime: 123,
      text: "Hello world",
    },
    {
      id: 124,
      datetime: 124,
      text: "Hello world2",
    },
  ];

  return (
    <div className="demo-notes">
      {notes.map((note) => {
        return (
          <div className="card mb-3 bg-light">
            <div className="card-body">
              <h4 className="card-title">{note.datetime}</h4>
              <div className="card-text">{note.text}</div>
              <div className="d-flex gap-3 mt-3">
                <Button content="Edit" theme="success" />
                <Button content="Delete" theme="danger" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DemoNotes;
